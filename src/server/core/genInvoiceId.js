const generate = ({ string = '', length = 0 }) => {
  const array = Array.from({ length }, () => {
    const r = Math.floor(Math.random() * string.length);
    return string[r];
  });
  return array.join('');
};

module.exports = () => {
  const alpha = generate({ string: 'abcdefghjkmnpqrstuvwxyz', length: 2 }).toUpperCase();
  const numeric = generate({ string: '0123456789', length: 4 });
  return `${alpha}${numeric}`;
};
