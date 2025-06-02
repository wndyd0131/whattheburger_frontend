import { useContext } from "react";
import MenuBox from "./MenuBox";
import { MenuContext } from "../../contexts/MenuContext";

const MenuContainer = () => {

  const {
    products,
  } = useContext(MenuContext);

  return (
    <div className="flex flex-col w-[1000px]">
      <div className="grid gap-y-[50px] mt-[50px] xl:grid-cols-2">
        {products.map((product, productIdx) => 
            <MenuBox
              key={productIdx}
              product={product}
              productIdx = {productIdx}
              calories={700}
              imgSrc="/src/assets/private/menu/whattheburger.png"
            />
        )}
      </div>
    </div>
  );
}

export default MenuContainer;