import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/asideBar/AsideBar";
import Post from "../../Components/Post/Post";
import { getAllPosts } from "../../Services/PostSurvices";
import PostSkeleton from "../Skeletons/PostSkeleton";
import CreatePost from "../../Components/createPost/CreatePost";

export default function NewsFeed() {
  const [posts, setposts] = useState([]);

  async function allPosts() {
    const { data } = await getAllPosts();
    setposts(data?.posts);
  }

  useEffect(() => {
    allPosts();
  }, []);

  return (
    <>
      <CreatePost getPosts={allPosts} />
      {posts.length == 0 ? (
        [...Array(5)].map((skeleton, index) => <PostSkeleton key={index} />)
      ) : (
        <>
          {posts &&
            posts.map((post) => (
              <Post post={post} getPosts={allPosts} key={post.id} />
            ))}
        </>
      )}
    </>
  );
}
