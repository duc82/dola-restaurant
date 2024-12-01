import { useEffect, useState } from "react";

interface FuncState<T> {
  data: T;
  total?: number;
  skip?: number;
}

export default function useFetchPagination<T>(
  func: () => Promise<FuncState<T>>,
  initialState: T
) {
  const [data, setData] = useState<T>(initialState);
  const [total, setTotal] = useState<number>(0);
  const [skip, setSkip] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    func()
      .then((res) => {
        setData(res.data);
        if (res.total !== undefined && res.skip !== undefined) {
          setTotal(res.total);
          setSkip(res.skip);
        }
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [func]);

  return { data, total, skip, isLoading, error, setData };
}
