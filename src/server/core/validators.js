exports.isDate = ((value) => {
  const date = new Date(value);
  if (date instanceof Date && !Number.isNaN(date.valueOf())) {
    return true;
  }
  throw new Error();
});
