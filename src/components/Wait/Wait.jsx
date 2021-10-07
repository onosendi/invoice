import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Wait = ({ children, milliseconds }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, milliseconds);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return show ? children : null;
};

Wait.propTypes = {
  children: PropTypes.node.isRequired,
  milliseconds: PropTypes.number.isRequired,
};

export default Wait;
