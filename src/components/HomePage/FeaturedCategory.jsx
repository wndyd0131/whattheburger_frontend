import { motion } from "motion/react";
const FeaturedCategory = () => {

  const featuredCategory = [
    {categoryId: 1, name: "All-Time Favorites", imgSrc: "/private/category/all_time_favorites.png"},
    {categoryId: 2, name: "Burgers", imgSrc: "/private/category/burgers.png"},
    {categoryId: 3, name: "Chicken", imgSrc: "/private/category/chicken.png"},
    {categoryId: 4, name: "Sides", imgSrc: "/private/category/sides.png"},
    {categoryId: 5, name: "Drinks", imgSrc: "/private/category/drinks.png"},
    {categoryId: 6, name: "Group Order", imgSrc: "/private/category/group_order.png"}
  ];

  return (
    <div className="flex justify-around px-[80px] pt-[70px] h-full w-full">
      {featuredCategory.map((category, idx) => {
        return (
          <motion.div
            key={idx}
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            className="flex flex-col h-[300px] w-[250px] max-w-xs bg-white shadow-md rounded-2xl overflow-hidden cursor-pointer">
            <img className="w-full h-auto object-cover" src={category.imgSrc} alt="Food" />
            <div className="p-4">
              <p className="text-lg justify-self-center font-semibold mb-2">{category.name}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default FeaturedCategory;