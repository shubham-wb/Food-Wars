import {
  USER_LOGIN,
  ADD_DATA_TO_STATE,
  ADD_DISHES_TO_STATE,
  UPDATE_USER_CHOICE,
  DELETE_DISH,
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
      let updated_users = state.users.filter(
        (user) => user.id !== action.user.id
      );

      return {
        ...state,
        user: action.user,
        userLoggedin: [...updated_users, action.user],
      };
    }

    case DELETE_DISH: {
      let { users, userLoggedin } = state;
      console.log(userLoggedin, "user_reducer");
      let filteredUsers = users.filter((elem) => elem.id !== userLoggedin.id);
      console.log(filteredUsers, "delete dish");
      return {
        userLoggedin: action.user,
        users: [...filteredUsers, action.user],
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
