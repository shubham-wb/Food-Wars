import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { addDishesToState } from "../actions";
import Dish from "./Dish";

function DishesList(props) {
  let { userLoggedin } = props;

  let [mydishList, setMyDish] = useState([]);
  let [otherDishesList, setOtherDishes] = useState([]);

  useEffect(() => {
    //sort user ranked dishes and other dishes
    let mydish = [];
    let otherDishes = [];
    if (props.dishes) {
      for (let i = 0; i < props.dishes.length; i++) {
        if (userLoggedin.dishes) {
          if (userLoggedin.dishes[0].id === props.dishes[i].id) {
            console.log(props.dishes[i]);
            mydish.push(props.dishes[i]);
          } else if (
            userLoggedin.dishes.length > 1 &&
            userLoggedin.dishes[1].id === props.dishes[i].id
          ) {
            console.log(props.dishes[i]);
            mydish.push(props.dishes[i]);
          } else if (
            userLoggedin.dishes.length > 2 &&
            userLoggedin.dishes[2].id === props.dishes[i].id
          ) {
            console.log(props.dishes[i]);
            mydish.push(props.dishes[i]);
          } else {
            otherDishes.push(props.dishes[i]);
          }
        } else {
          otherDishes.push(props.dishes[i]);
        }
      }
      setMyDish(mydish);
      setOtherDishes(otherDishes);
    }
  }, []);
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
  const { userLoggedin, dishes } = state;
  return {
    userLoggedin,
    dishes,
  };
};

export default connect(mapStateToProps, { addDishesToState })(DishesList);
