import { cartReducer, initialCartState } from "./Cart/cartReducer";
import { initialOptionState, optionReducer } from "./Option/optionReducer";
import { initialOrderState, orderReducer } from "./Order/orderReducer";

export const initialState = {
  optionState: initialOptionState,
  cartState: initialCartState,
  orderState: initialOrderState
};

export const rootReducer = (state=initialState, action) => {
  const cartState = cartReducer(state.cartState, action);
  const optionState = optionReducer(state.optionState, action, cartState);
  const orderState = orderReducer(state.orderState, action, optionState);
  return {
    optionState: optionState,
    cartState: cartState,
    orderState: orderState
  };
}