import React, { useContext, useEffect, useState } from "react";
import { userPosts } from "../../Services/PostSurvices";
import Post from "../../Components/Post/Post";
import CreatePost from "../../Components/createPost/CreatePost";
import PostSkeleton from "../Skeletons/PostSkeleton";
import { userContext } from "../../context/UserContext";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const [posts, setposts] = useState([]);
  const { userdata } = useContext(userContext);
  const { id } = useParams();

  async function getUsetPosts(userId) {
    const { data } = await userPosts(userId);
    console.log(data);

    setposts(data?.posts);
  }

  useEffect(() => {
    getUsetPosts(id);
  }, []);
  return (
    <>
      <CreatePost />
      {posts.length == 0 ? (
        [...Array(5)].map((skeleton, index) => <PostSkeleton key={index} />)
      ) : (
        <>{posts && posts.map((post) => <Post post={post} key={post.id} />)}</>
      )}
    </>
  );
}
