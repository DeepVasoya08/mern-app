import React, { useEffect, useState } from "react";
import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilled,
  Group,
  Bookmark,
  Help,
  Work,
  Event,
  School,
} from "@material-ui/icons";
import CloseFriends from "../closeFriends/CloseFriends";
import axios from "../../axios";

const Sidebar = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/get/users/");
      setFriends(res.data);
    };
    getFriends();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarWrap">
        <ul className="sidebar__list">
          <li className="list__items">
            <RssFeed className="list__icon" />
            <span className="list__name">Feed</span>
          </li>
          <li className="list__items">
            <Chat className="list__icon" />
            <span className="list__name">Chats</span>
          </li>
          <li className="list__items">
            <PlayCircleFilled className="list__icon" />
            <span className="list__name">Video</span>
          </li>
          <li className="list__items">
            <Group className="list__icon" />
            <span className="list__name">Groups</span>
          </li>
          <li className="list__items">
            <Bookmark className="list__icon" />
            <span className="list__name">Bookmarks</span>
          </li>
          <li className="list__items">
            <Help className="list__icon" />
            <span className="list__name">Questions</span>
          </li>
          <li className="list__items">
            <Work className="list__icon" />
            <span className="list__name">Jobs</span>
          </li>
          <li className="list__items">
            <Event className="list__icon" />
            <span className="list__name">Events</span>
          </li>
          <li className="list__items">
            <School className="list__icon" />
            <span className="list__name">Courses</span>
          </li>
        </ul>
        <button className="sidebar__btn">Show More</button>
        <hr className="hr" />
        <ul className="sidebar__friendList">
          {friends.map((u) => (
            <CloseFriends user={u} key={u._id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
