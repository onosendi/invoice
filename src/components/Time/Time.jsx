import cx from 'clsx';
import PropTypes from 'prop-types';

const Time = ({ className, date }) => {
  const getDatetime = () => {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const d = date.getUTCDate();
    return `${year}-${month}-${d}`;
  };

  const getLocaleString = () => date.toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <time className={cx(className)} dateTime={getDatetime()}>{getLocaleString()}</time>
  );
};

Time.defaultProps = {
  className: null,
};

Time.propTypes = {
  className: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default Time;
