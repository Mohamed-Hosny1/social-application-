import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import React, { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import { Link } from "react-router-dom";
import { userContext } from "../../context/UserContext";
import {
  deleteComment,
  postComments,
  updateComment,
} from "../../Services/CommentSurvices";
import CreateCommentModal from "../comment/createCommentModal";

export default function PostCardFooter({
  length,
  comment,
  Id,
  isNewsFeed,
  postUserId,
  postId,
  setpostComments,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { userdata } = useContext(userContext);
  const [isLoading, setisLoading] = useState(false);
  async function removeComment(commentId) {
    setisLoading(true);
    try {
      const { data } = await deleteComment(commentId);

      getNewComments(postId);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }
  async function getNewComments(postId) {
    try {
      const { data } = await postComments(postId);
      setpostComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* Comments */}
      {length > 0 && (
        <>
          <div className="p-4">
            <div className="flex items-start gap-3">
              <img
                src={
                  comment.commentCreator.photo.includes("/undefined")
                    ? "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                    : comment.commentCreator.photo
                }
                alt={comment.commentCreator.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 grow bg-gray-50 rounded-2xl px-4 py-3">
                <h4 className="font-semibold text-sm text-gray-900">
                  {comment.commentCreator.name}
                </h4>
                <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
              </div>
              {userdata._id == postUserId &&
                userdata._id == comment.commentCreator._id && (
                  <Dropdown placement="bottom-end ">
                    <DropdownTrigger>
                      <BsThreeDotsVertical className="w-5 h-5" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      <DropdownItem key="edit" className="h-14 gap-2">
                        <p onClick={onOpen} className="font-semibold">
                          Edit
                        </p>
                      </DropdownItem>
                      {isLoading ? (
                        <Spinner />
                      ) : (
                        <DropdownItem key="delete" className="h-14 gap-2">
                          <p
                            color="danger"
                            className="font-semibold text-danger-500"
                            onClick={() => {
                              removeComment(comment._id);
                            }}
                          >
                            Delete
                          </p>
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                )}
            </div>
            <div>
              {isNewsFeed && (
                <>
                  <Link
                    to={`/postDetails/${Id}`}
                    className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-3 mx-auto hover:text-gray-700 "
                  >
                    View all comments
                    <IoChevronDown className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
          <CreateCommentModal
            setpostComments={setpostComments}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            comment={comment}
          />
        </>
      )}
    </>
  );
}
