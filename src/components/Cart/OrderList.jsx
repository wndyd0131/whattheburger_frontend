import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { LayoutContext } from "../../contexts/LayoutContext";
import { CloseButton } from "../../svg/Utils";

const OrderList = () => {

  const { 
    reducer,
    dispatchRoot
  } = useContext(LayoutContext);

  const cartState = reducer.rootState.cartState;
  console.log("CART_STATE", cartState);

  const handleClickModifyButton = (cartIdx) => {
  }
  const handleClickMinusButton = () => {

  }
  const handleClickPlusButton = () => {

  }
  return (
    <div className="flex flex-col basis-10/12">
      {cartState.cartList.map((cart, idx) => {
        const cartQuantity = cart.quantity;
        const cartPrice = cart.product.productPrice * cartQuantity;
        return (
          <div className="flex min-h-50 max-h-100 w-full border-1">
            <div className="flex justify-center items-center min-w-[200px]">
              <img className="w-[200px] h-[200px]" src="src\assets\private\menu\Whattheburger31.png">
              
              </img>
            </div>
            <div className="flex flex-col p-2 h-full w-full">
              <div className="flex items-center gap-3 font-['Whatthefont']">
                <h3 className="text-[#FE7800]">{cart.product.productName}</h3>
                <div className="flex justify-center items-center p-3 max-w-[100px] h-[20px] rounded-[20px] text-[18px] text-white bg-[#FE7800]">
                  only
                </div>
              </div>
              <div className="flex flex-col overflow-auto">
                {cart.customRules.map((customRule, customRuleIdx) => {
                  const optionString = customRule.productOptions
                    .filter(productOption => productOption.isSelected)
                    .map((productOption => productOption.optionName)
                  ).join(', ');
                  return (
                    <span>
                    <strong>{customRule.customRuleName}: </strong>
                    <br></br>
                    <span className="text-gray-500 text-sm italic">{optionString.length < 1 ? "N/A" : optionString}</span>
                    </span>
                  );
                }

                )}
                {/* <p><strong>Beef:</strong> Large Beef</p>
                <p><strong>Cheese:</strong> N/A</p>
                <p><strong>Add-on:</strong> Bacon (3), Avocado(2), Grilled onion and pepper</p>
                <p><strong>Topping:</strong> Tomato, Pickle, Onion</p>
                <p><strong>Sauce:</strong> Mustard (Easy), Mayo (Extra)</p> */}
              </div>
            </div>
            <div className="flex flex-col relative w-full">
              <div className="flex relative basis-1/5">
                <button className="absolute right-2 top-2">
                  <CloseButton/>
                </button>
              </div>
              <div className="flex basis-3/5 justify-end items-center mr-5">
                <button
                  className="flex w-[100px] h-[40px] bg-white border-1 border-[#FE7800] rounded-full justify-center items-center font-bold cursor-pointer hover:bg-[#FE7800] hover:text-white duration-200"
                  onClick={() => handleClickModifyButton(cart)}
                >
                  Modify
                </button>
              </div>
              <div className="flex basis-1/5 justify-end items-end">
                <div className="flex flex-col justify-center items-center">
                <h2>${cartPrice}</h2>
                <div className="flex justify-between items-center w-[160px] m-2">
                  <button
                    className={`flex justify-center border-1 border-[#FE7800] rounded-[5px] h-[30px] w-[50px] text-[#FE7800] cursor-pointer`}
                    onClick={() => handleClickMinusButton(cart)}
                  >
                    <strong>-</strong>
                  </button>
                    <h3>
                      {cartQuantity}
                    </h3>
                  <button
                    className={`flex justify-center border-1 border-[#FE7800] rounded-[5px] h-[30px] w-[50px] text-[#FE7800] cursor-pointer`}
                    onClick={() => handleClickPlusButton(cart)}
                  >
                    <strong>+</strong>
                  </button>
                </div>
                </div>
              </div>
              </div>
          </div>
        );
      })}
      
    </div>
  )
}

export default OrderList