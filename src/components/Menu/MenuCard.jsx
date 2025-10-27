import { useContext } from "react";
import MenuImageContainer from "../MenuImageContainer";
import { MenuContext } from "../../contexts/MenuContext";
import axios from "axios";
import { OPTION_ACTIONS } from "../../reducers/Option/actions";
import { motion } from "framer-motion";
import { LayoutContext } from "../../contexts/LayoutContext";
import api from "../../utils/api";
import { fromProductResponseToOptionDto } from "../../utils/dtoMapper";

const MenuCard = ({product, calories}) => {

  const {
    reducer: {
      dispatchRoot
    }
  } = useContext(LayoutContext);
  const {
    isLoading,
    setIsLoading,
    selectedProduct,
    setSelectedProduct
  } = useContext(MenuContext);

  const {
    selectedStoreId
  } = useContext(LayoutContext);

  const handleClickStartOrderButton = () => {
    setIsLoading(true);

    api.get(`/store/${selectedStoreId}/product/${product.storeProductId}`)
    .then(response => {
      const optionResponse = response.data.optionResponses;
      dispatchRoot({
        type: OPTION_ACTIONS.LOAD_OPTIONS,
        payload: {
          optionResponse: optionResponse
        }
      });
      setSelectedProduct(response.data);
    })
    .catch(error => console.error(error))
    .finally(() => setIsLoading(false));
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      whileInView={{opacity: 1}}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all w-full duration-300 overflow-hidden border border-gray-100 group"
    >
      <div className="relative overflow-hidden">
        <MenuImageContainer width="70%" height="200px" imgSrc={product.imageSource}/>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="flex flex-col p-6 space-y-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold h-[100px] text-gray-800 font-['Whatthefont']">{product.name}</h2>
          <div className="flex flex-col items-end">
            <span className="text-2xl font-bold text-[#FE7800] font-['Whatthefont']">${product.price}</span>
            <span className="text-sm text-gray-500">{product.calories} cals</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, laborum esse! Unde, qui illo praesentium, libero ullam possimus sed perspiciatis quaerat sint sequi error nesciunt, suscipit animi ducimus culpa distinctio?
        </p>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleClickStartOrderButton()}
          className="w-full py-4 px-6 bg-gradient-to-r from-[#FE7800] to-orange-500 text-white font-['Whatthefont'] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-500 hover:to-red-500 transform hover:-translate-y-1"
        >
          Start Order
        </motion.button>
      </div>
    </motion.div>
  );
}

export default MenuCard;