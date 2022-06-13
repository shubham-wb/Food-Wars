import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./Home";
import ScoreBoard from "./ScoreBoard";
import DashBoard from "./DashBoard";
import Page404 from "./Page404";
import { PrivateRoute, RestrictedRoute } from "./authenticatedRoute";
function App(props) {
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
export default connect(mapStateToProps)(App);
