const { Schema, model } = require("mongoose");
const Address = require("./address.model");
const Token = require("./token.model");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    password: String,
    ipAddress: String,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    isHavePassword: {
      type: Boolean,
      default: function () {
        return Boolean(this.password);
      }
    },
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    token: {
      type: Schema.Types.ObjectId,
      ref: "Token"
    }
  },
  {
    timestamps: true,
    versionKey: false
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

// onCasade deleteOne
userSchema.pre("deleteOne", async function (next) {
  await Promise.all([
    Address.deleteMany({ _id: { $in: this.addresses } }),
    Token.deleteOne({ _id: this.token })
  ]);
  next();
});

const User = model("User", userSchema);

module.exports = User;
