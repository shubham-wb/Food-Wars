import React from "react";
import "../assets/css/Dashboard.css"; //css
import DishesList from "./DishesList";
import MyRankings from "./MyRankings";
function DashBoard() {
  return (
    <div className='Dashboard'>
      <nav></nav>
      <div className='Dashboard-wrapper'>
        <div className='main'>
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
