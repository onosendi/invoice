const grandTotal = (items) => items.reduce((a, c) => a + c.price * c.quantity, 0);

export default grandTotal;
