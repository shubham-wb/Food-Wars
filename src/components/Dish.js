import React, { useState } from "react";
import { Button } from "@mui/material";
import { connect } from "react-redux";
import "../assets/css/Dish.css";
import { updateUser } from "../actions";

function Dish(props) {
  console.log(users);
  const { users, userLoggedIn } = props;
  const { dish } = props;
  let { rank, setRank } = useState(0);
  let user = users.find((elem) => userLoggedIn.id === elem.id); //get the details of user logged in

  const handleGiveRank = (rank) => {
    setRank(rank);
    updateUser(dish.id, rank);

    let user = users.find((elem) => elem.id === userLoggedIn.id);
    if (user) {
      let dish = user.dishes.find((elem) => elem.id === props.dish.id);
      if (dish) {
        dish.rank = rank;
      } else {
      }
    }
    let updated_user = {
      ...userLoggedIn.id,
    };
    let users = [...users];
    localStorage.set("users");
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
      <div className='dish-ranking'>
        <Button
          style={{ marginTop: "5px" }}
          variant='contained'
          onClick={() => handleGiveRank(1)}
        >
          1
        </Button>
        <Button
          style={{ marginTop: "5px" }}
          variant='contained'
          onClick={() => handleGiveRank(2)}
        >
          2
        </Button>
        <Button
          style={{ marginTop: "5px" }}
          variant='contained'
          onClick={() => handleGiveRank(3)}
        >
          3
        </Button>
      </div>
    </div>
  );
}

export const mapStateToProps = (state) => {
  const { userLoggedin, users, dishes } = state;
  return {
    userLoggedin,
    users,
    dishes,
  };
};

export default connect(mapStateToProps)(Dish);
