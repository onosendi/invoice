import { useCallback, useEffect } from 'react';

const useOutsideClick = ({ handler, open, ref }) => {
  const listener = useCallback((event) => {
    if (!ref.current || ref.current.contains(event.target)) {
      return;
    }
    handler();
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', listener);
    } else {
      document.removeEventListener('mousedown', listener);
    }
  }, [handler, open, ref]);
};

export default useOutsideClick;
