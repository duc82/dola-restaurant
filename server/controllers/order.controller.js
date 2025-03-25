const asyncHandler = require("../middlewares/asyncHandler.middleware");
const OrderService = require("../services/order.service");
const querystring = require("qs");
const crypto = require("crypto");
const moment = require("moment");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
    this.create = asyncHandler(this.create.bind(this));
    this.getAll = asyncHandler(this.getAll.bind(this));
    this.getById = asyncHandler(this.getById.bind(this));
    this.createPaymentUrl = asyncHandler(this.createPaymentUrl.bind(this));
    this.vnpayReturn = asyncHandler(this.vnpayReturn.bind(this));
    this.update = asyncHandler(this.update.bind(this));
    this.delete = asyncHandler(this.delete.bind(this));
    this.deleteMany = asyncHandler(this.deleteMany.bind(this));
  }

  async create(req, res) {
    res.status(201).json(await this.orderService.create(req.body));
  }

  async getAll(req, res) {
    res.status(200).json(await this.orderService.getAll(req.query));
  }

  async getById(req, res) {
    res.status(200).json(await this.orderService.getById(req.params.id));
  }

  async createPaymentUrl(req, res) {
    process.env.TZ = "Asia/Ho_Chi_Minh";

    const ipAddress =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_HASH_SECRET;
    let vnpUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURN_URL;

    const date = new Date();

    const createDate = moment(date).format("YYYYMMDDHHmmss");
    const orderId = req.body.orderId;
    const amount = req.body.amount;

    const orderInfo = req.body.orderDescription;
    const orderType = "other";
    const locale = "vn";

    const currCode = "VND";

    let vnp_params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: tmnCode,
      vnp_Locale: locale,
      vnp_CurrCode: currCode,
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo,
      vnp_OrderType: orderType,
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: ipAddress,
      vnp_CreateDate: createDate,
    };

    vnp_params = this.sortObject(vnp_params);

    const signData = querystring.stringify(vnp_params, {
      encode: false,
    });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    vnp_params.vnp_SecureHash = signed;
    vnpUrl += "?" + querystring.stringify(vnp_params, { encode: false });

    console.log(vnpUrl);

    res.status(200).json({ code: "00", url: vnpUrl });
  }

  async vnpayReturn(req, res) {
    let vnp_params = req.query;
    const secureHash = vnp_params["vnp_SecureHash"];

    delete vnp_params["vnp_SecureHash"];
    delete vnp_params["vnp_SecureHashType"];

    vnp_params = this.sortObject(vnp_params);

    const secretKey = process.env.VNP_HASH_SECRET;

    const signData = querystring.stringify(vnp_params, {
      encode: false,
    });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    if (secureHash !== signed || vnp_params["vnp_ResponseCode"] !== "00") {
      return res.status(400).json({
        code: vnp_params["vnp_ResponseCode"],
        message: "Thanh toán thất bại",
      });
    }

    const orderId = vnp_params["vnp_TxnRef"];

    await this.orderService.update(orderId, {
      paidAt: new Date(),
    });

    res.status(200).json({
      code: vnp_params["vnp_ResponseCode"],
      message: "Thanh toán thành công",
    });
  }

  async update(req, res) {
    res
      .status(200)
      .json(await this.orderService.update(req.params.id, req.body));
  }

  async delete(req, res) {
    res.status(200).json(await this.orderService.delete(req.params.id));
  }

  async deleteMany(req, res) {
    res.status(200).json(await this.orderService.deleteMany(req.body.ids));
  }

  sortObject(obj) {
    return Object.keys(obj)
      .sort()
      .reduce((acc, curr) => {
        acc[curr] = encodeURIComponent(obj[curr]).replace(/%20/g, "+");
        return acc;
      }, {});
  }
}

module.exports = new OrderController();
