const debounce = (cb: () => void, timeout: number) => {
  const timeoutId = setTimeout(() => {
    cb();
  }, timeout);
  clearTimeout(timeoutId);
};

export default debounce;
