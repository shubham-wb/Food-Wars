import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { InputAdornment, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { getUser } from "../utils";
import { userLogin } from "../actions";
import "../assets/css/Login.css";

var CryptoJS = require("crypto-js");
//sign in component

const Login = (props) => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  //function to handle login button
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    if (!email || !password) {
      //if email password not entered
      setLoggingIn(false);
      return toast.error("Please add both email and password");
    }
    let loginDetails = getUser(email, password);
    if (loginDetails) {
      let list_users = localStorage.getItem("users");
      var bytes = CryptoJS.AES.decrypt(list_users, "ohmyfood"); //decrypt userdetails
      var users = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      let user =
        users.find((elem) => loginDetails.id === elem.id) || loginDetails; //check users database in localstorage if not then add from db
      var ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        "ohmyfood"
      ).toString();
      props.userLogin(user);
      localStorage.setItem("user", ciphertext);
      toast.success("signed in successfully");
      navigate("/dashboard/food-wars", { replace: true });
    } else {
      toast.error("Umm ! we cannot log you in ");
      setLoggingIn(false);
    }
    setLoggingIn(false);
  };

  setTimeout(() => {
    document.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        console.log("hua");
        event.preventDefault();
        console.log(email, password);
        handleSubmit(event);
      }
    });
  });

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div id='login-box'>
        <h1
          className='login-header'
          style={{
            height: "10%",
            width: "100%",
            fontSize: "1.4rem",
            letterSpacing: "1px",
          }}
        >
          🍽 Buvette
        </h1>
        <div
          style={{
            alignItems: "center",
            height: "15%",
            width: "90%",
            marginTop: "20px",
            padding: "0px 10px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextField
            type='email'
            placeholder='Username'
            variant='outlined'
            style={{ borderRadius: "60px", backgroundColor: "white" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <img
                    src='https://cdn-icons-png.flaticon.com/512/747/747376.png'
                    style={{
                      height: "25px",
                      width: "25px",
                      marginRight: "5px",
                    }}
                    alt=''
                  ></img>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div
          style={{
            padding: "0px 10px",
            marginTop: "20px",
            alignItems: "center",
            height: "15%",
            width: "90%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TextField
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            variant='outlined'
            style={{
              borderRadius: "60px",
              backgroundColor: "white",
              width: "100%",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <img
                    src='https://cdn-icons-png.flaticon.com/512/3064/3064197.png'
                    style={{
                      height: "25px",
                      width: "25px",
                      marginRight: "15px",
                    }}
                    alt=''
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div
          style={{
            marginTop: "10px",
            height: "12%",
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            id='submit'
            style={{
              marginLeft: "10px",
              textTransform: "none",
              color: "white",
              height: "100%",
              width: "100%",
              padding: "5px",
              backgroundColor: "orange",
              fontSize: "1.2rem",
            }}
            disabled={loggingIn}
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            {loggingIn ? (
              <>
                Login
                <div className='loader'>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { userLogin })(Login);
