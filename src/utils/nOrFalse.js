const nOrFalse = (n = 0, ...args) => !(args.filter((a) => a === undefined).length > n);

export default nOrFalse;
