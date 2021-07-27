import React, { useEffect, useState } from "react";
import "./profile.css";
import Nav from "../../components/navbar/Nav";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import axios from "../../axios";
import { useParams } from "react-router";
import { Avatar, Badge } from "@material-ui/core";
import { CheckCircle, Edit } from "@material-ui/icons";

const Profile = () => {
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const _id = useParams().id;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?id=${_id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [_id]);

  const setCover = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", file, file.name);
    try {
      await axios
        .post("/users/update/photoId", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-Us,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${file._boundary}`,
          },
        })
        .then((res) => {
          const photoId = {
            userId: user?._id,
            coverPic: res.data.filename,
          };
          saveImg(photoId);
        });
    } catch (err) {
      alert(err);
    }
  };
  const updateAvatar = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", avatar, avatar.name);
    try {
      await axios
        .post("/users/update/photoId", data, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-Us,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${avatar._boundary}`,
          },
        })
        .then((res) => {
          const photoId = {
            userId: user?._id,
            profilePic: res.data.filename,
          };
          saveImg(photoId);
        });
    } catch (err) {
      alert(err);
    }
  };

  const saveImg = async (photo) => {
    await axios({
      method: "put",
      url: `/users/update/${user?._id}`,
      data: photo,
    });
    window.location.reload();
    setLoading(false);
    setFile(null);
  };

  return (
    <>
      <Nav />
      <div className="profile">
        <Sidebar />
        <div className="profile__right">
          <div className="profile__right_top">
            <div className="profile__cover">
              <img
                // src={user?.coverPic || PF + "/person/cover.jpeg"}
                src={
                  user?.coverPic
                    ? `https://mern-social-backend.herokuapp.com/api/users/retrieve/photoId?name=${user?.coverPic}`
                    : PF + "/person/cover.jpeg"
                }
                alt="cover"
                className="profile__cover_img"
              />
              <label htmlFor="file">
                <Badge
                  className="profile__user_img_con"
                  overlap="circle"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={
                    !avatar ? (
                      <Edit
                        fontSize="40px"
                        style={{
                          cursor: "pointer",
                          backgroundColor: "#555",
                          borderRadius: "10px",
                          color: "white",
                        }}
                      />
                    ) : null
                  }
                  variant="standard"
                >
                  <Avatar
                    variant="circle"
                    src={
                      user?.profilePic
                        ? `https://mern-social-backend.herokuapp.com/api/users/retrieve/photoId?name=${user?.profilePic}`
                        : PF + "/person/avatar.jpeg"
                    }
                    alt="profile"
                    className="profile__user_img"
                  />
                </Badge>
                <input
                  id="file"
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*,image/heif,image/heic"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </label>
              <div className="profile__add_cover">
                <label htmlFor="file">
                  <span className="add_cover">Add Cover Photo</span>
                  <input
                    id="file"
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*,image/heif,image/heic"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </label>
                {file ? (
                  <CheckCircle
                    onClick={setCover}
                    style={{
                      position: "absolute",
                      marginLeft: "10px",
                      cursor: "pointer",
                      top: "-7px",
                    }}
                    htmlColor="green"
                    fontSize="large"
                  />
                ) : null}
              </div>
            </div>
            <div className="profile__info">
              {avatar ? (
                <span
                  onClick={updateAvatar}
                  style={{
                    margin: "5px",
                    padding: "10px",
                    borderRadius: "10px",
                    backgroundColor: "green",
                    cursor: "pointer",
                    color: "white",
                  }}
                >
                  update
                </span>
              ) : null}
              <h4 className="profile__username">{user?.username}</h4>
              <span className="profile__desc">{user?.desc}</span>
            </div>
          </div>
          <div className="profile__right_bottom">
            <Feed id={user?._id} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
