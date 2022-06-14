import users from "./db_users";
import { dishes } from "./db_dishes";
export function getUser(username, password) {
  let user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    return user;
  } else {
    return false;
  }
}

export function getDishes() {
  if (dishes) {
    return dishes;
  } else {
    return false;
  }
}
export function getUsers() {
  if (users) {
    return users;
  } else {
    return false;
  }
}
