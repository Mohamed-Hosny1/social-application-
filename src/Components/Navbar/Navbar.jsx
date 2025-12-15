import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
} from "@heroui/react";
import HosnyLogo from "../../assets/images/MyLogo.png";
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { RiMessage2Fill } from "react-icons/ri";
import { FaBell } from "react-icons/fa";
import { userContext } from "../../context/UserContext";
export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function NavbarUi() {
  const { userdata, isLoading } = useContext(userContext);
  const { setToken } = useContext(authContext);
  const navigate = useNavigate();
  function logOutUser() {
    localStorage.removeItem("userToken");
    setToken("");
    navigate("/login");
  }
  return (
    <>
      <Navbar isBordered maxWidth="xl">
        <NavbarContent>
          <NavbarBrand className="mr-4">
            <NavLink to={"/home"}>
              <figure className=" flex items-center ">
                <img
                  src={HosnyLogo}
                  alt="logo"
                  width={55}
                  className=" rounded-full"
                />
                <span className="sm:block font-bold text-2xl ms-2">
                  Hosny App
                </span>
              </figure>
            </NavLink>
          </NavbarBrand>
          <NavbarBrand className="hidden sm:flex gap-3">
            <Input
              classNames={{
                base: "max-w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="lg"
              startContent={<SearchIcon size={18} />}
              type="search"
              radius="full"
            />
          </NavbarBrand>
          <NavbarContent as="div" className="items-center" justify="end">
            <NavbarItem className="bg-gray-200 size-10 flex justify-center items-center rounded-full">
              <Badge color="danger" content="5">
                <RiMessage2Fill className="text-2xl" />
              </Badge>
            </NavbarItem>
            <NavbarItem className="bg-gray-200 size-10 flex justify-center items-center rounded-full">
              <Badge color="danger" content="5">
                <FaBell className="text-2xl" />
              </Badge>
            </NavbarItem>
            <Dropdown placement="bottom-end ">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={userdata.name}
                  size="sm"
                  src={userdata.photo}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userdata.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">
                  <NavLink to={`/userProfile/${userdata._id}`}>
                    My Profile
                  </NavLink>
                </DropdownItem>

                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => {
                    logOutUser();
                  }}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </NavbarContent>
      </Navbar>
    </>
  );
}
