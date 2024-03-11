import * as yup from "yup";

const tastes = ["mặn", "ngọt", "chua", "cay"];
const sizes = ["nhỏ", "vừa", "lớn"];

const productSchema = yup.object({
  title: yup.string().required("Tiêu đề là bắt buộc"),
  price: yup
    .string()
    .test(
      "is-greater-than-or-equal",
      "Giá phải tối thiểu 10,000 VND",
      (value) => {
        const number = parseInt(value?.replace(/\D/g, "") ?? "0");
        return number >= 10000;
      }
    ),
  discountPercent: yup.number().max(99, "Giảm giá tối đa 99%"),
  stock: yup
    .number()
    .min(1, "Tồn kho phải tối thiểu 1")
    .max(1000000, "Tồn kho tối đa 1,000,000"),
  category: yup.string().required("Danh mục sản phẩm là bắt buộc"),
  taste: yup.mixed().oneOf(tastes),
  size: yup.mixed().oneOf(sizes),
});

export { productSchema, tastes, sizes };
