import { useContext } from "react";
import MenuCard from "./MenuCard";
import { MenuContext } from "../../contexts/MenuContext";
import { motion } from "framer-motion";

const MenuContainer = () => {

  const {
    products,
  } = useContext(MenuContext);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex basis-8/12 items-center flex-col w-full px-20"
    >
      <div className="grid gap-8 mt-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {products.map((product, productIdx) => 
            <motion.div
              key={productIdx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: productIdx * 0.1 }}
            >
              <MenuCard
                product={product}
                productIdx={productIdx}
                calories={product.calories}
                imgSrc="/src/assets/private/menu/whattheburger.png"
              />
            </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default MenuContainer;