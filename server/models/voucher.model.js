const { model, Schema } = require("mongoose");

const voucherSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    minAmount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["shipping", "discount"],
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Voucher = model("Voucher", voucherSchema);

module.exports = Voucher;
