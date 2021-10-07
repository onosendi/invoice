import PropTypes from 'prop-types';
import { forwardRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

const Portal = forwardRef(({
  children,
  component: Component,
  id,
  ...props
}, fRef) => {
  const el = useMemo(() => {
    const newEl = document.createElement('div');
    newEl.dataset.portalId = id;
    return newEl;
  }, []);

  useEffect(() => {
    document.body.appendChild(el);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return createPortal(<Component ref={fRef} {...props}>{children}</Component>, el);
});

Portal.defaultProps = {
  component: 'div',
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default Portal;
