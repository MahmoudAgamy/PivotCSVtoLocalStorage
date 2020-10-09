import React, { useState, useEffect } from "react";
import "../css/signInUp.css";

function SignInUp(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // if user is logged in, redirect to /invoices
  useEffect(() => {
    if (!!localStorage.getItem("loggedInUser")) {
      props.history.push("/invoices");
    }
  }, [props]);

  // helper
  const returnIfAnyStateIsEmpty = (fn) => {
    if (name === "" || password === "") {
      alert("please enter username and password");
      return;
    }
    fn();
  };

  // handlers
  const handleSignIn = () => {
    if (localStorage.getItem(`user_${name}`) === password) {
      localStorage.setItem("loggedInUser", name);
      props.history.push("/invoices");
    } else {
      alert("username or password is wrong");
    }
  };

  const handleSignUp = () => {
    localStorage.setItem(`user_${name}`, password);
    localStorage.setItem("loggedInUser", name);
    props.history.push("/invoices");
  };

  return (
    <div className="SignInUp">
      <div className="form">
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="formButtons">
          <div
            className="signIn"
            onClick={() => returnIfAnyStateIsEmpty(handleSignIn)}
          >
            Sign In
          </div>
          <div
            className="signUp"
            onClick={() => returnIfAnyStateIsEmpty(handleSignUp)}
          >
            Sign Up
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInUp;
