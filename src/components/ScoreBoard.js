import React from "react";
import "../assets/css/ScoreBoard.css";
import { connect } from "react-redux";
function ScoreBoard(props) {
  let dishes = [props.dishes];
  console.log(dishes);
  return (
    <div className='scoreboard-wrapper'>
      <div className='scoreboard'>
        <h1>ScoreBoard</h1>
        <div className='dishes-scores-list'>
          {dishes
            ? dishes[0].map((elem) => {
                return <div className='dish-scores'>{elem.dishName}</div>;
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
