import PostCardHeader from "../PostCard/postCardHeader";
import PostCardBody from "../PostCard/postCardBody";
import PostCardFooter from "../PostCard/postCardFooter";
import { useState } from "react";

export default function Post({ post, getPosts }) {
  const [postComments, setpostComments] = useState(post.comments);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <PostCardHeader
        photo={post.user.photo}
        name={post.user.name}
        createdAt={post.createdAt}
        postUserId={post.user._id}
        getPosts={getPosts}
        post={post}
        postId={post._id}
      />

      {/* Content */}
      <PostCardBody
        body={post.body}
        img={post.image}
        name={post.user.name}
        id={post._id}
        length={postComments.length}
        setpostComments={setpostComments}
      />
      {/* Comment Input */}
      {post.comments.length > 0 && (
        <PostCardFooter
          length={postComments.length}
          comment={postComments[0]}
          postId={post._id}
          isNewsFeed={true}
          postUserId={post.user._id}
          setpostComments={setpostComments}
        />
      )}
    </div>
  );
}
