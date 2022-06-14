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
  const handleGiveRank = (rank) => {
    if (userLoggedin.dishes) {
      if (userLoggedin.dishes.length === 3) {
        return;
      }

      let dishToUpdate = userLoggedin.dishes.find(
        (elem) => elem.id === props.dish.id
      );
      if (dishToUpdate) {
        let filteredDishesArray = userLoggedin.dishes.filter(
          (elem) => elem.id !== props.dish.id
        );
        dishToUpdate.rank = rank;
        userLoggedin.dishes = [...filteredDishesArray, dishToUpdate];
      } else {
        props.dish.rank = rank;
        userLoggedin.dishes.push(props.dish);
      }
    } else {
      userLoggedin.dishes = [];
      props.dish.rank = rank;
      userLoggedin.dishes.push(props.dish);
    }
    //update the users database
    if (users) {
      let filteredUsers = users.filter((elem) => elem.id !== userLoggedin.id);
      let updatedUsers = [...filteredUsers, userLoggedin];
      console.log(updatedUsers);
      var ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(updatedUsers),
        "ohmyfood"
      ).toString();
      localStorage.setItem("users", ciphertext);
    }

    var ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(userLoggedin),
      "ohmyfood"
    ).toString();
    localStorage.setItem("user", ciphertext);
    updateUser(userLoggedin);
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
            style={highlightSelected(1)}
            variant='contained'
            onClick={() => {
              setRank(1);
              handleGiveRank(1);
            }}
          >
            1
          </Button>
          <Button
            style={highlightSelected(2)}
            variant='contained'
            onClick={() => {
              setRank(2);
              handleGiveRank(2);
            }}
          >
            2
          </Button>
          <Button
            style={highlightSelected(3)}
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

export default connect(mapStateToProps)(Dish);
