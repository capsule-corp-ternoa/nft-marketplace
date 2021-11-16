import { useContext } from 'react';

import { CreateNftContext } from './Provider';
import { CreateNftContextProps } from './types';

export function useCreateNftContext(): CreateNftContextProps {
  const createNftContext = useContext(CreateNftContext);

  if (createNftContext === undefined) {
    throw new Error('Create NFT context undefined')
  }

  return createNftContext
}
