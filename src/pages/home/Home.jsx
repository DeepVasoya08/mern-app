import React from "react";
import Nav from "../../components/navbar/Nav";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="home">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;
