export interface PostProps {
  post: {
    title: string;
    body: string;
    id: number;
  };
}

const Post = ({ post }: PostProps) => {
  const postBody = (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>
    </>
  );

  return <article>{postBody}</article>;
};

export default Post;
