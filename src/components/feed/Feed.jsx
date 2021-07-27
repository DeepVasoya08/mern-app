import "./feed.css";
import React, { useContext, useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "../../axios";
import { AuthContext } from "../../context/AuthContext";
import Pusher from "pusher-js";

const Feed = ({ id }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchPost = async () => {
    try {
      const res = !id
        ? await axios.get("posts/")
        : await axios.get("posts/timeline/get/" + user?._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2?.createdAt) - new Date(p1?.createdAt);
        })
      );
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const pusher = new Pusher("657da354cfe34ab989da", {
      cluster: "ap2",
    });
    const insertChannel = pusher.subscribe("insertChannel");
    insertChannel.bind("inserted", () => {
      fetchPost();
    });

    const deleteChannel = pusher.subscribe("deleteChannel");
    deleteChannel.bind("deleted", () => {
      fetchPost();
    });

    return () => {
      pusher.unbind_all();
      pusher.unsubscribe();
    };
  }, [fetchPost]);

  useEffect(() => {
    return fetchPost();
  }, [id, user._id]);

  return (
    <div className="feed">
      <div className="feed__wrap">
        {(!id || id === user?._id) && <Share />}
        {posts.map((pst) => (
          <Post key={pst._id} post={pst} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
