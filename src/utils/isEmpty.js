const isEmpty = (arg) => {
  if (typeof arg === 'number' || typeof arg === 'boolean') {
    return false;
  }
  if (typeof arg === 'undefined' || arg === null) {
    return true;
  }
  if (typeof arg.length !== 'undefined') {
    return arg.length === 0;
  }
  return Object.entries(arg).length === 0;
};

export default isEmpty;
