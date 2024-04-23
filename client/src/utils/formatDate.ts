function formatDate(date?: Date | number | string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("vi-VN", {
    timeStyle: "short",
    dateStyle: "short",
  }).format(new Date(date));
}

export default formatDate;
