import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "../assets/css/MyRankings.css"; //css file
import { getDishes } from "../utils";
import gold from "../assets/images/gold.png";
import silver from "../assets/images/silver.png";
import bronze from "../assets/images/bronze.png";

//function to display rankings given by logged in user
function MyRankings(props) {
  const { userLoggedin } = props;
  let [List, setList] = useState([]);

  useEffect(() => {
    let dishes = getDishes();
    let mydish = [];
    if (userLoggedin) {
      for (let i = 1; i < 4; i++) {
        if (userLoggedin.dishes[i] === 0) {
          mydish.push(null);
          continue;
        }
        mydish.push(dishes[userLoggedin.dishes[i] - 1]);
      }
      setList(mydish);
    }
  }, [props.userLoggedin]);
  console.log(List);
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
          {List
            ? List.map((elem, index) => {
                return elem ? (
                  <div
                    style={{
                      height: "40px",
                      width: "100%",
                      margin: "20px",
                      marginLeft: "5px",
                      fontFamily: "Poppins ,sans-serif",
                      textAlign: "center",
                    }}
                    key={`my-dish-${index}`}
                  >
                    {elem.dishName}
                  </div>
                ) : (
                  <div
                    style={{
                      fontFamily: "Poppins ,sans-serif",

                      fontSize: "1.2rem",
                      textAlign: "center",
                      height: "40px",
                      width: "100%",
                      margin: "20px",
                      marginLeft: "5px",
                    }}
                  >
                    ---
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  const { userLoggedin } = state;
  return {
    userLoggedin,
  };
};
export default connect(mapStateToProps)(MyRankings);
