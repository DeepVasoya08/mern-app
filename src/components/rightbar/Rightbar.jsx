import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import axios from "../../axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

const Rightbar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const { user: curUser, dispatch } = useContext(AuthContext);
  const [follow, setFollow] = useState(curUser?.followings.includes(user?._id));
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFrnds = async () => {
      try {
        const frnds = await axios.get(`/users/friends/${curUser?._id}`);
        setFriends(frnds.data);
      } catch (err) {
        alert(err);
      }
    };
    getFrnds();
  }, [curUser, user?._id]);

  useEffect(() => {
    setFollow(curUser?.followings.includes(user?._id));
  }, [curUser, user?._id]);

  const handleFollow = async () => {
    try {
      if (follow) {
        await axios.put(`/users/unfollow/${user._id}`, {
          userId: curUser?._id,
        });
        dispatch({
          type: "UNFOLLOW",
          payload: user?._id,
        });
      } else {
        await axios.put(`/users/follow/${user._id}`, {
          userId: curUser?._id,
        });
        dispatch({
          type: "FOLLOW",
          payload: user?._id,
        });
      }
    } catch (err) {
      alert(err);
    }
    setFollow(!follow);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="rightbar__birthday">
          <img src={`${PF}/gift.png`} alt="birthday" className="birthday_img" />
          <span className="birthday_text">
            <b>deep</b> and <b>other 2 friends</b> have a birthday today
          </span>
        </div>
        <img src="assets/ad.png" alt="ad" className="rightbar_ad" />
      </>
    );
  };
  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== curUser.username && (
          <button onClick={handleFollow} className="rightbarFollowBtn">
            {follow ? "Unfollow" : "Follow"}
            {follow ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbar__title">user info</h4>
        <div className="rightbar__info">
          <div className="rightbar__info_item">
            <span className="info_key">City:</span>
            <span className="info_value">{user?.city}</span>
          </div>
        </div>
        <div className="rightbar__info">
          <div className="rightbar__info_item">
            <span className="info_key">From:</span>
            <span className="info_value">{user?.from}</span>
          </div>
        </div>
        <div className="rightbar__info">
          <div className="rightbar__info_item">
            <span className="info_key">Relationship:</span>
            <span className="info_value">
              {user?.relationship === 1
                ? "Single"
                : user?.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbar__title">User Friends</h4>
        <div className="rightbar__followings">
          {friends.map((frnd) => (
            <Link
              key={frnd?._id}
              to={`/profile/${frnd?._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbar__following">
                <img
                  src={
                    `https://mern-social-backend.herokuapp.com/api/users/retrieve/photoId?name=${frnd?.profilePic}` ||
                    PF + "/person/avatar.png"
                  }
                  alt="friends"
                  className="rightbar__following_img"
                />
                <span className="following_name">{frnd?.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbar__wrap">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rightbar;
