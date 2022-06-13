export const USER_LOGIN = "USER_LOGIN";
export const ADD_DATA_TO_STATE = "ADD_DATA_TO_STATE";
export const UPDATE_USER_CHOICE = "UPDATE_USER_CHOICE";
export function userLogin(user) {
  return {
    type: "USER_LOGIN",
    user,
  };
}

export function addToState(loggedin, users, posts) {
  return {
    type: ADD_DATA_TO_STATE,
    loggedin,
    users,
    posts,
  };
}

export function updateUser(postId, rank) {
  return {
    type: UPDATE_USER_CHOICE,
    rank,
    postId,
  };
}
