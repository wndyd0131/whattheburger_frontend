import { useState, useContext, useRef, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { ACTIONS } from "../reducers/Cart/actions";
import { LayoutContext } from "../contexts/LayoutContext";
import { toast } from "react-toastify";

const AuthSection = () => {

  const {
    userDetails,
    setUserDetails
  } = useContext(UserContext);

  const {
    reducer: {
      dispatchRoot
    }
  } = useContext(LayoutContext);

  const [isOpened, setIsOpened] = useState(false);

  const ref = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current?.contains(e.target)) {
        setIsOpened(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClickSignOut = () => {
    Cookie.remove("accessToken");
    Cookie.remove("refreshToken");
    setUserDetails({});
    api.get('/cart')
    .then(response => {
      console.log("RESPONSE", response);
      const cartData = response.data;
      dispatchRoot({
        type: ACTIONS.HYDRATE,
        payload: {
          cartData: cartData
        }
      });
      toast.success('Successfully signed out');
    })
    .catch(err => {
      toast.error('Failed to sign out');
      console.error(err);
    });
    navigate("/");
  }

  {console.log(userDetails)}
  return (
    <>
    {userDetails.isAuthenticated === true ?
    <div className="flex justify-center items-center gap-[10px] mx-5">
      <div className="flex justify-center items-center overflow-hidden border-1 rounded-full cursor-pointer">
        <img className="w-[40px] h-[40px]" src="/private/logo/whattheburger-logo.png"></img>
      </div>
      <p onClick={() => setIsOpened(true)} className="underline cursor-pointer">{`Welcome, ${userDetails.firstName} ${userDetails.lastName[0]}`}</p>
      {isOpened &&
      <div ref={ref} className="flex absolute top-[75%] border-1 border-gray-300 shadow-xl z-1 rounded-md bg-white translate-x-6">
        <ul className="flex flex-col p-[20px] gap-y-2">
          <li className="cursor-pointer font-bold">Profile</li>
          <li className="cursor-pointer font-bold">My Order</li>
          <li className="cursor-pointer font-bold" onClick={() => handleClickSignOut()}>Sign Out</li>
        </ul>
      </div>
      }
    </div>
    :
    <div className="flex mx-[100px]">
      <a href="/auth"><button className="flex w-[100px] h-[40px] bg-white border-1 border-[#FE7800] rounded-full justify-center items-center font-bold cursor-pointer hover:bg-[#FE7800] hover:text-white duration-200">Sign in</button></a>
    </div>
    } 

    </>
  );
}

export default AuthSection;