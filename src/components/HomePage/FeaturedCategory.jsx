import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const FeaturedCategory = () => {

  const nav = useNavigate();

  const handleClickFeaturedCategory = (categoryId) => {
    const storeId = Cookie.get("storeId");
    if (storeId) {
      nav(`/menu/${storeId}?categoryId=${categoryId}#category-section`, {state: {categoryId}});
    } else {
      nav("/menu");
    }
  }

  const featuredCategory = [
    {categoryId: 4, name: "All-Time Favorites", imgSrc: "/images/featuredCategories/buffalo_ranch.png"},
    {categoryId: 1, name: "Burgers", imgSrc: "/images/featuredCategories/whattheburger.png"},
    {categoryId: 2, name: "Chicken", imgSrc: "/images/featuredCategories/chicken_strips.png"},
    {categoryId: 6, name: "Sides", imgSrc: "/images/featuredCategories/french_fries.png"},
    {categoryId: 9, name: "Drinks", imgSrc: "/images/featuredCategories/soft_drink.png"}
  ];

  return (
    <div className="
      grid grid-cols-5 text-[#FE7800] justify-around px-[80px] py-[50px] gap-5 h-full w-full
      max-xl:grid-cols-3
      max-lg:grid-cols-2
      max-sm:grid-cols-1
    ">
      {featuredCategory.map((category, categoryIdx) => {
        const categoryId = category.categoryId;
        return (
          // <Link key={categoryIdx} to="/menu#category-section" replace={true}>
            <motion.div
              key={categoryIdx}
              onClick={() => handleClickFeaturedCategory(categoryId)}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.9}}
              className="
                flex flex-col font-['Whatthefont'] h-[300px] w-[250px] max-w-xs bg-white border-1 border-gray-100 shadow-md rounded-2xl overflow-hidden cursor-pointer hover:bg-gradient-to-b hover:text-white from-amber-500 to-orange-500
              ">
              <div className="flex justify-center items-center overflow-hidden h-full">
                <img className="" src={category.imgSrc} alt="Food" />
              </div>
              <div className="p-2">
                <p className="text-xl justify-self-center font-semibold mb-2">{category.name}</p>
              </div>
            </motion.div>
        );
      })}
    </div>
  );
}

export default FeaturedCategory;