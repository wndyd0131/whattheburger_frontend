import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { CART_ACTIONS } from "../../reducers/Cart/actions";
import api from "../../utils/api";
import Cookie from "js-cookie";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../../contexts/LayoutContext";
import { fetchCart } from "../../api/cart";
import { ListIcon, LogoutIcon, ProfileIcon } from "../../svg/Utils";

const ProfileDropdown = ({props}) => {

  const {
    setUserDetails
  } = useContext(UserContext);

  const {
    reducer: {
      dispatchRoot
    },
    selectedStoreId
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
    setUserDetails(undefined);
    if (selectedStoreId) {
      fetchCart(selectedStoreId)
        .then(data => {
          const cartData = data;
          dispatchRoot({
            type: CART_ACTIONS.LOAD_ALL_PRODUCTS,
            payload: {
              cartData: cartData
            }
          });
        })
        .catch(err => {
          console.error(err);
        })
    }
    toast.success('Successfully signed out');
    navigate("/");
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!profileRef.current?.contains(e.target)) {
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
        shadow-md
        rounded-md
        bg-white
        w-full
        translate-x-6
        whitespace-nowrap

        md:top-[80%]
        max-md:bottom-[80%]
      ">
        <ul className="flex flex-col w-full">
          <li className="flex items-center cursor-pointer gap-2 p-3 hover:bg-gray-100">
              <ProfileIcon width="18px" height="18px"/>
              <p>Profile</p>
          </li>
          <li className="flex items-center cursor-pointer gap-2 p-3 hover:bg-gray-100">
              <ListIcon width="18px" height="18px"/>
              <p>My Order</p>
          </li>
          <li className="flex items-center cursor-pointer gap-2 p-3 hover:bg-gray-100" onClick={() => handleClickSignOut()}>
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