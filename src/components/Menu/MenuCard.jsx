import { useContext } from "react";
import MenuImageContainer from "./MenuImageContainer";
import { MenuContext } from "../../contexts/MenuContext";
import { OPTION_ACTIONS } from "../../reducers/Option/actions";
import { motion } from "framer-motion";
import { LayoutContext } from "../../contexts/LayoutContext";
import api from "../../utils/api";
import { fetchStoreProduct } from "../../api/product";


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

    fetchStoreProduct(selectedStoreId, product.storeProductId)
    .then(data => {
      console.log("Product Info: ", data)
      const optionResponse = data.optionResponses;
      dispatchRoot({
        type: OPTION_ACTIONS.LOAD_OPTIONS,
        payload: {
          optionResponse: optionResponse
        }
      });
      setSelectedProduct(data);
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
      className="flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all w-full duration-300 overflow-hidden border border-gray-100 group aspect-[1/1.5]
        min-h-[350px]
        sm:max-w-[300px]
        lg:scale-[1]
      "
    >
      <div className="flex relative justify-center items-center object-cover bg-gray-50">
        <div className="flex justify-center items-center w-full h-full max-w-[70%] overflow-hidden">
          <img 
            src={product.imageSource}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
            alt="Menu item"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="flex flex-col p-3 space-y-4 w-full">
        <div className="flex justify-between">
          <h2 className="text-sm font-bold h-full text-gray-800 font-['Whatthefont']
            lg:text-md
          ">{product.name}</h2>
          <div className="flex flex-col items-end w-[80px]">
            <span className="text-md font-bold text-[#FE7800] font-['Whatthefont']">${product.price.toFixed(2)}</span>
            <span className="text-xs text-gray-500
            ">{product.calories} cals</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-xs line-clamp-3 leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, laborum esse! Unde, qui illo praesentium, libero ullam possimus sed perspiciatis quaerat sint sequi error nesciunt, suscipit animi ducimus culpa distinctio?
        </p>
  
      </div>
 <div className="flex flex-1 justify-center items-end px-5 pb-5
      ">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleClickStartOrderButton()}
          className="w-full h-full px-2 py-2 bg-gradient-to-r from-[#FE7800] to-orange-500 text-white font-['Whatthefont'] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-orange-500 hover:to-red-500 transform hover:-translate-y-1
            max-h-[50px]
          "
        >
          Start Order
        </motion.button>
      </div>
    </motion.div>
  );
}

export default MenuCard;