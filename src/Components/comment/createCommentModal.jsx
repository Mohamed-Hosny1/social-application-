import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  Divider,
  Textarea,
} from "@heroui/react";
import { useContext, useRef, useState } from "react";
import { userContext } from "../../context/UserContext";
import { updateComment } from "../../Services/CommentSurvices";

export default function CreateCommentModal({
  isOpen,
  onOpenChange,
  comment,
  setpostComments,
}) {
  const textareaContent = useRef();

  const [isLoading, setisLoading] = useState(false);
  const [commentMsg, setcommentMsg] = useState("");

  async function editComment() {
    setisLoading(true);
    try {
      const { data } = await updateComment(
        { content: textareaContent.current.value },
        comment._id
      );
      console.log(data);
      onOpenChange(false);
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
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <Textarea
                  defaultValue={comment.content}
                  ref={textareaContent}
                  minRows={` "" : 10}`}
                  className="p-2"
                />
              </ModalBody>
              <Divider />
              <Button
                isLoading={isLoading}
                onPress={() => {
                  editComment();
                }}
                className="m-4 w-1/2 mx-auto"
                color="primary"
              >
                update
              </Button>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
