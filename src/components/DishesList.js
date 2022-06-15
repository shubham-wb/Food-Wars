import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addDishesToState } from "../actions";
import { getDishes } from "../utils";
import Dish from "./Dish";

function DishesList(props) {
  var userDetails;
  if (props.userLoggedin) {
    userDetails = JSON.parse(JSON.stringify(props.userLoggedin));
  }

  let [mydishList, setMyDish] = useState([]);
  let [otherDishesList, setOtherDishes] = useState([]);

  useEffect(() => {
    let dishes = getDishes();
    props.addDishesToState(dishes);
    //sort user ranked dishes and other dishes
    let mydish = [];
    let otherDishes = [];

    if (userDetails && dishes) {
      for (let i = 1; i < 4; i++) {
        if (userDetails.dishes[i] === 0) {
          continue;
        }
        mydish.push(dishes[userDetails.dishes[i] - 1]);
      }
    }

    for (let i = 0; i < dishes.length; i++) {
      if (dishes[i].id === userDetails.dishes[1]) {
        continue;
      }
      if (dishes[i].id === userDetails.dishes[2]) {
        continue;
      }
      if (dishes[i].id === userDetails.dishes[3]) {
        continue;
      }

      otherDishes.push(dishes[i]);
    }
    setMyDish(mydish);
    setOtherDishes(otherDishes);
  }, [props.userLoggedin]);
  return (
    <div>
      <h2
        style={{
          width: "max-content",
          marginLeft: "60px",
          marginTop: "20px",
          borderBottom: "solid 4px Green",
          marginBottom: "20px",
          fontFamily: "Poppins , sans-serif",
          fontWeight: "600",
          fontSize: "1.3rem",
        }}
      >
        My Dishes
      </h2>
      <div className='myDishes'>
        {mydishList.map((dish, index) => (
          <Dish dish={dish} key={`dish-${index}`}></Dish>
        ))}
      </div>
      <h2
        style={{
          width: "max-content",
          marginLeft: "60px",
          marginTop: "20px",
          borderBottom: "solid 4px Green",
          marginBottom: "20px",
          fontFamily: "Poppins , sans-serif",
          fontWeight: "600",
          fontSize: "1.3rem",
        }}
      >
        All
      </h2>
      <div className='other-dishes'>
        {otherDishesList.map((dish, index) => (
          <Dish dish={dish} key={`dish-${index}`}></Dish>
        ))}
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

export default connect(mapStateToProps, { addDishesToState })(DishesList);
