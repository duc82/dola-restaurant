import { Schema, model, Model, HydratedDocument } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  fullName: string;
  email: string;
  phone?: string;
  password?: string;
  ipAddress?: string;
  role?: string;
  isHavePassword?: boolean;
  addresses?: string[];
  token?: string;
}

interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
  findOneOrCreate(
    filter: any,
    doc: any,
    { exclude }: { exclude: keyof IUser }
  ): Promise<HydratedDocument<IUser, IUserMethods>>;
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: String,
    password: String,
    ipAddress: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isHavePassword: {
      type: Boolean,
      default: true,
    },
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    token: {
      type: Schema.Types.ObjectId,
      ref: "Token",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password ?? "", salt);
    return next();
  } catch (error) {
    return next(error as Error);
  }
});

// userSchema.pre("updateOne", async function (next) {
//   if (!this.password) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this, password, salt);
//   next();
// });

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password ?? "");
};

userSchema.statics.findOneOrCreate = async function (
  filter: any,
  doc: any,
  { exclude }: { exclude: keyof IUser }
) {
  let user = await this.findOne(filter);
  if (!user) {
    user = await this.create(doc);
  }

  if (exclude) {
    delete user[exclude];
  }

  return user;
};

const User = model<IUser, UserModel>("User", userSchema);

export default User;
