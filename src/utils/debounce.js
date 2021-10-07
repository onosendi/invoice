const debounce = (func, delay = 166) => {
  let timeout;
  const d = (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
  d.clear = () => {
    clearTimeout(timeout);
  };
  return d;
};

export default debounce;
