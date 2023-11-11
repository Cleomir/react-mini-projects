import { useState, useRef, useEffect } from "react";

import usePosts from "../hooks/usePosts";
import Post from "./Post";

const Posts = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { error, hasNextPage, isError, isLoading, results } =
    usePosts(pageNumber);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const lastPostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (intersectionObserverRef.current) {
      intersectionObserverRef.current.disconnect();
    }

    intersectionObserverRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        setPageNumber((previousPageNum) => previousPageNum + 1);
      }
    });
    if (lastPostRef.current) {
      intersectionObserverRef.current.observe(lastPostRef.current);
    }
  }, [isLoading, hasNextPage]);

  if (isError) {
    return <p className="center">Error: {(error as Error).message}</p>;
  }

  const content = results.map((post, index) => {
    return (
      <Post
        key={post.id}
        post={post}
      />
    );
  });

  return (
    <>
      {content}
      <div ref={lastPostRef}></div>
      {isLoading && <p className="center">Loading More Posts...</p>}
      <p className="center">
        <a href="#top">Back to Top</a>
      </p>
    </>
  );
};

export default Posts;
