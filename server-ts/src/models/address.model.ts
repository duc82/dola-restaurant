import { Schema, model } from "mongoose";

const addressSchema = new Schema(
  {
    province: String,
    district: String,
    ward: String,
    detail: String,
    fullName: String,
    phone: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Address = model("Address", addressSchema);

export default Address;
