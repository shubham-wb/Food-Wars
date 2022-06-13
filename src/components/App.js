import React, { useEffect } from "react";
import "../assets/css/App.css"; //css
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Home";
import ScoreBoard from "./ScoreBoard";
import DashBoard from "./DashBoard";
import Page404 from "./Page404";
import { addToState } from "../actions";
import { PrivateRoute, RestrictedRoute } from "./authenticatedRoute";
var CryptoJS = require("crypto-js");

function App(props) {
  //add from localstorage to redux state
  useEffect(() => {
    //get details of user loggedin
    let user = localStorage.getItem("user");
    if (user != null) {
      var bytes = CryptoJS.AES.decrypt(user, "ohmyfood"); //decrypt userdetails
      var userDetails = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    //get the rannkings of users
    let users = localStorage.getItem("users");
    if (users != null) {
      var users_bytes = CryptoJS.AES.decrypt(users, "ohmyfood"); //decrypt userdetails
      var usersChoices = JSON.parse(users_bytes.toString(CryptoJS.enc.Utf8));
    }
    //get the scores of dishes
    let dishes = localStorage.getItem("dishes");
    if (dishes != null) {
      var dishes_bytes = CryptoJS.AES.decrypt(user, "ohmyfood"); //decrypt userdetails
      var dishScores = JSON.parse(dishes_bytes.toString(CryptoJS.enc.Utf8));
    }

    props.addToState(userDetails, usersChoices, dishScores);
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <RestrictedRoute>
                <Home />
              </RestrictedRoute>
            }
          ></Route>
          <Route
            exact
            path='dashboard/food-wars'
            element={
              <PrivateRoute>
                <DashBoard />
              </PrivateRoute>
            }
          ></Route>
          <Route exact path='/scoreboard' element={<ScoreBoard />}></Route>
          <Route path='*' element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userLoggedin } = state;
  return userLoggedin;
};
export default connect(mapStateToProps, { addToState })(App);
