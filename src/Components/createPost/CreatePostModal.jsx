import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Divider,
  Textarea,
} from "@heroui/react";
import { useContext, useRef, useState } from "react";
import { FaImages } from "react-icons/fa";
import { createPost, updatePost } from "../../Services/PostSurvices";
import { userContext } from "../../context/UserContext";

export default function CreatePostModal({
  isOpen,
  onOpenChange,
  callBack,
  post,
}) {
  const inputFile = useRef();
  const textareaContent = useRef();
  const { userdata } = useContext(userContext);

  const [isLoading, setisLoading] = useState(false);
  const [formDataFile, setformDataFile] = useState("");
  const [getSelectedFile, setgetSelectedFile] = useState(post?.image || "");
  function openFile() {
    inputFile.current.click();
  }
  function getFile() {
    const file = inputFile.current.files[0];
    setformDataFile(file);
    setgetSelectedFile(URL.createObjectURL(file));
  }

  async function addPost() {
    const formdata = new FormData();
    formdata.append("body", textareaContent.current.value || " ");
    if (formDataFile) {
      formdata.append("image", formDataFile);
    }
    setisLoading(true);
    try {
      if (post) {
        const { data } = await updatePost(formdata, post._id);
        console.log(data);
      } else {
        const { data } = await createPost(formdata);
        console.log(data);
      }
      onOpenChange(false);
      callBack();
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }
  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={() => {
          onOpenChange(false);
          if (!post) {
            setformDataFile("");
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                {post ? "Update" : "Create"} Post
              </ModalHeader>
              <Divider />
              <ModalBody>
                <div className="flex items-center gap-1">
                  <div className="size-12 rounded-full overflow-hidden">
                    <img src={userdata.photo} alt="user image" />
                  </div>
                  <div>{userdata.name} </div>
                </div>
                <Textarea
                  defaultValue={post?.body || ""}
                  ref={textareaContent}
                  minRows={`${getSelectedFile ? "" : 50}`}
                  placeholder={`what's in your mind ,${userdata.name} ?`}
                />
                {getSelectedFile && (
                  <img src={getSelectedFile} alt="selected photo" />
                )}
              </ModalBody>
              <Divider />
              <div className="p-4 flex items-center gap-2.5">
                <span> {post ? "update" : "Add to"} your post </span>
                <FaImages
                  className="text-2xl text-green-500 cursor-pointer"
                  onClick={() => {
                    openFile();
                  }}
                />
                <input
                  onChange={getFile}
                  ref={inputFile}
                  type="file"
                  className="hidden"
                />
              </div>
              <Button
                isLoading={isLoading}
                onPress={() => {
                  addPost();
                }}
                className="m-4"
                color="primary"
              >
                {post ? "Update" : "Post"}
              </Button>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
