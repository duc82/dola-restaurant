const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    shippingFee: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
    paidAt: {
      type: Date,
      nullable: true,
    },
    deliveredAt: {
      type: Date,
      nullable: true,
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: ["VnPay", "Thanh toán khi giao hàng (COD)"],
    },
    note: {
      type: String,
    },
    vouchers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Voucher",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
