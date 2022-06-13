import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import toast, { Toaster } from "react-hot-toast";
import { getUser } from "../utils";
import { userLogin } from "../actions";
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
      setLoggingIn(false);
      return toast.error("Please add both email and password");
    }

    let user = getUser(email, password);
    if (user) {
      props.userLogin(user);

      var ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        "ohmyfood"
      ).toString();
      localStorage.setItem("user", ciphertext);
      toast.success("signed in successfully");
      navigate("/dashboard/food-wars", { replace: true });
    } else {
      toast.error("Umm ! we cannot log you in ");
      setLoggingIn(false);
    }
    setLoggingIn(false);
  };

  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      <div id='login-box'>
        <h1 style={{ height: "10%", width: "100%", fontSize: "1.4rem" }}>
          Log In
        </h1>
        <div
          style={{
            alignItems: "center",
            backgroundColor: "white",
            height: "15%",
            width: "80%",
            marginTop: "20px",
            padding: "0px 10px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img
            src='https://cdn-icons-png.flaticon.com/512/646/646094.png'
            style={{
              height: "45%",
              width: "10%",
              marginRight: "15px",
            }}
            alt=''
          ></img>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div
          style={{
            padding: "0px 10px",

            backgroundColor: "white",
            marginTop: "20px",
            alignItems: "center",
            height: "15%",
            width: "80%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <img
            src='https://cdn-icons-png.flaticon.com/512/3064/3064197.png'
            style={{
              height: "45%",
              width: "10%",
              marginRight: "15px",
            }}
            alt=''
          ></img>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div
          style={{
            marginTop: "10px",
            height: "12%",
            width: "26%",
          }}
        >
          <Button
            style={{
              textTransform: "none",
              color: "white",
              height: "100%",
              width: "auto",
              padding: "5px",
              backgroundColor: "#058cf0e3",
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
        <hr
          style={{
            marginTop: "10px",
            marginBottom: "10px",
            width: "85%",

            background: "black",
          }}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { userLogin })(Login);
