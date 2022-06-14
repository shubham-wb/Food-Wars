import React from "react";
import "../assets/css/Dashboard.css"; //css
import DishesList from "./DishesList";
import MyRankings from "./MyRankings";
function DashBoard() {
  return (
    <div className='Dashboard'>
      <div className='Dashboard-wrapper'>
        <div className='dashboard-main'>
          <DishesList />
        </div>
        <div className='aside'>
          <MyRankings />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
