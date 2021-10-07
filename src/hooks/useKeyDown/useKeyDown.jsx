import { useCallback, useEffect } from 'react';

const useKeyDown = ({ keyHandlerArr, open }) => {
  const listener = useCallback((event) => {
    keyHandlerArr.forEach((keyHandler) => {
      const [key, handler] = keyHandler;
      if (key.includes(event.key)) {
        handler();
      }
    });
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener('keydown', listener);
    } else {
      document.removeEventListener('keydown', listener);
    }
  }, [keyHandlerArr, open]);
};

export default useKeyDown;
