import { Router } from "express";

const router = Router();

// router.use("/auth", require("./auth.route"));
// router.use("/users", require("./user.route"));
// router.use("/products", require("./product.route"));
// router.use("/categories", require("./category.route"));
// router.use("/blogs", require("./blog.route"));
// router.use("/reviews", require("./review.route"));
// router.use("/addresses", require("./address.route"));
// router.use("/orders", require("./order.route"));
// router.use("/vouchers", require("./voucher.route"));
router.get("/test", (_req, res) => {
  res.send("Hello from server!");
});

export default router;
