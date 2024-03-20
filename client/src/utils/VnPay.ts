import dateFormat from "dateformat";
import { publicIpv4 } from "public-ip";
import CryptoJS from "crypto-js";
import { Order } from "@/types/order";

type VnPayParam = Record<string, string | number | boolean>;

class VnPay {
  private readonly vnp_Version: string = "2.0.0";
  private readonly vnp_Command: string = "pay";
  private readonly vnp_CurrCode: string = "VND";
  private readonly vnp_OrderType: string = "180000";
  private readonly vnp_Locale: string = "vn";
  private readonly vnp_Url: string;
  private readonly vnp_TmnCode: string;
  private readonly vnp_HashSecret: string;
  private readonly vnp_ReturnUrl: string;

  constructor() {
    const vnp_Url = import.meta.env.VITE_VNPAY_URL;
    const vnp_TmnCode = import.meta.env.VITE_VNPAY_TMN_CODE;
    const vnp_HashSecret = import.meta.env.VITE_VNPAY_HASH_SECRET;
    const origin = import.meta.env.VITE_ORIGIN;

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

    const params: VnPayParam = {
      vnp_Version: this.vnp_Version,
      vnp_Command: this.vnp_Command,
      vnp_TmnCode: this.vnp_TmnCode,
      vnp_Amount: values.total * 100,
      vnp_CurrCode: this.vnp_CurrCode,
      vnp_IpAddr: await publicIpv4(),
      vnp_TxnRef: dateFormat(date, "HHmmss"),
      vnp_OrderInfo: `Thanh toan don hang so tien ${values.total} VND`,
      vnp_OrderType: this.vnp_OrderType,
      vnp_Locale: this.vnp_Locale,
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

  public validateReturnUrl(query: VnPayParam): boolean {
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

export default new VnPay();
