import React from "react";
import DishesList from "./DishesList";
function DashBoard() {
  return (
    <div>
      <nav></nav>
      <div className='Dashboard-wrapper'>
        <div className='main'>
          <DishesList />
        </div>
        <div className='aside'></div>
      </div>
    </div>
  );
}

export default DashBoard;
