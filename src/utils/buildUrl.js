const buildUrl = ({ url, params }) => {
  if (params && params.toString()) {
    const join = url.includes('?') ? '&' : '?';
    return `${url}${join}${params}`;
  }
  return url;
};

export default buildUrl;
