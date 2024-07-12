function formatDate(
  date?: Date | number | string,
  options?: Intl.DateTimeFormatOptions
) {
  if (!date) return "";
  return new Intl.DateTimeFormat("vi-VN", options).format(new Date(date));
}

export default formatDate;
