import React from "react";
import { connect } from "react-redux";
function MyRankings(props) {
  const { userLoggedin } = props;
  console.log(userLoggedin, "myrank");
  return (
    <div>
      <div>My Rankings</div>

      <div>
        {userLoggedin.dishes
          ? userLoggedin.dishes.map((dish, index) => (
              <div key={`mydish-${index}`}>
                {dish.dishName}
                {dish.rank}
              </div>
            ))
          : null}
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
