import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
function Navbar(props) {
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
        {props.username ? (
          <Button
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
          >
            Logout
          </Button>
        ) : null}
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return state.userLoggedin;
};
export default connect(mapStateToProps)(Navbar);
