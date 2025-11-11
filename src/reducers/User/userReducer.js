import { USER_ACTIONS as ACTIONS } from "./action";

export const initialUserState = {
  userId: null,
  firstName: null,
  lastName: null,
  phoneNum: null,
  zipcode: null,
  isAuthenticated: false,
  role: null
}

export const userReducer = (state=initialUserState, action) => {
  switch(action.type) {
    case ACTIONS.LOAD_USER: {
      const {
        userData
      } = action.payload;
      return {
        ...state,
        userId: userData.userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNum: userData.phoneNum,
        zipcode: userData.zipcode,
        isAuthenticated: true,
        role: userData.role
      }
    }
    default:
      return state;
  }
}