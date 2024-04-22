const Joi = require("joi");

class OrderDto {
  user = Joi.string().required().messages({
    "string.empty": "Vui lòng nhập id người dùng!"
  });
  products = Joi.array()
    .items(
      Joi.object({
        product: Joi.string().required().messages({
          "string.empty": "Vui lòng nhập id sản phẩm!"
        }),
        quantity: Joi.number().required().messages({
          "number.empty": "Vui lòng nhập số lượng sản phẩm!"
        })
      })
    )
    .required()
    .messages({
      "array.empty": "Vui lòng nhập sản phẩm!"
    });

  shippingAddress = Joi.string().required().messages({
    "string.empty": "Vui lòng nhập id địa chỉ!"
  });
  shippingFee = Joi.number().required().messages({
    "number.empty": "Vui lòng nhập phí vận chuyển!"
  });
  total = Joi.number().required().messages({
    "number.empty": "Vui lòng nhập tổng tiền!"
  });
  isPaid = Joi.boolean().required().messages({
    "boolean.empty": "Vui lòng nhập trạng thái thanh toán!"
  });
  paymentMethod = Joi.string()
    .valid("PayPal", "VnPay", "Thanh toán khi giao hàng (COD)")
    .messages({
      "string.empty": "Vui lòng nhập phương thức thanh toán!",
      "any.only": "Phương thức thanh toán không hợp lệ!"
    });
  note = Joi.string().optional().allow("");
  paidAt = Joi.date().optional().allow("");

  get create() {
    return Joi.object({
      user: this.user,
      products: this.products,
      shippingAddress: this.shippingAddress,
      shippingFee: this.shippingFee,
      total: this.total,
      isPaid: this.isPaid,
      paymentMethod: this.paymentMethod,
      note: this.note,
      paidAt: this.paidAt
    });
  }
}

module.exports = OrderDto;
