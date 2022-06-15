import React from "react";
import { connect } from "react-redux";
import "../assets/css/MyRankings.css"; //css file
import { getDishes } from "../utils";
import gold from "../assets/images/gold.png";
import silver from "../assets/images/silver.png";
import bronze from "../assets/images/bronze.png";

//function to display rankings given by logged in user
function MyRankings(props) {
  const { userLoggedin } = props;
  let dishes = getDishes();
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
          {userLoggedin.dishes
            ? userLoggedin.dishes
                .sort((a, b) => a.id - b.id)
                .map((dish, index) =>
                  dish === 0 || dish === false || dish === true ? null : (
                    <div className='rank-element' key={`mydish-${index}`}>
                      {dishes[dish - 1].dishName}
                    </div>
                  )
                )
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
