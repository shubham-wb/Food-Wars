import { USER_LOGIN, ADD_DATA_TO_STATE } from "../actions";

let initialState = {
  userLoggedin: {},
  users: {},
  dishes: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        user: action.user,
      };
    }
    case ADD_DATA_TO_STATE: {
      return {
        ...state,
        userLoggedin: action.loggedin || {},
        users: action.users || {},
        dishes: action.dishes || {},
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
