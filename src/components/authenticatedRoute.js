import { Navigate } from "react-router-dom";
import { getUser } from "../utils";
var CryptoJS = require("crypto-js");
export const RestrictedRoute = (props) => {
  let user = localStorage.getItem("user");
  if (user != null) {
    var bytes = CryptoJS.AES.decrypt(user, "ohmyfood"); //decrypt userdetails
    var userDetails = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    if (getUser(userDetails.username, userDetails.password)) {
      //check for user in database
      return <Navigate to='/dashboard/food-wars'></Navigate>;
    } else {
      return props.children;
    }
  } else {
    return props.children;
  }
};

export const PrivateRoute = (props) => {
  let user = localStorage.getItem("user");
  if (user !== null) {
    var bytes = CryptoJS.AES.decrypt(user, "ohmyfood");
    var userDetails = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); //decrypt userdetails
    if (getUser(userDetails.username, userDetails.password)) {
      //check for user in database
      return props.children;
    } else {
      return <Navigate to='/'></Navigate>;
    }
  } else {
    return <Navigate to='/'></Navigate>;
  }
};
