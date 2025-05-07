import { useContext } from "react";
import MenuBox from "./MenuBox";
import { MenuContext } from "../../contexts/MenuContext";

const MenuContainer = () => {

  const {
    categoryList,
    products,
    selectedCategory
  } = useContext(MenuContext);

  return (
    <div className="flex flex-col w-[1000px]">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[#FE7800] font-['Whatafont']">MENU</h1>
        <h2>{categoryList[selectedCategory - 1].name}</h2>
      </div>
      <div className="grid grid-cols-2 gap-y-[50px] mt-[50px]">
        {products.map((product, productIdx) => 
            <MenuBox
              key={productIdx}
              product={product}
              productIdx = {productIdx}
              calories={700}
              imgSrc="/src/assets/private/menu/Whataburger31.png"
            />
        )}
      </div>
    </div>
  );
}

export default MenuContainer;