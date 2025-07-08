import { motion } from "motion/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LayoutContext } from "../../contexts/LayoutContext";
const FeaturedCategory = () => {

  const {
    selectedCategory,
    setSelectedCategory
  } = useContext(LayoutContext);

  const featuredProduct = [
    {productId: 4, name: "All-Time Favorites", imgSrc: "/private/category/all_time_favorites.png"},
    {productId: 1, name: "Burgers", imgSrc: "/private/category/burgers.png"},
    {productId: 2, name: "Chicken", imgSrc: "/private/category/chicken.png"},
    {productId: 6, name: "Sides", imgSrc: "/private/category/sides.png"},
    {productId: 9, name: "Drinks", imgSrc: "/private/category/drinks.png"},
    {productId: 10, name: "Group Order", imgSrc: "/private/category/group_order.png"}
  ]
  const featuredCategory = [
    {categoryId: 4, name: "All-Time Favorites", imgSrc: "/private/category/all_time_favorites.png"},
    {categoryId: 1, name: "Burgers", imgSrc: "/private/category/burgers.png"},
    {categoryId: 2, name: "Chicken", imgSrc: "/private/category/chicken.png"},
    {categoryId: 6, name: "Sides", imgSrc: "/private/category/sides.png"},
    {categoryId: 9, name: "Drinks", imgSrc: "/private/category/drinks.png"},
    {categoryId: 10, name: "Group Order", imgSrc: "/private/category/group_order.png"}
  ];

  return (
    <div className="flex justify-around px-[80px] pt-[50px] pb-[50px] h-full w-full">
      {featuredCategory.map((category, categoryIdx) => {
        const categoryId = category.categoryId;
        return (
          <Link key={categoryIdx} to="/menu#category-section">
            <motion.div
              onClick={() => setSelectedCategory(categoryId)}
              whileHover={{scale: 1.1}}
              whileTap={{scale: 0.9}}
              className="flex flex-col h-[300px] w-[250px] max-w-xs bg-white border-1 border-gray-100 shadow-md rounded-2xl overflow-hidden cursor-pointer">
              <img className="w-full h-auto object-cover" src={category.imgSrc} alt="Food" />
              <div className="p-4">
                <p className="text-lg justify-self-center font-semibold mb-2">{category.name}</p>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}

export default FeaturedCategory;