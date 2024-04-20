import { Schema, model } from "mongoose";

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

export default Token;
