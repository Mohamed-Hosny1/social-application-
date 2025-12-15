import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../../Services/PostSurvices";
import PostSkeleton from "../Skeletons/PostSkeleton";
import PostCardHeader from "../../Components/PostCard/postCardHeader";
import PostCardBody from "../../Components/PostCard/postCardBody";
import PostCardFooter from "../../Components/PostCard/postCardFooter";
import { userContext } from "../../context/UserContext";

export default function PostDetails() {
  const { userdata } = useContext(userContext);
  const { id } = useParams();
  const [post, setpost] = useState("");
  const [isLoading, setisLoading] = useState(true);
  const [postComments, setpostComments] = useState([]);

  async function PostDetails(postId) {
    try {
      const { data } = await getSinglePost(postId);

      setpost(data.post);
      console.log(data);

      setpostComments(data.post.comments);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }

  useEffect(() => {
    PostDetails(id);
  }, []);

  return (
    <>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 mt-5">
        {isLoading ? (
          <PostSkeleton />
        ) : (
          <>
            {/* Header */}
            <PostCardHeader
              photo={post.user.photo}
              name={post.user.name}
              createdAt={post.createdAt}
              postUserId={post.user._id}
              postId={post._id}
            />

            {/* Content */}
            <PostCardBody
              body={post.body}
              img={post.image}
              name={post.user.name}
              id={post._id}
              length={postComments.length}
              isPostDetails={true}
              setpostComments={setpostComments}
            />
            {/* Comment Input */}

            {postComments.length > 0 && (
              <>
                {postComments.map((comment) => (
                  <PostCardFooter
                    key={comment._id}
                    comment={comment}
                    Id={comment._id}
                    length={postComments.length}
                    postUserId={post.user._id}
                    setpostComments={setpostComments}
                    postId={post._id}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
