const formatVnd = (number?: number): string => {
  if (!number) return "0₫";

  return (
    new Intl.NumberFormat("vi-VN", {
      currency: "VND",
    }).format(number) + "₫"
  );
};

export default formatVnd;
