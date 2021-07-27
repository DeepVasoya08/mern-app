import React, { useContext, useEffect, useState } from "react";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import axios from "../../axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Menu, MenuItem } from "@material-ui/core";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post?.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const { user: curUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    setIsLiked(post?.likes.includes(curUser._id));
  }, [curUser._id, post?.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?id=${post?.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post?.userId]);

  const likeHandler = async () => {
    try {
      await axios.put(`/posts/likes/${post?._id}`, {
        userId: curUser._id,
      });
    } catch (err) {}
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const deletePost = async () => {
    setAnchorEl(null);
    try {
      await axios({
        method: "DELETE",
        url: `/posts/${post?._id}`,
        data: {
          userId: user?._id,
        },
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="post">
      <div className="post__wrap">
        <div className="post__top">
          <div className="post__top_left">
            <Link to={`profile/${user?._id}`}>
              <img
                src={
                  `https://mern-social-backend.herokuapp.com/api/users/retrieve/photoId?name=${user?.profilePic}` ||
                  PF + "/person/avatar.png"
                }
                alt="person"
                className="post__profile"
              />
            </Link>
            <span className="post__username">{user?.username}</span>
            <span className="post__time">{format(post?.createdAt)}</span>
          </div>
          <div className="post__top_right">
            <MoreVert onClick={handleClick} />
            <Menu
              id="post-options"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={deletePost}>Delete</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="post__center">
          <span className="post__text">{post?.desc}</span>
          {post?.image ? (
            <img
              className="post__img"
              src={`http://localhost:9000/api/posts/retrieve/image?name=${post?.image}`}
              // src={`https://mern-social-backend.herokuapp.com/api/posts/retrieve/image?name=${post?.image}`}
              alt="post"
            />
          ) : null}
        </div>
        <div className="post__bottom">
          <div className="post__bottom_left">
            <img
              className="like_btn"
              src={`${PF}/like.png`}
              alt="like"
              onClick={likeHandler}
            />
            <img
              className="like_btn"
              src={`${PF}/heart.png`}
              alt="heart"
              onClick={likeHandler}
            />
            <span className="like_counter">{likes} people liked it</span>
          </div>
          <div className="post__bottom_right">
            <span className="post_comments">{post?.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
