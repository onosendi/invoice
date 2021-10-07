exports.normalizeErrors = ({ errors }) => {
  const separatedItems = Object.keys(errors).reduce((acc, key) => {
    const type = key.startsWith('items') && key !== 'items' ? 'items' : 'nonItems';
    acc[type][key] = errors[key];
    return acc;
  }, { nonItems: {}, items: {} });

  const { nonItems, items } = separatedItems;

  const normalizedItems = Object.keys(items).reduce((acc, key) => {
    const [index] = key.split('[')[1].split(']');
    const [, name] = key.split('.');
    if (!acc[index]) {
      acc[index] = {};
    }
    acc[index] = { ...acc[index], [name]: items[key] };
    return acc;
  }, {});

  return { ...nonItems, invoiceItems: normalizedItems };
};

exports.prepareItems = ({ invoiceId, items }) => items.map((i) => (
  { ...i, invoiceId }));
