import { cartReducer, initialCartState } from "./Cart/cartReducerT";
import { initialOptionState, optionReducer } from "./Option/optionReducerT";
import { initialOrderState, orderReducer } from "./Order/orderReducerT";

export const initialState = {
  optionState: initialOptionState,
  cartState: initialCartState,
  orderState: initialOrderState
};

export const rootReducer = (state=initialState, action) => {
  const cartState = cartReducer(state.cartState, action);
  const optionState = optionReducer(state.optionState, action, cartState);
  const orderState = orderReducer(state.orderState, action, cartState);
  return {
    optionState: optionState,
    cartState: cartState,
    orderState: orderState
  };
}