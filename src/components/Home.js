import React from "react";
import Login from "./Login";
const Home = () => {
  return (
    <div>
      <nav></nav>
      <div className='main'>
        <div className='left-section'></div>
        <div className='right-section'>
          <Login />
        </div>
      </div>
    </div>
  );
};

export default Home;
