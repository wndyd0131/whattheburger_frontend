import { ORDER_ACTIONS as ACTIONS } from "./actionsT";

export const initialOrderState = {};
export const orderReducer = (state=initialOrderState, action, cartState) => {
  switch(action.type) {
    case ACTIONS.TRANSFER_FROM_CART: {
      // recalculation
      // transfer
    }
    case ACTIONS.ADD_ORDER: {

    }
    default:
      return state;
  }
}