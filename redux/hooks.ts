import { useSelector } from 'react-redux';

import type { RootState } from 'redux/store';

export const useApp = () => {
  return useSelector((state: RootState) => state.app);
}
