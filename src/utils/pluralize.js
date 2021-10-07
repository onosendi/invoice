const pluralize = ({ text, count }) => (count === 1 ? text : `${text}s`);

export default pluralize;
