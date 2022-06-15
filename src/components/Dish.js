import React from "react";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import "../assets/css/Dish.css";
import { updateUser, updateDishScore } from "../actions";
import gold from "../assets/images/gold.png";
import silver from "../assets/images/silver.png";
import bronze from "../assets/images/bronze.png";

var CryptoJS = require("crypto-js");

function Dish(props) {
  var userSignedin, users;
  if (props) {
    userSignedin = JSON.parse(JSON.stringify(props.userLoggedin)); // important Note:  copy props otherwise state get mutated
    users = JSON.parse(JSON.stringify(props.users)); // important Note:  copy props otherwise state get mutated
  }

  function selectedBtn(rank, unselected_id) {
    if (unselected_id) {
      document.getElementById(
        `btn-0${unselected_id}-${props.dish.id}`
      ).style.backgroundColor = "transparent";
      return;
    }
    switch (rank) {
      case 1: {
        document.getElementById(
          `btn-01-${props.dish.id}`
        ).style.backgroundColor = "gold";

        document.getElementById(
          `btn-02-${props.dish.id}`
        ).style.backgroundColor = "transparent";
        document.getElementById(
          `btn-03-${props.dish.id}`
        ).style.backgroundColor = "transparent";

        break;
      }
      case 2: {
        document.getElementById(
          `btn-02-${props.dish.id}`
        ).style.backgroundColor = "silver";

        document.getElementById(
          `btn-01-${props.dish.id}`
        ).style.backgroundColor = "transparent";
        document.getElementById(
          `btn-03-${props.dish.id}`
        ).style.backgroundColor = "transparent";

        break;
      }
      case 3: {
        document.getElementById(
          `btn-03-${props.dish.id}`
        ).style.backgroundColor = "brown";

        document.getElementById(
          `btn-02-${props.dish.id}`
        ).style.backgroundColor = "transparent";
        document.getElementById(
          `btn-01-${props.dish.id}`
        ).style.backgroundColor = "transparent";

        break;
      }
      default:
        return;
    }
  }

  const { dish } = props;
  let new_users = users.filter((elem) => elem.id !== userSignedin.id);

  function handleGiveRank(data) {
    // if user has not selected any dishes
    if (userSignedin) {
      if (!userSignedin.dishes[4]) {
        userSignedin.dishes[data.rank] = data.id;
        userSignedin.dishes[4] = true;

        props.updateDishScore(null, {
          id: data.id,
          score: (4 - data.rank) * 10,
        });
        //update overall scores of dishes
      } else {
        let prev_index_same_dish = userSignedin.dishes.indexOf(data.id);
        if (prev_index_same_dish !== -1) {
          if (prev_index_same_dish === data.rank) {
            //if user has unselected the dish
            userSignedin.dishes[prev_index_same_dish] = 0;
            props.updateDishScore(
              { id: data.id, score: (4 - data.rank) * -10 },
              null
            );
          } else {
            userSignedin.dishes[prev_index_same_dish] = 0;
            userSignedin.dishes[data.rank] = data.id;
            props.updateDishScore(
              { id: data.id, score: (4 - data.prev_index_same_dish) * -10 },
              { id: data.id, score: (4 - data.rank) * 10 } //update overall scores of dishes
            );
          }
        } else {
          let old_value = userSignedin.dishes[data.rank];
          userSignedin.dishes[data.rank] = data.id;
          props.updateDishScore(
            { id: old_value, score: (4 - data.rank) * -10 },
            { id: data.id, score: (4 - data.rank) * 10 } //update overall scores of dishes
          );
        }
      }

      // update the user in local storage and redux storage
      props.updateUser(userSignedin);
      // update users in local storage
      // users = [...new_users, userSignedin];
      //     // var ciphertext = CryptoJS.AES.encrypt(
      //     //   JSON.stringify(users),
      //     //   "ohmyfood"
      //     // ).toString();
      //     // localStorage.setItem("users", ciphertext);
      //     // // update user in local storage
      //     // var ciphertextUser = CryptoJS.AES.encrypt(
      //     //   JSON.stringify(userSignedin),
      //     //   "ohmyfood"
      //     // ).toString();
      //     // localStorage.setItem("user", ciphertextUser);
    }
  }

  return (
    <>
      {dish ? (
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
              id={`btn-01-${props.dish.id}`}
              className='rank-btn' //css styling function
              variant='contained'
              onClick={() => {
                handleGiveRank({ id: props.dish.id, rank: 1 });
                selectedBtn(1);
              }}
            >
              <img
                src={gold}
                style={{ height: "40px", width: "40px" }}
                alt='gold'
              ></img>
            </Button>
            <Button
              id={`btn-02-${props.dish.id}`}
              className='rank-btn'
              variant='contained'
              onClick={() => {
                handleGiveRank({ id: props.dish.id, rank: 2 });
                selectedBtn(2);
              }}
            >
              <img
                style={{ height: "40px", width: "40px" }}
                src={silver}
                alt='silver'
              ></img>
            </Button>
            <Button
              id={`btn-03-${props.dish.id}`}
              className='rank-btn'
              variant='contained'
              onClick={() => {
                handleGiveRank({ id: props.dish.id, rank: 3 });
                selectedBtn(3);
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
      ) : null}
    </>
  );
}

export const mapStateToProps = (state) => {
  const { userLoggedin, users, dishesScores } = state;
  return {
    userLoggedin,
    users,
    dishesScores,
  };
};

export default connect(mapStateToProps, { updateUser, updateDishScore })(Dish);
