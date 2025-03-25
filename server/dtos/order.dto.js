const Joi = require("joi");
const BaseDto = require("./index.dto");

class OrderDto extends BaseDto {
  user = Joi.string().required().messages({
    "string.empty": "Vui lòng nhập id người dùng!",
  });
  products = Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required().messages({
          "string.empty": "Vui lòng nhập id sản phẩm!",
        }),
        quantity: Joi.number().required().messages({
          "number.empty": "Vui lòng nhập số lượng sản phẩm!",
        }),
      })
    )
    .required()
    .messages({
      "array.empty": "Vui lòng nhập sản phẩm!",
    });
  shippingAddress = Joi.string().required().messages({
    "string.empty": "Vui lòng nhập id địa chỉ!",
  });
  shippingFee = Joi.number().required().messages({
    "number.empty": "Vui lòng nhập phí vận chuyển!",
  });
  total = Joi.number().required().messages({
    "number.empty": "Vui lòng nhập tổng tiền!",
  });
  paymentMethod = Joi.string()
    .valid("VnPay", "Thanh toán khi giao hàng (COD)")
    .messages({
      "string.empty": "Vui lòng nhập phương thức thanh toán!",
      "any.only": "Phương thức thanh toán không hợp lệ!",
    });
  note = Joi.string().optional().allow("");
  paidAt = Joi.date().optional().allow("");
  deliveredAt = Joi.date().optional().allow("");
  vouchers = Joi.array().items(Joi.string()).optional().allow("");

  get create() {
    return Joi.object({
      user: this.user,
      products: this.products,
      shippingAddress: this.shippingAddress,
      shippingFee: this.shippingFee,
      total: this.total,
      paymentMethod: this.paymentMethod,
      note: this.note,
      paidAt: this.paidAt,
      vouchers: this.vouchers,
    });
  }

  get update() {
    return Joi.object({
      total: this.total,
      shippingFee: this.shippingFee,
      paymentMethod: this.paymentMethod,
      shippingAddress: this.shippingAddress,
      note: this.note,
      paidAt: Joi.date()
        .optional()
        .when("isPaid", {
          is: true,
          then: Joi.date().default(new Date()),
          otherwise: Joi.date().default(null),
        }),
      isPaid: Joi.boolean().optional().allow(""),
      isDelivered: Joi.boolean().optional().allow(""),
      deliveredAt: Joi.date()
        .optional()
        .when("isDelivered", {
          is: true,
          then: Joi.date().default(new Date()),
          otherwise: Joi.date().default(null),
        }),
    });
  }
}

module.exports = OrderDto;
