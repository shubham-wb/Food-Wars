import React from "react";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { removeDishFromUser } from "../actions";
import "../assets/css/MyRankings.css"; //css file
import gold from "../assets/images/gold.png";
import silver from "../assets/images/silver.png";
import bronze from "../assets/images/bronze.png";
var CryptoJS = require("crypto-js");
//function to display rankings given by logged in user
function MyRankings(props) {
  const { userLoggedin, users } = props;

  function handleDeleteFromList(id) {
    if (userLoggedin) {
      let updatedDishes = userLoggedin.dishes.filter((elem) => elem.id !== id);
      userLoggedin.dishes = updatedDishes;
      let updated_user = userLoggedin;
      console.log(updated_user, "updated_user");
      if (users) {
        let filteredUsers = users.filter((elem) => elem.id !== userLoggedin.id);
        let updatedUsers = [...filteredUsers, updated_user]; //add to list of users
        var ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(updatedUsers),
          "ohmyfood"
        ).toString();
        localStorage.setItem("users", ciphertext); //save to localstorage after deciphering if another user logs in ..  state is still saved in storage
      }

      var ciphertext_user = CryptoJS.AES.encrypt(
        JSON.stringify(updated_user),
        "ohmyfood"
      ).toString();
      localStorage.setItem("user", ciphertext_user); //save to the user info in localstorage
      props.removeDishFromUser(updated_user); //update to redux store
      //add to the local storage
    }
  }

  return (
    <div className='user-rankings'>
      <div className='user-ranking-wrapper'>My Selection</div>

      <div className='rank-list'>
        <div className='rank-medals'>
          <img src={gold} alt='gold'></img>
          <img src={silver} alt='silver'></img>
          <img src={bronze} alt='bronze'></img>
        </div>
        <div style={{ height: "100%", width: "70%" }}>
          {userLoggedin.dishes
            ? userLoggedin.dishes
                .sort((a, b) => a.id - b.id)
                .map((dish, index) => (
                  <div className='rank-element' key={`mydish-${index}`}>
                    {dish.dishName}
                    {dish.rank}
                  </div>
                ))
            : null}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { userLoggedin, users } = state;
  return {
    userLoggedin,
    users,
  };
};
export default connect(mapStateToProps, { removeDishFromUser })(MyRankings);
