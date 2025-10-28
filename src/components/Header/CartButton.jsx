import { useContext, useState } from "react";
import { LayoutContext } from "../../contexts/LayoutContext";
import { CartIcon } from "../../svg/Utils";
const CartButton = () => {

  const {
    cartOpened,
    setCartOpened,
    reducer: {
      rootState
    }
  } = useContext(LayoutContext);

  const [cartHovered, setCartHovered] = useState(false);

  const cartState = rootState.cartState;
  let cartList = cartState.cartList;

  return (
    <div className="
      flex
      relative

      md:mx-5
      
      max-md:absolute
      max-md:left-2
      max-md:bottom-6
      "
      onClick={() => setCartOpened(!cartOpened)}
    >
      {cartList.length > 0 &&
        <div className="
          flex
          justify-center
          items-center
          h-[20px]
          w-[20px]
          absolute
          top-[-7px]
          right-[-7px]
          bg-red-500
          rounded-full
          text-white
          text-sm
          cursor-pointer
        ">
          {cartList.length}
        </div>
      }
      <CartIcon width="35px" height="35px" cartHovered={cartHovered} setCartHovered={setCartHovered}/>
    </div>
  );
}

export default CartButton;