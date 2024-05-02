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
  }

  async create(req, res) {
    res.status(201).json(await this.orderService.create(req.body));
  }

  async getAll(req, res) {
    res.status(200).json(await this.orderService.getAll(req.user.userId));
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
    const orderId = moment(date).format("HHmmss");
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
      vnp_CreatedDate: createDate
    };

    vnp_params = this.sortObject(vnp_params);

    console.log(vnp_params);

    const signData = querystring.stringify(vnp_params, {
      encode: false
    });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    vnp_params.vnp_SecureHash = signed;
    vnpUrl += "?" + querystring.stringify(vnp_params, { encode: false });

    console.log(vnpUrl);

    res.status(200).json({ code: "00", url: vnpUrl });
  }

  sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }
}

module.exports = new OrderController();
