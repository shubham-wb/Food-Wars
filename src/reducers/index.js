import {
  USER_LOGIN,
  ADD_DATA_TO_STATE,
  ADD_DISHES_TO_STATE,
  UPDATE_USER_CHOICE,
  UPDATE_DISH_SCORE,
} from "../actions";
const _ = require("lodash");
var CryptoJS = require("crypto-js");
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
        userLoggedin: action.user,
      };
    }

    case ADD_DISHES_TO_STATE: {
      return {
        ...state,
        dishes: action.dishes,
      };
    }
    case ADD_DATA_TO_STATE: {
      var updatedScore;
      if (action.dishes) {
        updatedScore = action.dishes;
      } else {
        updatedScore = [];
      }
      return {
        ...state,
        userLoggedin: action.loggedin || {},
        users: action.users || {},
        dishesScores: updatedScore,
      };
    }
    case UPDATE_USER_CHOICE: {
      var new_users = _.cloneDeep(state.users);
      // let new_users = JSON.stringify(JSON.parse(state.users));
      let updated_users = new_users.filter(
        (user) => user.id !== action.user.id
      );
      return {
        ...state,
        userLoggedin: { ...action.user },
        users: [...updated_users, action.user],
      };
    }

    case UPDATE_DISH_SCORE: {
      let old_value = action.oldValue;
      let new_value = action.newValue;

      var filteredDishes = JSON.parse(JSON.stringify(state.dishesScores));
      if (old_value) {
        filteredDishes[old_value.id].score += old_value.score;
      } else if (new_value) {
        filteredDishes[new_value.id - 1].score += new_value.score;
      }
      // var ciphertext = CryptoJS.AES.encrypt(
      //   JSON.stringify(filteredDishes),
      //   "ohmyfood"
      // ).toString();
      // localStorage.setItem("dishes", ciphertext);

      return {
        ...state,
        dishesScores: [...filteredDishes],
      };
    }

    default: {
      return state;
    }
  }
};

export default reducer;
