import React, { useContext, useState } from "react";
import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newPost = {
      userId: user?._id,
      desc: desc,
    };
    if (desc && file) {
      const data = new FormData();
      data.append("file", file, file.name);
      try {
        await axios
          .post("/posts/upload/image", data, {
            headers: {
              accept: "application/json",
              "Accept-Language": "en-Us,en;q=0.8",
              "Content-Type": `multipart/form-data; boundary=${file._boundary}`,
            },
          })
          .then((res) => {
            const fileAndDesc = {
              userId: user?._id,
              image: res.data.filename,
              desc: desc,
            };
            saveImg(fileAndDesc);
          });
        return;
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    }
    if (file) {
      const data = new FormData();
      data.append("file", file, file.name);
      try {
        await axios
          .post("/posts/upload/image", data, {
            headers: {
              accept: "application/json",
              "Accept-Language": "en-Us,en;q=0.8",
              "Content-Type": `multipart/form-data; boundary=${file._boundary}`,
            },
          })
          .then((res) => {
            const postData = {
              userId: user?._id,
              image: res.data.filename,
            };
            saveImg(postData);
          });
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    }
    if (desc) {
      try {
        await axios.post("/posts", newPost);
        setDesc("");
        setLoading(false);
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    }
  };

  const saveImg = async (postData) => {
    await axios.post("/posts", postData);
    setFile(null);
    setDesc("");
    setLoading(false);
  };

  return (
    <div className="share">
      <div className="share__wrap">
        <div className="share__top">
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
          <input
            style={{ marginLeft: "5px" }}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            placeholder={`What's up ${user?.username}`}
            className="share__input"
          />
        </div>
        <hr className="share__hr" />
        {file && (
          <div className="share__ImgPreview">
            <img
              src={URL.createObjectURL(file)}
              alt="imagePreview"
              className="shareImg"
            />
            <Cancel
              className="share__cancleImg"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="share__bottom" onSubmit={handleForm}>
          <div className="share__options">
            <label htmlFor="file" className="share__option">
              <PermMedia htmlColor="tomato" className="share__icon" />
              <span className="share__option_text">Photo or Video</span>
              <input
                id="file"
                style={{ display: "none" }}
                type="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          </div>
          <div className="share__options">
            <div className="share__option">
              <Label htmlColor="blue" className="share__icon" />
              <span className="share__option_text">Tag</span>
            </div>
          </div>
          <div className="share__options">
            <div className="share__option">
              <Room htmlColor="green" className="share__icon" />
              <span className="share__option_text">Location</span>
            </div>
          </div>
          <div className="share__options">
            <div className="share__option">
              <EmojiEmotions htmlColor="gold" className="share__icon" />
              <span className="share__option_text">Feelings</span>
            </div>
          </div>
          <button disabled={loading} className="share__btn" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
