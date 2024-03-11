const { model, Schema } = require("mongoose");

const voucherSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    minimumCost: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Voucher = model("Voucher", voucherSchema);

module.exports = Voucher;
