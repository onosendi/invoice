// separateItems({
//   'item_name_1': 'foo',
//   'description: 'some desc',
// });
//
// {
//   description: 'some desc',
// }
const removeItems = ({ formData }) => Object.keys(formData).reduce((acc, key) => {
  if (!key.startsWith('item')) {
    acc[key] = formData[key];
  }
  return acc;
}, {});

const itemHasContent = ({ item }) => Object.entries(item).some(([key, val]) => (
  !['id', 'total'].includes(key) && val !== ''));

// filterEmptyItems([
//   { id: '1', name: 'name 1', quantity: '3', price: '32.33' },
//   { id: '2', name: '', quantity: '', price: '' },
// ])
// [
//   { id: '1', name: 'name 1', quantity: '3', price: '32.33' },
// ]
export const filterEmptyItems = ({ items }) => items.filter((item) => (
  itemHasContent({ item }) && item));

const removeTotalFromItems = ({ items }) => items.map((i) => {
  const { total, ...rest } = i;
  return rest;
});

export const prepareData = ({ formData, items }) => {
  const formDataFromEntries = Object.fromEntries(formData);
  const nonItems = removeItems({ formData: formDataFromEntries });
  const filteredItems = filterEmptyItems({ items });
  const removedTotal = removeTotalFromItems({ items: filteredItems });
  return { ...nonItems, items: removedTotal };
};

export const indexErrors = ({ errors, stateItems }) => {
  const { invoiceItems: errorItems, ...rest } = errors;

  let errorIndex;

  const indexedErrorItems = stateItems.reduce((acc, item, index) => {
    const hasContent = itemHasContent({ item });
    if (hasContent) {
      if (!errorIndex) {
        errorIndex = 0;
      }
      acc[index] = errorItems[errorIndex];
      errorIndex += 1;
    }
    return acc;
  }, {});

  return { ...rest, invoiceItems: indexedErrorItems };
};
