import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../../contexts/LayoutContext";
import Cookie from "js-cookie";
const FeaturedCategory = () => {

  const {
    selectedCategory,
    setSelectedCategory
  } = useContext(LayoutContext);

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
    {categoryId: 4, name: "All-Time Favorites", imgSrc: "/private/category/buffalo_ranch.png"},
    {categoryId: 1, name: "Burgers", imgSrc: "/private/category/whattheburger.png"},
    {categoryId: 2, name: "Chicken", imgSrc: "/private/category/chicken_strips.png"},
    {categoryId: 6, name: "Sides", imgSrc: "/private/category/french_fries.png"},
    {categoryId: 9, name: "Drinks", imgSrc: "/private/category/soft_drink.png"}
  ];

  return (
    <div className="flex justify-around px-[80px] py-[50px] h-full w-full">
      {featuredCategory.map((category, categoryIdx) => {
        const categoryId = category.categoryId;
        return (
          // <Link key={categoryIdx} to="/menu#category-section" replace={true}>
            <motion.div
              key={categoryIdx}
              onClick={() => handleClickFeaturedCategory(categoryId)}
              whileHover={{scale: 1.1}}
              whileTap={{scale: 0.9}}
              className="flex flex-col font-[sans-serif] h-[300px] w-[250px] max-w-xs bg-white border-1 border-gray-100 shadow-md rounded-2xl overflow-hidden cursor-pointer">
              <img className="w-full h-auto object-cover" src={category.imgSrc} alt="Food" />
              <div className="p-2">
                <p className="text-lg justify-self-center font-semibold mb-2">{category.name}</p>
              </div>
            </motion.div>
        );
      })}
    </div>
  );
}

export default FeaturedCategory;