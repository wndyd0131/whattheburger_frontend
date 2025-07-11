import { useContext, useState } from "react";
import axios from "axios";
import { MenuContext } from "../../contexts/MenuContext";
import { Link, useLocation } from "react-router-dom";
import { fetchProductsByCategoryId } from "../../api/product";

const CategoryNav = () => {

  const {
    categoryList,
    setProducts,
    setSelectedCategory
  } = useContext(MenuContext);

  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleClickCategoryButton = (categoryId) => {
    fetchProductsByCategoryId(categoryId)
      .then(data => {
        setProducts(data);
        const element = document.getElementById("category-section");
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start'});
        }
        setSelectedCategory(categoryId);
      })
      .catch(error => console.error("Error: ", error));
  }

  return (
    <ul className="flex basis-2/12 items-center h-screen flex-col sticky top-[60px] z-30">
      {categoryList.map((category) => 
          <li className="flex max-w-[50px] relative cursor-pointer"
            key={category.id}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <a onClick={() => handleClickCategoryButton(category.id)}>
              {category.icon}
            </a>
            <div className={`${hoveredCategory === category.id ? "absolute flex text-[22px] justify-center items-center whitespace-nowrap w-auto h-[80px] rounded-[60px] shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)] z-[-1] pl-[100px] pr-[20px] bg-white text-[#FE7800] font-['Whatthefont'] translate-x-[-20px] translate-y-[5px]" : "hidden"}`}>
              {category.name}
            </div>
          </li>
        )}
    </ul>
  );
}

export default CategoryNav;