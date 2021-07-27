import "./signup.css";
import React, { useRef } from "react";
import axios from "../../axios";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const history = useHistory();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      confirmPassword.current.setCustomValidity("Password don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("/auth/signup", user);
        history.push("/login");
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div className="signup">
      <div className="signup__wrap">
        <div className="signup__left">
          <h3 className="signup__logo">Socials</h3>
          <span className="signup__desc">
            Connect with friends and the world.
          </span>
        </div>
        <div className="signup__right">
          <form className="signup__box" onSubmit={handleSignup}>
            <input
              autoComplete="true"
              required
              ref={username}
              type="text"
              placeholder="Username"
              className="signup__inputs"
            />
            <input
              autoComplete="true"
              required
              ref={email}
              type="email"
              placeholder="Email"
              className="signup__inputs"
            />
            <input
              autoComplete="true"
              required
              ref={password}
              // type="password"
              placeholder="Password"
              className="signup__inputs"
              minLength="6"
            />
            <input
              autoComplete="true"
              required
              ref={confirmPassword}
              // type="password"
              placeholder="Confirm Password"
              className="signup__inputs"
              minLength="6"
            />
            <button className="signup__btn" type="submit">
              Signup
            </button>
            <span className="signup__forgot">Forgot Password?</span>
          </form>
          <button
            onClick={() => history.push("/login")}
            className="login__back"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
