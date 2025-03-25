const vouchers = require("./jsons/vouchers.json");

const VoucherService = require("../services/voucher.service");
const voucherService = new VoucherService();

module.exports = async () => {
  for (const voucher of vouchers) {
    const data = await voucherService.create(voucher);
    console.log(data);
  }
};
