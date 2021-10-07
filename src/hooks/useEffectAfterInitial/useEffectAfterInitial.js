import { useEffect, useRef } from 'react';

const useEffectAfterInitial = (callback, dependencies) => {
  const loaded = useRef(false);

  return useEffect(() => {
    if (loaded.current) {
      callback();
    } else {
      loaded.current = true;
    }
  }, dependencies);
};

export default useEffectAfterInitial;
