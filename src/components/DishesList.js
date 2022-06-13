import React, { useEffect, useState } from "react";
import { getDishes } from "../utils";
import Dish from "./Dish";

function DishesList() {
  let [dishesList, setDishesList] = useState([]);

  useEffect(() => {
    setDishesList(getDishes); //get dishes and display on dashboard
  }, []);
  return (
    <div>
      {dishesList.map((dish, index) => (
        <Dish dish={dish} key={`dish-${index}`}></Dish>
      ))}
    </div>
  );
}

export default DishesList;
