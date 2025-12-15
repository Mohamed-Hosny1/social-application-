import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCamera, BiMessageRounded, BiShareAlt } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import { BsEmojiSmile } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button } from "@heroui/react";
import { createComment, postComments } from "../../Services/CommentSurvices";
import { toast } from "react-toastify";

export default function PostCardBody({
  body,
  img,
  name,
  id,
  length,
  isPostDetails,
  setpostComments,
}) {
  const [commentMsg, setcommentMsg] = useState("");
  const [isLoading, setisLoading] = useState(false);

  async function sendComment(comment) {
    setisLoading(true);
    try {
      const { data } = await createComment(comment);
      setpostComments(data.comments);

      setcommentMsg("");
      toast.success("Comment Added Successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }

  function writeComment(e) {
    setcommentMsg(e.target.value);
  }

  return (
    <>
      <div className="px-4 pb-3">
        <p className="text-gray-800">{body}</p>
      </div>

      {/* Image */}
      {img && (
        <>
          <div className="w-full">
            <img
              src={img || "https://i.sstatic.net/y9DpT.jpg"}
              alt={name}
              className={`w-full  object-cover ${isPostDetails ? "" : "h-80"}`}
            />
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex items-center gap-6 px-4 py-3 border-b border-gray-100">
        <button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors">
          <AiOutlineHeart className="w-6 h-6" />
          <span className="font-medium">1200</span>
        </button>
        <Link
          to={`/postDetails/${id}`}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors"
        >
          <BiMessageRounded className="w-6 h-6" />

          <span className="font-medium">{length}</span>
        </Link>
        <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
          <BiShareAlt className="w-6 h-6" />
          <span className="font-medium">17</span>
        </button>
      </div>
      {/* write comment */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <input
          onChange={(e) => {
            writeComment(e);
          }}
          type="text"
          placeholder="Write your comment"
          value={commentMsg}
          className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onPress={() => {
            sendComment({
              content: commentMsg,
              post: id,
            });
          }}
          size="sm"
          radius="full"
          variant="ghost"
          color="primary"
          isLoading={isLoading}
          disabled={commentMsg ? false : true}
          className="text-gray-500 hover:text-gray-700 cursor-pointer disabled:bg-gray-200 disabled:cursor-not-allowed disabled:border-none "
        >
          <IoIosSend className="w-6 h-6" />
        </Button>
        <button className="text-gray-400 hover:text-gray-600">
          <BiCamera className="w-5 h-5" />
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <BsEmojiSmile className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
