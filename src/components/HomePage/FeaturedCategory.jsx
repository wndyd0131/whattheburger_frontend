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
      grid grid-cols-2 text-[#FE7800] justify-around px-[80px] py-[50px] h-full w-full
      xl:grid-cols-5
      md:grid-cols-3
      gap-y-5
      min-w-[400px]
      gap-x-5
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
                flex flex-col justify-center items-center font-['Whatthefont'] aspect-[4/5] bg-white border border-gray-100 shadow-md rounded-2xl overflow-hidden cursor-pointer hover:bg-gradient-to-b hover:text-white from-amber-500 to-orange-500
                flex-1
              ">
              <div className="flex justify-center items-center overflow-hidden aspect-[4/5]">
                <img src={category.imgSrc} alt="Food" />
              </div>
              <div className="p-2">
                <p className="text-lg line-clamp-1 text-center font-semibold mb-2
                  sm:text-xl
                  lg:text-2xl
                ">{category.name}</p>
              </div>
            </motion.div>
        );
      })}
    </div>
  );
}

export default FeaturedCategory;