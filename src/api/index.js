import axios from 'axios';

const api = async (descriptor) => {
  const { data } = await axios(descriptor);
  return data;
};

export default api;
