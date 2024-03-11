function formatDate(date?: Date | number | string) {
  if (!date) return "";
  return new Intl.DateTimeFormat("vi", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export default formatDate;
