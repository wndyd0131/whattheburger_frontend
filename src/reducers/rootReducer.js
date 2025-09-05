import { cartReducer, initialCartState } from "./Cart/cartReducer";
import { initialOptionState, optionReducer } from "./Option/optionReducer";
import { initialOrderState, orderReducer } from "./Order/orderReducer";
import { initialOrderSessionState, orderSessionReducer } from "./OrderSession/orderSessionReducer";

export const initialState = {
  optionState: initialOptionState,
  cartState: initialCartState,
  orderSessionState: initialOrderSessionState,
  orderState: initialOrderState
};

export const rootReducer = (state=initialState, action) => {
  const cartState = cartReducer(state.cartState, action);
  const optionState = optionReducer(state.optionState, action, cartState);
  const orderSessionState = orderSessionReducer(state.orderSessionState, action);
  const orderState = orderReducer(state.orderState, action, cartState);
  return {
    optionState: optionState,
    cartState: cartState,
    orderSessionState: orderSessionState,
    orderState: orderState
  };
}