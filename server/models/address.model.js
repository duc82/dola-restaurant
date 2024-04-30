const { Schema, model } = require("mongoose");

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
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Address = model("Address", addressSchema);

module.exports = Address;
