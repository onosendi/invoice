import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import isEmpty from '../../utils/isEmpty';

const useRedux = ({
  actionFn,
  data,
  selector,
}) => {
  const dispatch = useDispatch();
  const d = useSelector(selector);

  useEffect(() => {
    if (isEmpty(d)) {
      dispatch(actionFn(data));
    }
  }, [actionFn, data, selector]);
};

export default useRedux;
