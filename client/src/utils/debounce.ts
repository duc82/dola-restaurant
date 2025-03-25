const debounce = <T extends any[]>(
  func: (...args: T) => void,
  wait: number
) => {
  let timeout: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default debounce;
