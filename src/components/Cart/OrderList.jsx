import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { LayoutContext } from "../../contexts/LayoutContext";
import { CloseButton } from "../../svg/Utils";
import api from "../../utils/api";
import { CART_ACTIONS } from "../../reducers/Cart/actions";
import { toast } from "react-toastify";
import { OPTION_ACTIONS } from "../../reducers/Option/actions";
import OrderModal from "../Menu/OrderModal/OrderModal";
import { CartContext } from "./contexts/CartContext";
import { fromCartResponseToOptionDto } from "../../utils/dtoMapper";

const OrderList = () => {

  const { 
    reducer: {
      rootState,
      dispatchRoot
    }
  } = useContext(LayoutContext);

  const {
    selectedProduct,
    setSelectedProduct,
    selectedCartIdx,
    setSelectedCartIdx
  } = useContext(CartContext);
  

  const cartState = rootState.cartState;

  const [closeButtonHovered, setCloseButtonHovered] = useState(false);

  const handleClickModifyButton = (productId, cartIdx) => {
    api.get(`/cart/${cartIdx}`)
      .then(response => {
        const data = response.data
        console.log("CART_RESPONSE", data);
        dispatchRoot({
          type: CART_ACTIONS.LOAD_PRODUCT, // load everything to single cart
          payload: {
            cartIdx: cartIdx,
            cartData: data
          }
        });
        dispatchRoot({
          type: OPTION_ACTIONS.LOAD_FROM_CART, // load from cart
          payload: {
            cartIdx: cartIdx,
            cartData: data
          }
        });
        dispatchRoot({
          type: OPTION_ACTIONS.SET_DEFAULT_FROM_CART,
          payload: {
            cartIdx: cartIdx,
            cartData: data
          }
        })
        setSelectedProduct({
          productId: data.productId,
          productName: data.productName,
          productPrice: data.basePrice,
          imageSource: data.imageSource,
          briefInfo: data.briefInfo
        });
        setSelectedCartIdx(cartIdx);
      })
      .catch(err => console.error(err));
    // api.get(`/products/${productId}`)
    //   .then(response => {
    //     console.log("PRODUCT_RESPONSE", response.data);
    //     const optionResponse = response.data.optionResponses;
    //     dispatchRoot({
    //       type: OPTION_ACTIONS.LOAD_OPTIONS,
    //       payload: {
    //         optionResponse: optionResponse
    //       }
    //     });

    //     setSelectedProduct(response.data);
    //     setSelectedCartIdx(cartIdx);
    //   })
    //   .catch(err => console.error(err));
  }
  const handleClickMinusButton = () => {

  }
  const handleClickPlusButton = () => {

  }
  const handleClickCloseButton = (cartIdx) => {
    api.delete(`/cart/${cartIdx}`)
      .then(response => {
        console.log("RESPONSE", response);
        const cartData = response.data;
        dispatchRoot({
          type: CART_ACTIONS.LOAD_ALL_PRODUCTS,
          payload: {
            cartData: cartData
          }
        });
        toast.success('Successfully deleted from cart');
      })
      .catch(
        err => {
          toast.error('Failed to delete from cart');
          console.error(err);
        }
      );
  }

  return (
    <div className="flex flex-col basis-10/12 overflow-auto">
      {cartState.cartList.map((cart, cartIdx) => {
        console.log("CART", cart);
        const cartQuantity = cart.product.quantity;
        const cartPrice = cart.product.productTotalPrice * cartQuantity;
        const productId = cart.product.productId;
        return (
          <div key={cartIdx} className="flex h-full w-full outline-1 outline-gray-200"> 
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
              <div className="flex flex-col">
                {cart.product.customRules.map((customRule, customRuleIdx) => {
                  const optionString = customRule.productOptions
                    .filter(option => option.isSelected)
                    .map(option => {
                      let measureString = "";
                      if (option.measureType) {
                        switch (option.measureType) {
                          case "SIZE": {
                            switch (option.optionQuantity) {
                              case 0:
                                measureString = "Kids";
                              case 1:
                                measureString = "Small";
                              case 2:
                                measureString = "Medium";
                              case 3:
                                measureString = "Large";
                            }
                          }
                          case "DEGREE": {
                            switch (option.optionQuantity) {
                              case 0:
                                measureString = "Easy";
                              case 1:
                                measureString = "Regular";
                              case 2:
                                measureString = "Extra";
                            }
                          }
                        }
                      }

                      const optionCountString = option.countType === "COUNTABLE" ? 'x' + option.optionQuantity : measureString;
                      const optionTraitString = option.productOptionTraits
                        .filter(trait => trait.optionTraitType === "BINARY" && trait.currentValue === 1)
                        .map(trait => '(' + trait.labelCode + ')')
                        .join('');
                      return option.optionName + ' ' + '(' + optionCountString + ')' + (optionTraitString.length > 0 ? ' ' + optionTraitString : '');
                    }
                  ).join(', ');
                  return (
                    <span key={customRuleIdx} className="flex flex-col">
                    <strong>{customRule.customRuleName}: </strong>
                    <span className="text-gray-500 text-sm italic">{optionString.length < 1 ? "N/A" : optionString}</span>
                    </span>
                  );
                }

                )}
              </div>
            </div>
            <div className="flex flex-col relative w-full">
              <div className="flex relative basis-1/5">
                <button
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={() => handleClickCloseButton(cartIdx)}
                  onMouseEnter={() => setCloseButtonHovered(true)}
                  onMouseLeave={() => setCloseButtonHovered(false)}
                >
                  <CloseButton color={closeButtonHovered ? "#FE7800" : "#000000"}/>
                </button>
              </div>
              <div className="flex basis-3/5 justify-end items-center mr-5">
                <button
                  className="flex w-[100px] h-[40px] bg-white border-1 border-[#FE7800] rounded-full justify-center items-center font-bold cursor-pointer hover:bg-[#FE7800] hover:text-white duration-200"
                  onClick={() => handleClickModifyButton(productId, cartIdx)}
                >
                  Modify
                </button>
              </div>
              <div className="flex basis-1/5 justify-end items-end">
                <div className="flex flex-col justify-center items-center">
                <h2>${cartPrice}</h2>
                <div className="flex justify-between items-center border-1 border-gray-200 shadow-xs rounded-md overflow-hidden h-[35px] w-[160px] m-2">
                  <button
                    className={`flex justify-center items-center bg-gray-100 h-full w-[50px] cursor-pointer`}
                    onClick={() => handleClickMinusButton(cart)}
                  >
                    <strong>-</strong>
                  </button>
                    <h3 className="flex justify-center cursor-default">
                      {cartQuantity}
                    </h3>
                  <button
                    className={`flex justify-center items-center bg-gray-100 h-full w-[50px] cursor-pointer`}
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