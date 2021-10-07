import { useCallback, useEffect } from 'react';

const useWindowResize = ({ handler, open, ref }) => {
  const listener = useCallback(() => {
    handler();
  }, []);

  useEffect(() => {
    if (open) {
      window.addEventListener('resize', listener);
    } else {
      window.removeEventListener('resize', listener);
    }
  }, [handler, open, ref]);
};

export default useWindowResize;
