const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
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
    device: {
      type: String,
      enum: ["Mobile", "Tablet", "Desktop"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isHavePassword: {
      type: Boolean,
      default: function () {
        return Boolean(this.password);
      },
    },
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
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.pre(["updateOne", "findOneAndUpdate"], async function (next) {
  const update = this.getUpdate();

  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }

  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
