import { useContext } from "react";
import MenuImageContainer from "../MenuImageContainer";
import { MenuContext } from "../../contexts/MenuContext";
import axios from "axios";
import { ACTIONS } from "../../reducers/Menu/actions";
import { motion } from "framer-motion";

const MenuBox = ({product, productIdx, imgSrc, calories}) => {

  const {
    setSelectedProduct,
    setProductResponse,
    dispatchOrder,
    setIsLoading
  } = useContext(MenuContext);

  const handleClickStartOrderButton = () => {
    setIsLoading(true);

    axios.get(`http://localhost:8080/api/v1/products/${product.productId}`)
    .then(response => {
      console.log("RESPONSE: ", response.data);
      const optionResponse = response.data.optionResponses;
      dispatchOrder({
        type: ACTIONS.LOAD_OPTIONS,
        payload: {
          optionResponse: optionResponse
        }
      })
      setProductResponse(response.data);
    })
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false));
    setSelectedProduct(product);
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      className="flex flex-col border-1 border-[rgb(226,226,226)] rounded-[15px] w-[300px] justify-self-center self-center justify-center items-center text-[#FE7800] font-['Whatthefont']">
      <MenuImageContainer width="100%" height="220px" imgSrc={imgSrc}/>
      <div className="flex flex-col w-full h-[150px]">
        <div className="flex flex-col gap-[10px] px-[20px]">
          <h2>{product.productName}</h2>
          <p className="line-clamp-3 text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, laborum esse! Unde, qui illo praesentium, libero ullam possimus sed perspiciatis quaerat sint sequi error nesciunt, suscipit animi ducimus culpa distinctio?</p>
          <h3 className="flex justify-end">{calories} cals</h3>
        </div>
      </div>
      <div className="flex justify-center items-center w-full mt-[30px] mb-[20px]">
        <a>
          <div 
            className="flex justify-center items-center border-1 border-[#FE7800] font-['Whatthefont'] text-[20px] text-[#FE7800] bg-white rounded-[100px] w-[200px] h-[45px] cursor-pointer hover:bg-[#FE7800] hover:text-white hover:transition-[0.5s]"
            onClick={() => handleClickStartOrderButton()}
          >
            Start Order
          </div>
        </a>
      </div>
    </motion.div>
  );
}

export default MenuBox;