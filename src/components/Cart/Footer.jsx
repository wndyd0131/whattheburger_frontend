import { useContext, useState } from 'react'
import api from '../../utils/api';
import { LayoutContext } from '../../contexts/LayoutContext';
import { CART_ACTIONS } from '../../reducers/Cart/actions';
import { toast } from 'react-toastify';

const Footer = () => {

  const { 
    reducer: {
      rootState,
      dispatchRoot
    }
  } = useContext(LayoutContext);

  const cartState = rootState.cartState;

  const [trashCanIconHovered, setTrashCanIconHovered] = useState(false);

  const [signInModalOpened, setSignInModalOpened] = useState(false);

  const handleClickOrderButton = () => {
    setSignInModalOpened(true);
  }

  const handleClickTrashCanIcon = () => {
    api.delete('/cart')
     .then(res => {
        const cartData = res.data;
        dispatchRoot({
          type: CART_ACTIONS.LOAD_ALL_PRODUCTS,
          payload: {
            cartData: cartData
          }
        });
        toast.success('Successfully deleted from cart');
      })
      .catch(
        err => {
          toast.error('Failed to delete from cart');
          console.error(err);
        });
  }

  return (
    <>
      <div className="flex relative justify-center items-center basis-1/12 w-full border-t-1 border-gray-200 gap-10">
          <motion.button
            onClick={() => handleClickOrderButton()}
            disabled={cartState.cartList.length === 0}
            className={`py-4 px-10 text-white text-lg font-['Whatthefont'] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300
              ${cartState.cartList.length === 0 ? "bg-gray-300" : "bg-gradient-to-r from-[#FE7800] to-orange-500 hover:from-orange-500 hover:to-red-500 transform"}  
            `}
          >
            Order
          </motion.button>

        <button
          className={`
            flex absolute right-5 justify-center items-center border  font-['Whatthefont'] w-[40px] h-[40px] rounded-full whitespace-nowrap
            ${cartState.cartList.length === 0 ? "border-gray-200 bg-gray-200" : "bg-white border-[#FE7800] hover:bg-[#FE7800] hover:border-white cursor-pointer"}
            `}
          disabled={cartState.cartList.length === 0}
          onClick={() => handleClickTrashCanIcon()}
          onMouseEnter={() => setTrashCanIconHovered(true)}
          onMouseLeave={() => setTrashCanIconHovered(false)}
        >
          <TrashCanIcon width={30} height={30} color={trashCanIconHovered ? "#FFFFFF" : cartState.cartList.length === 0 ? "#999999" : "#FE7800"}/>
        </button>
      </div>
      {
        signInModalOpened &&
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{ duration: 0.3 }}
          className="flex fixed justify-center items-center w-full h-full top-0 left-0 bg-black/60 backdrop-blur-sm z-50"
        >
          <motion.div 
            initial={{y: 100, opacity: 0, scale: 0.9}}
            animate={{y: 0, opacity: 1, scale: 1}}
            exit={{y: 100, opacity: 0, scale: 0.9}}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col px-30 py-10 relative rounded-3xl bg-white overflow-hidden shadow-2xl border border-gray-100"
          >
            <SignInSection signInModalOpened={signInModalOpened} setSignInModalOpened={setSignInModalOpened}/>
          </motion.div>
        </motion.div>
      }
    </>
  )
}

export default Footer