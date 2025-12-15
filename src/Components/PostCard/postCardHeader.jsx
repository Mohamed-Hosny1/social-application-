import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import React, { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { userContext } from "../../context/UserContext";
import CreatePostModal from "../createPost/CreatePostModal";
import { deletePost } from "../../Services/PostSurvices";

export default function PostCardHeader({
  photo,
  name,
  createdAt,
  postUserId,
  getPosts,
  post,
  postId,
}) {
  const { userdata } = useContext(userContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setisLoading] = useState(false);

  async function removePost(postId) {
    setisLoading(true);
    try {
      const { data } = await deletePost(postId);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={photo}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">
              {new Date(createdAt).toLocaleString("en-US", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </p>
          </div>
        </div>

        {postUserId == userdata._id && (
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
              <DropdownItem key="delete" className="h-14 gap-2">
                <p
                  color="danger"
                  className="font-semibold text-danger-500"
                  onClick={() => {
                    removePost(postId);
                  }}
                >
                  Delete
                </p>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
        <CreatePostModal
          callBack={getPosts}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          post={post}
        />
      </div>
    </>
  );
}
