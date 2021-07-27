import "./login.css";
import React, { useContext, useRef } from "react";
import { CircularProgress } from "@material-ui/core";
import { LoginCheck } from "../../LoginCheck";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch, error } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    LoginCheck(
      {
        email: email.current.value,
        password: password.current.value,
      },
      dispatch
    );
    if (error) alert("User/Password is invalid");
  };

  return (
    <div className="login">
      <div className="login__wrap">
        <div className="login__left">
          <h3 className="login__logo">Socials</h3>
          <span className="login__desc">
            Connect with friends and the world.
          </span>
        </div>
        <div className="login__right">
          <form onSubmit={handleLogin} className="login__box">
            <input
              autoComplete="true"
              required
              type="email"
              placeholder="Email"
              className="login__inputs"
              ref={email}
            />
            <input
              autoComplete="true"
              required
              minLength="6"
              ref={password}
              type="password"
              placeholder="Password"
              className="login__inputs"
            />
            <button disabled={isFetching} className="login__btn">
              {isFetching ? (
                <CircularProgress
                  size="30px"
                  style={{ justifyContent: "center", color: "white" }}
                />
              ) : (
                "Login"
              )}
            </button>
            <span className="login__forgot">Forgot Password?</span>
          </form>
          <Link to="/signup" replace className="login__create_acc">
            Create a New Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
