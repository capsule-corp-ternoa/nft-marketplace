import { useContext } from 'react';

import { CreateNftContext } from './Provider';
import { CreateNftContextProps } from './types';

export function useCreateNftContext(): CreateNftContextProps {
  return useContext(CreateNftContext);
}
