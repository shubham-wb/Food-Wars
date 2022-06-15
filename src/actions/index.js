export const USER_LOGIN = "USER_LOGIN";
export const ADD_DATA_TO_STATE = "ADD_DATA_TO_STATE";
export const UPDATE_USER_CHOICE = "UPDATE_USER_CHOICE";
export const ADD_DISHES_TO_STATE = "ADD_DISHES_TO_STATE";
export const DELETE_DISH = "DELETE_DISH";
export const UPDATE_DISH_SCORE = "UPDATE_DISH_SCORE";
export function userLogin(user) {
  return {
    type: USER_LOGIN,
    user,
  };
}

export function addToState(loggedin, users, dishes) {
  return {
    type: ADD_DATA_TO_STATE,
    loggedin,
    users,
    dishes,
  };
}

export function updateUser(user) {
  console.log(user, "action");
  return {
    type: UPDATE_USER_CHOICE,
    user,
  };
}

export function addDishesToState(dishes) {
  return {
    type: ADD_DISHES_TO_STATE,
    dishes,
  };
}

export function updateDishScore(oldValue, newValue) {
  return {
    type: UPDATE_DISH_SCORE,
    oldValue,
    newValue,
  };
}
