import { useContext, useState } from "react";
import axios from "axios";
import { MenuContext } from "../../contexts/MenuContext";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchProductsByCategoryId } from "../../api/product";
import CategoryIcon from "./CategoryIcon";
import { LayoutContext } from "../../contexts/LayoutContext";

const CategoryNav = () => {

  const {
    selectedCategoryId,
    categories,
  } = useContext(MenuContext);

  const {
    selectedStoreId
  } = useState(LayoutContext);

  const nav = useNavigate();

  const { storeId } = useParams();

  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleClickCategoryButton = (categoryId) => {
    if (!storeId) return;
    nav(`/menu/${storeId}?categoryId=${categoryId}`, {replace: true});
  }

  return (
    <ul className="flex basis-2/12 items-center h-screen flex-col sticky top-[60px] z-30">
      {categories.map((category, categoryIdx) => 
          <li className="flex max-w-[50px] relative cursor-pointer"
            key={category.categoryId}
            onClick={() => handleClickCategoryButton(category.categoryId)}
            onMouseEnter={() => setHoveredCategory(category.categoryId)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <span>
              <CategoryIcon category={category} categoryIdx={categoryIdx}/>
            </span>
            <div className={`${hoveredCategory === category.categoryId ? "absolute flex text-[22px] justify-center items-center whitespace-nowrap w-auto h-[80px] rounded-[60px] shadow-[2px_2px_15px_2px_rgba(0,0,0,0.2)] z-[-1] pl-[100px] pr-[20px] bg-white text-[#FE7800] font-['Whatthefont'] translate-x-[-20px] translate-y-[5px]" : "hidden"}`}>
              {category.categoryName}
            </div>
          </li>
        )}
    </ul>
  );
}

export default CategoryNav;