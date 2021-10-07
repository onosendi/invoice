import { useSelector } from 'react-redux';

import { selectCache, selectLoading } from '../../redux/ui';

const useUI = ({ key: k }) => {
  const loading = useSelector((s) => selectLoading(s, k));
  const cache = useSelector((s) => selectCache(s, k));
  return [cache, loading];
};

export default useUI;
