import { cartReducer, initialCartState } from "./Cart/cartReducer";
import { initialOptionState, optionReducer } from "./Option/optionReducer";
import { initialOrderState, orderReducer } from "./Order/orderReducer";
import { initialOrderSessionState, orderSessionReducer } from "./OrderSession/orderSessionReducer";
import { initialUserState, userReducer } from "./User/userReducer";

export const initialState = {
  userState: initialUserState,
  optionState: initialOptionState,
  cartState: initialCartState,
  orderSessionState: initialOrderSessionState,
  orderState: initialOrderState
};

export const rootReducer = (state=initialState, action) => {
  const userState = userReducer(state.userState, action);
  const cartState = cartReducer(state.cartState, action);
  const optionState = optionReducer(state.optionState, action, cartState);
  const orderSessionState = orderSessionReducer(state.orderSessionState, action);
  const orderState = orderReducer(state.orderState, action, cartState);
  return {
    userState: userState,
    optionState: optionState,
    cartState: cartState,
    orderSessionState: orderSessionState,
    orderState: orderState
  };
}