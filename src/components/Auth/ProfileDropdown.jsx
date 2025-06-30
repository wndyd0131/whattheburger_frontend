import { useContext, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { CART_ACTIONS } from "../../reducers/Cart/actions";
import api from "../../utils/api";
import Cookie from "js-cookie";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../../contexts/LayoutContext";
import { ListIcon, LogoutIcon, ProfileIcon } from "../../svg/Utils";

const ProfileDropdown = ({props}) => {

  const {
    setUserDetails
  } = useContext(UserContext);

  const {
    reducer: {
      dispatchRoot
    }
  } = useContext(LayoutContext);

  const {
    isOpened,
    setIsOpened,
    profileRef
  } = props;

  const navigate = useNavigate();

  const handleClickSignOut = () => {
    Cookie.remove("accessToken");
    Cookie.remove("refreshToken");
    setUserDetails({});
    api.get('/cart')
    .then(response => {
      console.log("RESPONSE", response);
      const cartData = response.data;
      dispatchRoot({
        type: CART_ACTIONS.HYDRATE,
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!profileRef.current?.contains(e.target)) {
        console.log("PROFILE_REF", profileRef);
        setIsOpened(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {isOpened &&
      <div className="
        flex
        absolute
        border-1
        border-gray-300
        shadow-md z-1
        rounded-md
        bg-white
        translate-x-6
        whitespace-nowrap

        md:top-[80%]
        max-md:bottom-[80%]
      ">
        <ul className="flex flex-col p-[20px] gap-y-3">
          <li className="flex items-center cursor-pointer gap-2">
              <ProfileIcon width="18px" height="18px"/>
              <p>Profile</p>
          </li>
          <li className="flex items-center cursor-pointer gap-2">
              <ListIcon width="18px" height="18px"/>
              <p>My Order</p>
          </li>
          <li className="flex items-center cursor-pointer gap-2" onClick={() => handleClickSignOut()}>
            <LogoutIcon width="18px" height="18px"/>
            <p>Sign out</p>
          </li>
        </ul>
      </div>
      }
    </>
  );
}

export default ProfileDropdown;