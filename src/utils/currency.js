const currency = (number) => {
  const n = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
  const [dollars, cents] = n.split('.');
  return cents === '00' ? dollars : n;
};

export default currency;
