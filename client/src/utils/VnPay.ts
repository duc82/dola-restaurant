import dateFormat from "dateformat";
import { publicIpv4 } from "public-ip";
import CryptoJS from "crypto-js";
import { Order } from "@/types/order";

interface Param {
  [key: string]: string | number | boolean;
}

class VnPay {
  private readonly vnp_Url: string;
  private readonly vnp_TmnCode: string;
  private readonly vnp_HashSecret: string;
  private vnp_ReturnUrl: string;

  constructor(
    vnp_Url: string,
    vnp_TmnCode: string,
    vnp_HashSecret: string,
    origin: string
  ) {
    if (!vnp_Url || !vnp_TmnCode || !vnp_HashSecret || !origin) {
      throw new Error("VnPay config is not defined");
    }
    this.vnp_Url = vnp_Url;
    this.vnp_TmnCode = vnp_TmnCode;
    this.vnp_HashSecret = vnp_HashSecret;
    this.vnp_ReturnUrl = origin + "/thanh-toan";
  }

  public async createPaymentUrl(values: Order): Promise<string> {
    const date = new Date();

    const params: Param = {
      vnp_Version: "2.0.0",
      vnp_Command: "pay",
      vnp_TmnCode: this.vnp_TmnCode,
      vnp_Amount: values.total * 100,
      vnp_CurrCode: "VND",
      vnp_IpAddr: await publicIpv4(),
      vnp_TxnRef: dateFormat(date, "HHmmss"),
      vnp_OrderInfo: `Thanh toan don hang so tien ${values.total} VND`,
      vnp_OrderType: "180000",
      vnp_Locale: "vn",
      vnp_ReturnUrl: this.vnp_ReturnUrl,
      vnp_CreateDate: dateFormat(date, "yyyymmddHHmmss"),
    };

    if (values.note) {
      params.vnp_OrderInfo = values.note;
    }

    let signData = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    const hmac = CryptoJS.HmacSHA512(signData, this.vnp_HashSecret);
    const signature = CryptoJS.enc.Hex.stringify(hmac);

    signData += `&vnp_SecureHash=${signature}`;

    const url = `${this.vnp_Url}?${signData}`;

    return url;
  }

  public validateReturnUrl(query: Param): boolean {
    const vnp_SecureHash = query.vnp_SecureHash;

    delete query.vnp_SecureHash;
    delete query.vnp_SecureHashType;

    const signData = Object.keys(query)
      .sort()
      .map((key) => `${key}=${query[key]}`)
      .join("&");

    const hmac = CryptoJS.HmacSHA512(signData, this.vnp_HashSecret);
    const signature = CryptoJS.enc.Hex.stringify(hmac);

    if (signature === vnp_SecureHash) {
      return true;
    }

    return false;
  }
}

export default new VnPay(
  import.meta.env.VITE_VNPAY_URL,
  import.meta.env.VITE_VNPAY_TMN_CODE,
  import.meta.env.VITE_VNPAY_HASH_SECRET,
  import.meta.env.VITE_ORIGIN
);
