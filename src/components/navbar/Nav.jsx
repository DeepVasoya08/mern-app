import React, { useContext } from "react";
import "./nav.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Typography } from "@material-ui/core";

const Nav = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const Logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="nav">
      <div className="nav__left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social</span>
        </Link>
      </div>
      <div className="nav__center">
        <div className="nav__search">
          <Search className="search__icon" />
          <input
            type="text"
            className="search"
            placeholder="search for friends..."
          />
        </div>
      </div>
      <div className="nav__right">
        <div className="nav__icons">
          <div className="icon__item">
            <Person />
            <span className="icon__badge">1</span>
          </div>
        </div>
        <div className="nav__icons">
          <div className="icon__item">
            <Chat />
            <span className="icon__badge">1</span>
          </div>
        </div>
        <div className="nav__icons">
          <div className="icon__item">
            <Notifications />
            <span className="icon__badge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user?._id}`}>
          {user?.profilePic ? (
            <img
              src={
                `https://mern-social-backend.herokuapp.com/api/users/retrieve/photoId?name=${user?.profilePic}` ||
                PF + "/person/avatar.png"
              }
              alt={user?.username}
              className="img"
            />
          ) : (
            <img
              src={PF + "/person/avatar.png"}
              alt={user?.username}
              className="img"
            />
          )}
        </Link>
        <div onClick={Logout} className="nav__logout">
          <Typography className="logout" variant="h6">
            Logout
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Nav;
