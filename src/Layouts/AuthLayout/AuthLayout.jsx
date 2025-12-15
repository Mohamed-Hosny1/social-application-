import { Outlet } from "react-router-dom";
import NavbarUi from "../../Components/Navbar/Navbar";
import HosnyLogo from "../../assets/images/Hosny.png";

export default function AuthLayout() {
  return (
    <>
      <NavbarUi />

      <div className="grid grid-cols-3 Auth-background">
        <div className="hidden md:block md:col-span-1 ">
          <img src={HosnyLogo} alt="AppLogo" className="w-full h-screen" />
        </div>
        <div className=" col-span-3 md:col-span-2 flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </>
  );
}
