import { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import ProfileDropdown from "./Auth/ProfileDropdown";
import { Link } from "react-router-dom";

const AuthSection = () => {

  const profileRef = useRef();

  const {
    userDetails,
  } = useContext(UserContext);

  const [isOpened, setIsOpened] = useState(false);

  const truncate = (name, maxLength = 12) => {
    if (!name) return "";
    return name.length > maxLength ? name.slice(0, maxLength) + "..." : name;
  }

  return (
    <>
      {userDetails?.isAuthenticated === true ?
      <div ref={profileRef} className="flex relative justify-center items-center gap-[10px] mx-5 space-x-0">
        <div className="flex justify-center items-center overflow-hidden border-1 border-gray-300 shadow-sm rounded-full min-w-[40px] cursor-pointer">
          <img className="w-[40px] h-[40px]" src="/private/logo/whattheburger-logo.png"></img>
        </div>
        <p onClick={() => setIsOpened(!isOpened)} className="underline font-[sans-serif] line-clamp-3 leading-relaxed cursor-pointer whitespace-nowrap">{`Welcome, ${truncate(userDetails.firstName)} ${userDetails.lastName[0]}.`}</p>
        <ProfileDropdown props={{isOpened: isOpened, setIsOpened: setIsOpened, profileRef: profileRef}}/>
      </div>
      :
      <div className="
      flex

      max-md:self-center
      max-md:justify-self-center">
        <Link
          to="/auth"
          className="flex w-[100px] h-[40px] bg-white border shadow-md border-[#FE7800] rounded-full justify-center items-center font-bold cursor-pointer hover:bg-[#FE7800] hover:text-white duration-200"
        >
          Sign In
        </Link>
      </div>
      } 
    </>
  );
}

export default AuthSection;