const connectDB = require("../configs/db.config");
const category = require("./category");
const product = require("./product");
const voucher = require("./voucher");

async function seed() {
  await connectDB();

  const seedName = process.argv[2];

  switch (seedName) {
    case "category":
      await category();
      break;
    case "product":
      await product();
      break;
    case "voucher":
      await voucher();
      break;
    default:
      break;
  }

  process.exit(1);
}

seed();
