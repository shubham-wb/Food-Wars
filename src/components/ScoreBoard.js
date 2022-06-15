import React from "react";
import "../assets/css/ScoreBoard.css";
import { connect } from "react-redux";
function ScoreBoard(props) {
  let dishes = [...props.dishesScores];
  console.log(props.dishesScores, "dishScores");
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
        </ul>
        <div className='dishes-scores-list'>
          {dishes
            ? dishes
                .sort((a, b) => a - b)
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
