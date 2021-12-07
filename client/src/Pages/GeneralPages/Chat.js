import React, { useState, useEffect } from "react";
import axios from "axios";

import Contents from "../../ui/Contents";

import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

import { io } from "socket.io-client";

const Chat = (props) => {
  const cookies = new Cookies();
  const cookieData = cookies.get("loginInfo");

  const history = useHistory();
  if (cookieData) {
    return <Contents elements={<ChatWrapper />} />;
  } else {
    history.push("/login");
    alert("Chat is only available when you login!");
    return null;
  }
};

const ChatWrapper = (props) => {
  const [didFetch, setDidFetch] = useState(false);
  const [rooms, setRooms] = useState([]);

  const cookies = new Cookies();
  const { userInfo, key } = cookies.get("loginInfo");

  const fetchRooms = async () => {
    const res = await axios.get("http://localhost:8080/chat");
    return res;
  };

  useEffect(() => {
    fetchRooms().then((value) => {
      console.log("/chat Data : ");
      console.log(value.data);
      setRooms(value.data);
      setDidFetch(true);
    });
  }, []);

  return (
    <>
      <div style={ChatWrapperStyle}>
        <h1>ROOMS</h1>
        {didFetch ? <Rooms data={rooms} /> : "LOADING"}
      </div>
    </>
  );
};

const ChatWrapperStyle = {
  width: "100%",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",

  alignItems: "center",
  alignContent: "center",
};

const Rooms = (props) => {
  return props.data.length === 0 ? (
    <div>NO CHAT ROOMS</div>
  ) : (
    props.data.map((value, index) => {
      return <RoomItem value={value} index={index} key={index} />;
    })
  );
};

const RoomStyle = {
  width: "80%",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",

  alignItems: "center",
  alignContent: "center",

  border: "1px solid black",
};

const RoomItem = (props) => {
  const socket = io.connect("http://localhost:8080");

  const handleRoomClick = (e, data) => {
    e.preventDefault();
    console.log(data);
    socket.emit("roomJoin", {
      data,
    });
  };

  useEffect(() => {
    socket.on("alert", (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div style={RoomStyle}>
      {props.index + 1}
      <h3 style={{ margin: 0 }}>Room Name : {props.value.R_Name}</h3>
      <h3 style={{ margin: 0 }}>Author : {props.value.Author}</h3>
      <button
        onClick={(e) => {
          handleRoomClick(e, props.value);
        }}
        style={{ margin: "10px 0px" }}>
        JOIN
      </button>
    </div>
  );
};

export default Chat;
