export const USER_LOGIN = "USER_LOGIN";
export const ADD_DATA_TO_STATE = "ADD_DATA_TO_STATE";
export const UPDATE_USER_CHOICE = "UPDATE_USER_CHOICE";
export const ADD_DISHES_TO_STATE = "ADD_DISHES_TO_STATE";
export function userLogin(user) {
  return {
    type: USER_LOGIN,
    user,
  };
}

export function addToState(loggedin, users, dishes) {
  console.log(loggedin, users, dishes);
  return {
    type: ADD_DATA_TO_STATE,
    loggedin,
    users,
    dishes,
  };
}

export function updateUser(user) {
  console.log(user);
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
