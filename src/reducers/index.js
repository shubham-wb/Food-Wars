import { USER_LOGIN } from "../actions";
let initialState = {
  userLoggedin: {},
  users: {},
  dishes: {},
  dishesScore: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        user: action.user,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
