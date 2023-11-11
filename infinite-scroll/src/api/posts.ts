import axios from "axios";

const getPostsByPageNumber = async (pageNumber = 1, options = {}) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}`,
    options
  );
  return response.data;
};

export default getPostsByPageNumber;
