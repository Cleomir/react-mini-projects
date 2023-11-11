import { useState, useEffect } from "react";
import getPostsByPageNumber from "../api/posts";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const usePosts = (pageNumber = 1) => {
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | {}>({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setIsError(false);
      setError({});

      const controller = new AbortController();
      const { signal } = controller;

      try {
        const data = await getPostsByPageNumber(pageNumber, { signal });
        setResults((previous) => [...previous, ...data]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (signal.aborted) {
          return;
        }
        setIsError(true);
        setError({ message: (error as Error).message });
      }

      return () => controller.abort();
    })();
  }, [pageNumber]);

  return { results, isLoading, isError, error, hasNextPage };
};

export default usePosts;
