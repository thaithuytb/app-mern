import React, { useState } from "react";
import postsApi from "./../api/postsApi";

export const postsContext = React.createContext();

const PostsContextProvider = ({ children }) => {
  const [dataPosts, setDataPosts] = useState({
    isloading: true,
    posts: [],
  });
  // get posts
  const getAllMyPosts = async () => {
    const { getPosts } = postsApi;
    try {
      const response = await getPosts();
      if (response.data.success) {
        setDataPosts({
          ...dataPosts,
          isloading: false,
          posts: response.data.posts,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // post posts
  const postSinglePost = async (post) => {
    const { postMyPost } = postsApi;
    try {
      const response = await postMyPost(post);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }

  }
  // put posts
  const putSinglePost = async (dataFix) => {
    const { putMyPost } = postsApi;
    try {
      const response = await putMyPost(dataFix);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  }

  const dataContextPosts = { dataPosts, getAllMyPosts, postSinglePost, putSinglePost };
  return (
    <postsContext.Provider value={dataContextPosts}>
      {children}
    </postsContext.Provider>
  );
};

export default PostsContextProvider;
