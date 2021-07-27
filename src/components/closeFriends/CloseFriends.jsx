import "./CloseFriends.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const CloseFriends = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: curUser } = useContext(AuthContext);

  if (user?._id === curUser?._id) {
    return null;
  } else {
    return (
      <Link
        to={`profile/${user?._id}`}
        style={{ textDecoration: "none", color: "black", fontWeight: "600" }}
      >
        <li className="friends">
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
          <span className="friends__name">{user?.username}</span>
        </li>
      </Link>
    );
  }
};

export default CloseFriends;
