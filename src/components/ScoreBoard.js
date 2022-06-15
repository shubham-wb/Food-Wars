import React from "react";
import "../assets/css/ScoreBoard.css";
import { connect } from "react-redux";
var CryptoJS = require("crypto-js");
let user, bytes;
function ScoreBoard(props) {
  user = localStorage.getItem("user");
  if (user !== null) {
    bytes = CryptoJS.AES.decrypt(user, "ohmyfood"); //decrypt userdetails
  }
  var userSignedin;
  if (props.userSignedin) {
    userSignedin = props.userSignedin;
  } else if (bytes != undefined) {
    userSignedin = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  let dishesStored = localStorage.getItem("dishes");
  var dishes_bytes = CryptoJS.AES.decrypt(dishesStored, "ohmyfood"); //decrypt userdetails
  var dishes;
  if (Array.isArray(props.dishesScores)) {
    dishes = [...props.dishesScores];
  } else {
    dishes = JSON.parse(dishes_bytes.toString(CryptoJS.enc.Utf8));
  }
  return (
    <div className='scoreboard-wrapper'>
      <div className='scoreboard'>
        <h1>ScoreBoard</h1>
        <ul
          style={{
            height: "20px",
            color: "white",
            width: "100%",
            display: "flex",
            fontFamily: "Poppins",
            flexDirection: "row",
            listStyleType: "none",
          }}
        >
          <li style={{ marginLeft: "60px" }}>Name of Dish</li>
          <li style={{ marginLeft: "180px" }}>Score</li>
          {userSignedin ? (
            <li style={{ marginLeft: "80px" }}>Your Upvotes</li>
          ) : null}
        </ul>
        <div className='dishes-scores-list'>
          {dishes
            ? dishes
                .sort((a, b) => b.score - a.score)
                .map((elem, index) => {
                  return (
                    <div className='dish-scores' key={`score-${index}`}>
                      <div
                        style={{
                          width: "4%",
                          height: "100%",
                          marginRight: "20px",
                        }}
                      >
                        {index + 1}
                      </div>
                      <div
                        style={{
                          width: "40%",
                          height: "100%",
                          marginRight: "20px",
                        }}
                      >
                        {elem.dishName}{" "}
                      </div>
                      <div>{elem.score}</div>
                      {userSignedin ? (
                        elem.id === userSignedin.dishes[1] ||
                        elem.id === userSignedin.dishes[2] ||
                        elem.id === userSignedin.dishes[3] ? (
                          <div style={{ marginLeft: "120px" }}> 🍅</div>
                        ) : null
                      ) : null}
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
  return state;
};

export default connect(mapStateToProps)(ScoreBoard);
