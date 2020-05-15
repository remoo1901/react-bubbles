import React, {useState} from "react";
import axiosWithAuth from "../util/axiosWithAuth"

const Login = (props) => {
  const [cred, setCred] = useState({
    color: "",
    
  })
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
    </>
  );
};

export default Login;
