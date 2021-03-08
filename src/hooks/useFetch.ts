/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

const useFetch = (setIsLoading: any, fetchMethod: any) =>  {

  useEffect(() => {
  
    async function fetchData() {
      setIsLoading(true);
      fetchMethod();
      setIsLoading(false);
    }
    fetchData();

  }, [setIsLoading, fetchMethod]);
};

export default useFetch;

