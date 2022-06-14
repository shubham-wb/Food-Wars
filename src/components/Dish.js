import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import "../assets/css/Dish.css";
import { updateUser } from "../actions";
var CryptoJS = require("crypto-js");

function Dish(props) {
  let [showRating, setShowRating] = useState(true);
  let { userLoggedin, users } = props;
  const { dish } = props;
  let [rank, setRank] = useState(0);

  //get if user has already selected 3 items then disable options for selecting
  //excpet for those which are selected by user
  useEffect(() => {
    if (userLoggedin.dishes) {
      if (userLoggedin.dishes.length === 3) {
        if (dish.id === userLoggedin.dishes[0].id) {
          setShowRating(true);
        } else if (dish.id === userLoggedin.dishes[1].id) {
          setShowRating(true);
        } else if (dish.id === userLoggedin.dishes[2].id) {
          setShowRating(true);
        } else {
          setShowRating(false);
        }
      } else {
        setShowRating(true);
      }
    }
  }, [userLoggedin.dishes, dish.id]);

  //function to highlight the selected rank of particular rank
  function highlightSelected(rank) {
    if (userLoggedin.dishes) {
      let dish = userLoggedin.dishes.find((elem) => elem.id === props.dish.id);
      if (dish) {
        if (dish.rank === rank) {
          return { backgroundColor: "gold", marginTop: "5px" };
        } else {
          return {
            backgroundColor: "white",
            color: "black",
            border: "solid 2px blue",
            marginTop: "5px",
          };
        }
      }
    }
  }

  //function to handle giving ranks
  const handleGiveRank = (rank) => {
    if (userLoggedin.dishes) {
      let dishToUpdate = userLoggedin.dishes.find(
        (elem) => elem.id === props.dish.id
      ); //find dish selected in user data if exists
      if (dishToUpdate) {
        let filteredDishesArray = userLoggedin.dishes.filter(
          (elem) => elem.id !== props.dish.id
        );
        dishToUpdate.rank = rank; //change rank of the dish
        userLoggedin.dishes = [...filteredDishesArray, dishToUpdate]; //add to the user data
      } else {
        //else if dish doesn't exist add rank in variable of dish
        dish.rank = rank;
        userLoggedin.dishes.push(dish); //push it to the user data
      }
    } else {
      userLoggedin.dishes = []; //if no dishes has been selected whatsoever
      dish.rank = rank;
      userLoggedin.dishes.push(dish);
    }

    //update the users database
    if (users) {
      let filteredUsers = users.filter((elem) => elem.id !== userLoggedin.id);
      let updatedUsers = [...filteredUsers, userLoggedin]; //add to list of users
      var ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(updatedUsers),
        "ohmyfood"
      ).toString();
      localStorage.setItem("users", ciphertext); //save to localstorage after deciphering if another user logs in ..  state is still saved in storage
    }

    var ciphertext_user = CryptoJS.AES.encrypt(
      JSON.stringify(userLoggedin),
      "ohmyfood"
    ).toString();
    localStorage.setItem("user", ciphertext_user); //save to the user info in localstorage
    props.updateUser(dish.id, rank); //update to redux store
    //add to the local storage
  }; //handle post rank submits

  return (
    <div className='dish-wrapper'>
      <div className='dish-image'>
        <img src={dish.image} alt={props.name}></img>
      </div>
      <div className='dish-description'>
        <div className='dish-name'>{dish.dishName}</div>
        <div className='dish-description'>{dish.description}</div>
      </div>
      {showRating ? (
        <div className='dish-ranking'>
          <Button
            style={highlightSelected(1)} //css styling function
            variant='contained'
            onClick={() => {
              setRank(1);
              handleGiveRank(1);
            }}
          >
            1
          </Button>
          <Button
            style={highlightSelected(2)} //css styling function
            variant='contained'
            onClick={() => {
              setRank(2);
              handleGiveRank(2);
            }}
          >
            2
          </Button>
          <Button
            style={highlightSelected(3)} //css styling function
            variant='contained'
            onClick={() => {
              setRank(3);
              handleGiveRank(3);
            }}
          >
            3
          </Button>
        </div>
      ) : null}
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

export default connect(mapStateToProps, { updateUser })(Dish);
