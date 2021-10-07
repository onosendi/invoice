import cx from 'clsx';
import PropTypes from 'prop-types';
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Portal } from '..';
import { useKeyDown, useOutsideClick, useWindowResize } from '../../hooks';
import styles from './Popover.module.scss';

const Popover = forwardRef(({
  anchorEl,
  children,
  className,
  closeClass,
  component,
  id,
  marginThreshold,
  onClose,
  open,
  openClass,
  origin,
  ...props
}, fRef) => {
  const ref = fRef || useRef(null);
  const [out, setOut] = useState(false);

  const isAnimated = openClass && closeClass;

  const handleClose = () => {
    if (isAnimated) {
      setOut(true);
    } else {
      onClose();
    }
  };

  const handleAnimationEnd = () => {
    if (out) {
      setOut(false);
      onClose();
    }
  };

  useOutsideClick({ handler: handleClose, open, ref });
  useWindowResize({ handler: handleClose, open, ref });
  useKeyDown({ keyHandlerArr: [[['Escape'], handleClose]], open });

  const getPositionStyle = (el) => {
    const anchorRect = anchorEl.getBoundingClientRect();
    const portalRect = el.getBoundingClientRect();

    let left = anchorRect.x;
    const top = anchorRect.y + anchorRect.height;
    const { innerWidth } = window;

    if (origin === 'center') {
      left += (anchorRect.width / 2) - (portalRect.width / 2);
    }

    const right = left + portalRect.width;

    if (left < marginThreshold) {
      left = marginThreshold;
    } else if (right > (innerWidth - marginThreshold)) {
      left -= right - innerWidth + marginThreshold;
    }

    return {
      left: `${left}px`,
      top: `${top}px`,
    };
  };

  const setPositionStyle = () => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const position = getPositionStyle(el);

    el.style.left = position.left;
    el.style.top = position.top;
  };

  useEffect(() => {
    if (open) {
      setPositionStyle();
    }
  }, [open]);

  const getAnimationClass = () => {
    if (isAnimated) {
      return out ? closeClass : openClass;
    }
    return null;
  };

  const renderPortal = () => (
    <Portal
      className={cx(
        styles.popover,
        getAnimationClass(),
        className,
      )}
      component={component}
      id={id}
      onAnimationEnd={handleAnimationEnd}
      ref={ref}
      {...props}
    >
      {children}
    </Portal>
  );

  return open ? renderPortal() : null;
});

Popover.defaultProps = {
  anchorEl: null,
  className: null,
  closeClass: null,
  component: 'div',
  marginThreshold: 20,
  openClass: null,
  origin: 'left',
};

Popover.propTypes = {
  // eslint-disable-next-line prefer-arrow-callback
  anchorEl: PropTypes.instanceOf(global.Element || function never() {}),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  closeClass: PropTypes.string,
  component: PropTypes.string,
  id: PropTypes.string.isRequired,
  marginThreshold: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  openClass: PropTypes.string,
  origin: PropTypes.string,
};

export default Popover;
