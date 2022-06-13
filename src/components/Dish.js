import React from "react";
import "../assets/css/Dish.css";
export function Dish(props) {
  const { dish } = props;
  return (
    <div className='dish-wrapper'>
      <div className='dish-image'>
        <img src={dish.image} alt={props.name}></img>
      </div>
      <div className='dish-description'>
        <div className='dish-name'>{dish.dishName}</div>
        <div className='dish-description'>{dish.description}</div>
      </div>
    </div>
  );
}
