import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Skeleton,
  useDisclosure,
} from "@heroui/react";
import { FaRegImage } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { RiVideoFill } from "react-icons/ri";
import CreatePostModal from "./CreatePostModal";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";

export default function CreatePost({ getPosts }) {
  const { userdata, isLoading } = useContext(userContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center gap-2">
          <Skeleton className="shrink-0 flex rounded-full size-10" />
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-3 w-3/5 rounded-lg" />
            <Skeleton className="h-3 w-4/5 rounded-lg" />
          </div>
        </div>
      ) : (
        <Card>
          <CardBody className="flex items-center flex-row">
            <div className="size-10 rounded-full overflow-hidden">
              <img src={userdata.photo} alt="user image" />
            </div>
            <Input
              type="text"
              placeholder={`what's in your mind ,${userdata.name} ?`}
              onClick={onOpen}
            />
          </CardBody>
          <Divider />
          <CardFooter className="p-5 flex justify-around">
            <div className="flex gap-2">
              <IoVideocam className="size-6 text-orange-500" />
              <p>Go Live</p>
            </div>
            <div className="flex gap-2">
              <FaRegImage className="size-6 text-green-500" />
              <p>Photo</p>
            </div>
            <div className="flex gap-2">
              <RiVideoFill className="size-6 text-red-500" />

              <p>Video</p>
            </div>
            <div className="flex gap-2">
              <MdEmojiEmotions className="size-6 text-blue-500" />
              <p>Feelings</p>
            </div>
          </CardFooter>
        </Card>
      )}
      <CreatePostModal
        callBack={getPosts}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
