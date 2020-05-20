import React, { useState } from "react";
import axiosWithAuth from "../util/axiosWithAuth";

const Login = (props) => {
  const [cred, setCred] = useState({
    credentials: {
      username: "",
      password: "",
    },
  });
  const handleChange = (e) => {
    setCred({
      credentials: {
        ...cred.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", cred.credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble-page");
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  };

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>

      <form onSubmit={(e) => login(e)}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={cred.credentials.username}
          onChange={(e) => handleChange(e)}
        />
        <input
          type="text"
          name="password"
          placeholder="password"
          value={cred.credentials.password}
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
