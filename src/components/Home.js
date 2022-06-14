import React from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import buvette from "../assets/images/Buvette.svg";
import "../assets/css/Home.css";
import { Button } from "@mui/material";
import arrow from "../assets/images/east.svg";
function Home() {
  return (
    <div className='home'>
      <nav>
        <div className='logo'>
          <img src={buvette} alt='logo' />
          <h2>Buvette™</h2>
        </div>
        <div
          style={{
            marginRight: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to='/scoreboard' style={{ textDecoration: "none" }}>
            <Button
              className='scoreboard-btn'
              style={{ color: "white" }}
              variant='outlined'
            >
              ScoreBoard
            </Button>
          </Link>
        </div>
      </nav>
      <div className='main'>
        <div className='left-section'>
          <div className='context'>
            <h2>Hey Foodie , War Mode is on</h2>
            <h3> Buvette 🍳 is back with yearly food war🍴 competition</h3>
            <h5
              style={{
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
              }}
            >
              {" "}
              What are you waiting for,{" "}
              <span
                style={{
                  padding: "15px",
                  width: "140px",
                  color: "black",
                  borderRadius: "20px",
                  backgroundColor: "skyblue",
                }}
              >
                vote now 🍉
              </span>
              <img
                style={{
                  height: "60px",
                  width: "60px",
                }}
                src={arrow}
                alt='arrow'
              ></img>
            </h5>
          </div>
        </div>
        <div className='right-section'>
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Home;
