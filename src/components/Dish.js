import React, { useState } from "react";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import "../assets/css/Dish.css";
import { updateUser, updateDishScore } from "../actions";
import gold from "../assets/images/gold.png";
import silver from "../assets/images/silver.png";
import bronze from "../assets/images/bronze.png";

var CryptoJS = require("crypto-js");

function Dish(props) {
  let { userLoggedin, users } = props;
  const { dish } = props;

  function handleGiveRank(data) {
    console.log(data, "data");
    console.log(userLoggedin, "user_logged_in");
    //if user has not selected any dishes
    if (!userLoggedin.dishes) {
      userLoggedin.dishes = [];
      userLoggedin.dishes[data.rank] = data.id;
      console.log(users, userLoggedin, "if user has not selected any dishes");

      props.updateDishScore(null, { id: data.id, rank: data.rank * 10 }); //update overall scores of dishes
    }
    //if user has dishes
    else {
      let old_value = userLoggedin.dishes[data.rank];
      //if user unselected the dish
      if (old_value === data.id) {
        console.log(userLoggedin.dishes, "dekh ");
        userLoggedin.dishes.splice(data.rank);
        console.log(users, userLoggedin, " //if user unselected the dish");
        props.updateDishScore({ id: old_value, score: data.rank * -10 }, null); //update overall scores of dishes
      }
      //if dish on rank exists and user updates it
      else {
        userLoggedin.dishes[data.rank] = data.id;
        console.log(
          users,
          userLoggedin,
          "if dish on rank exists and user updates it"
        );
        props.updateDishScore(
          { id: old_value, score: data.rank * -10 },
          { id: data.id, rank: data.rank * 10 } //update overall scores of dishes
        );
      }
    }
    console.log(users, userLoggedin, "user data");

    //update the user in local storage and redux storage
    props.updateUser(userLoggedin);
    //update users in local storage
    let user = users.find((elem) => elem.id === userLoggedin.id);
    users = users.filter((elem) => elem.id !== userLoggedin.id);
    users = [...users, user];

    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(users),
      "ohmyfood"
    ).toString();
    localStorage.setItem("users", ciphertext);

    //update user in local storage

    var ciphertextUser = CryptoJS.AES.encrypt(
      JSON.stringify(userLoggedin),
      "ohmyfood"
    ).toString();
    localStorage.setItem("user", ciphertextUser);
  }

  return (
    <div className='dish-wrapper'>
      <div className='dish-image'>
        <img src={dish.image} alt={props.name}></img>
      </div>
      <div className='dish-description'>
        <div className='dish-name'>{dish.dishName}</div>
        <div className='dish-recipe'>{dish.description}</div>
      </div>

      <div className='dish-ranking'>
        <Button
          className='rank-btn' //css styling function
          variant='contained'
          onClick={() => {
            handleGiveRank({ id: props.dish.id, rank: 1 });
          }}
        >
          <img
            src={gold}
            style={{ height: "40px", width: "40px" }}
            alt='gold'
          ></img>
        </Button>
        <Button
          className='rank-btn'
          variant='contained'
          onClick={() => {
            handleGiveRank({ id: props.dish.id, rank: 2 });
          }}
        >
          <img
            style={{ height: "40px", width: "40px" }}
            src={silver}
            alt='silver'
          ></img>
        </Button>
        <Button
          className='rank-btn'
          variant='contained'
          onClick={() => {
            handleGiveRank({ id: props.dish.id, rank: 3 });
          }}
        >
          <img
            src={bronze}
            style={{ height: "40px", width: "40px" }}
            alt='bronze'
          ></img>
        </Button>
      </div>
    </div>
  );
}

export const mapStateToProps = (state) => {
  const { userLoggedin, users } = state;
  return {
    userLoggedin,
    users,
  };
};

export default connect(mapStateToProps, { updateUser, updateDishScore })(Dish);
