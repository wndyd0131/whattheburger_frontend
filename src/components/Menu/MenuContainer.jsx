import { useContext } from "react";
import MenuCard from "./MenuCard";
import { MenuContext } from "../../contexts/MenuContext";
import { motion } from "framer-motion";
import MenuCardSkeleton from "./MenuCardSkeleton";
const MenuContainer = () => {

  const {
    categories,
    selectedCategory,
    selectedCategoryId,
    isLoading
  } = useContext(MenuContext);

  // const currentCategory = categories.find(category => category.categoryId === selectedCategoryId);

  return (
      (!isLoading && selectedCategory && selectedCategory.products.length === 0)
      ? <div className="flex min-w-[1000px] max-w-[1200px] w-full justify-center items-center">
          <p className="text-3xl text-gray-500">
            There's no available products
          </p>
        </div>
      : <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 gap-8 mt-12 max-w-[1200px] w-full px-5
          min-w-[300px]
          justify-center
          md:grid-cols-2 md:px-10
          lg:grid-cols-2 lg:px-15
          xl:grid-cols-3 xl:px-20
        "
      >
        {isLoading
        ? Array.from({ length: 6}).map((_, idx) => <MenuCardSkeleton key={idx}/>)
        : selectedCategory?.products.map((product, productIdx) => {
            return (
            <motion.div
              className="flex justify-center items-start"
              key={productIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: productIdx * 0.1 }}
            >
              <MenuCard
                product={product}
                productIdx={productIdx}
                calories={product.calories}
              />
            </motion.div>
            )
          })
        }
      </motion.div>
  );
}

export default MenuContainer;