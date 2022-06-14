import {
  USER_LOGIN,
  ADD_DATA_TO_STATE,
  ADD_DISHES_TO_STATE,
  UPDATE_USER_CHOICE,
} from "../actions";

let initialState = {
  userLoggedin: {},
  users: {},
  dishes: {},
  dishesScores: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      return {
        ...state,
        user: action.user,
      };
    }

    case ADD_DISHES_TO_STATE: {
      return {
        ...state,
        dishes: action.dishes,
      };
    }
    case ADD_DATA_TO_STATE: {
      return {
        ...state,
        userLoggedin: action.loggedin || {},
        users: action.users || {},
        dishesScores: action.dishes || {},
      };
    }
    case UPDATE_USER_CHOICE: {
      let user = state.users.find((elem) => elem.id === state.userLoggedin.id);

      let filteredArray = state.users.filter(
        (elem) => elem.id === state.userLoggedin.id
      );
      return {
        ...state,
        users: [filteredArray, user],
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
