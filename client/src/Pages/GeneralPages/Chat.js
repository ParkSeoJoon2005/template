import React, { useState, useEffect } from "react";
import Contents from "../../ui/Contents";

import { useLocation, useHistory } from "react-router-dom";

import Cookies from "universal-cookie";

import { io } from "socket.io-client";
const socket = io("http://localhost:8080");

function Chat() {
  const cookies = new Cookies();
  const cookieData = cookies.get("loginInfo");

  const history = useHistory();
  if (cookieData) {
    return <Contents elements={<ChatRoomWrapper />} />;
  } else {
    history.push("/login");
    alert("Chat is only available when you login!");
    return null;
  }
}

const ChatRoomWrapper = (props) => {
  const [chats, setChats] = useState([]);

  const [text, setText] = useState("");

  const location = useLocation();
  const data = location.state.data;

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send", {
      data,
      text,
    });
  };

  useEffect(() => {
    socket.emit("roomJoin", {
      data,
    });
  }, []);

  useEffect(() => {
    socket.on("recieve", (data) => {
      setChats([...chats, data.text]);
    });

    console.log(chats);
  });
  return (
    <div style={ChatRoomWrapperStyle}>
      <form onSubmit={handleSubmit}>
        <h1>{data.R_Name}</h1>
        <h3 style={{ margin: 0 }}>Author : {data.Author}</h3>
        <div>{chats}</div>
        <input type="text" onChange={handleInputChange}></input>
        <button type="submit">SEND</button>
      </form>
    </div>
  );
};

const ChatRoomWrapperStyle = {
  width: "100%",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
};

export default Chat;
