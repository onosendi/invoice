const defined = (x) => x !== undefined;

const allOrNone = (...args) => !args.some(defined) || args.every(defined);

export default allOrNone;
