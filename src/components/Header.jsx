import Navigation from "./Navigation";
import AuthSection from "./AuthSection";
import { motion } from "framer-motion";
import { Cart } from "../svg/Utils";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { LayoutContext } from "../contexts/LayoutContext";
import axios from "axios";
import { ACTIONS } from "../reducers/Option/actions";

const Header = () => {
  const {
    userDetails
  } = useContext(UserContext);

  const {
    cartOpened,
    setCartOpened,
    reducer
  } = useContext(LayoutContext);

  const [cartHovered, setCartHovered] = useState(false);

  const {
    dispatchRoot
  } = reducer;

  const handleClickCartButton = () => {
    axios.get("http://localhost:8080/api/v1/cart", {
      withCredentials: true
    })
    .then(response => {
      console.log("CART", response.data);
      const cartData = response.data;
      dispatchRoot({
        type: ACTIONS.HYDRATE,
        payload: {
          cartData: cartData
        }
      })
    })
    .catch(err => console.error(err));
    setCartOpened(!cartOpened);
  }

  return (
      <motion.header
        initial={{y: '-5vh'}}
        animate={{y: 0}}
        className="flex sticky bg-white flex-row items-center top-0 h-[60px] shadow-[0_4px_3px_-5px_rgba(0,0,0,0.5)] z-40">
          <div className="flex basis-1/5 justify-start pl-5">
            <a className="flex" href="/">
              <img className="h-18" src="/private/logo/whattheburger-logo.png"/>
              <p className="self-center font-['Whatthefont'] text-[#FE7800] text-2xl">Whattheburger</p>
            </a>
          </div>
          <Navigation></Navigation>
          <div className="flex items-center justify-end pr-5 basis-1/5">
            {userDetails.isAuthenticated &&
              <div onClick={() => handleClickCartButton()}>
                <Cart width="35px" height="35px" cartHovered={cartHovered} setCartHovered={setCartHovered}/>
              </div>
            }

            <AuthSection></AuthSection>
          </div>
      </motion.header>
  );
}

export default Header;