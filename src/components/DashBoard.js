import React, { useState } from "react";
import { connect } from "react-redux";
import "../assets/css/Dashboard.css"; //css
import DishesList from "./DishesList";
import MyRankings from "./MyRankings";
import Loader from "./Loader";
function DashBoard(props) {
  let [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='Dashboard'>
          <div className='Dashboard-wrapper'>
            <h2
              style={{
                marginTop: "20px",
                height: "10%",
                width: "100%",
                textAlign: "center",
                fontFamily: "Poppins ,sans-serif",
                textTransform: "capitalize",
              }}
            >
              Hello {props.username}🖐
            </h2>
            <div style={{ height: "90%", width: "100%", display: "flex" }}>
              <div className='dashboard-main'>
                <DishesList />
              </div>
              <div className='aside'>
                <MyRankings />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { userLoggedin } = state;
  return userLoggedin;
};

export default connect(mapStateToProps)(DashBoard);
