module.exports = (args = {}) => {
  const { destination = '/users/login', permanent = false } = args;
  return {
    redirect: { destination, permanent },
  };
};
