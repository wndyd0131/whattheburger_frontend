import { ACTIONS } from "./actions";

export const initialOrderState = {};
export const orderReducer = (state=initialOrderState, action, optionState) => {
  switch(action.type) {
    // case ACTIONS.HYDRATE: {
    //   const {
    //     data
    //   } = action.payload;
    // }
    default:
      return state;
  }
}