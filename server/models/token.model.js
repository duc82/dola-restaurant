const { Schema, model } = require("mongoose");

const tokenSchema = new Schema(
  {
    passwordResetToken: String,
    passwordResetTokenExpirationAt: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Token = model("Token", tokenSchema);

module.exports = Token;
