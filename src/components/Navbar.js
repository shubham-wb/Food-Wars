import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import buvette from "../assets/images/Buvette.svg";
function Navbar() {
  let location = useLocation();
  console.log(location);

  return (
    <nav>
      <div className='logo'>
        <img
          src='https://cdn-icons-png.flaticon.com/512/3496/3496528.png'
          alt='logo'
        />
        <h2>
          <Link to='/' style={{ color: "white", textDecoration: "none" }}>
            Buvette™
          </Link>
        </h2>
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
        {location.pathname === "/" ? null : (
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.reload();
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
