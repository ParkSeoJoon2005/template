import React, { useState, useEffect } from "react";
import Contents from "../../ui/Contents";

import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

import { io } from "socket.io-client";

const Chat = (props) => {
  const cookies = new Cookies();
  const cookieData = cookies.get("loginInfo");

  const history = useHistory();
  if (cookieData) {
    return <ChatWrapper />;
  } else {
    history.push("/login");
    alert("Chat is only available when you login!");
    return null;
  }
};

const ChatWrapper = (props) => {
  const [chat, setChat] = useState([]);
  const cookies = new Cookies();
  const { userInfo, key } = cookies.get("loginInfo");

  useEffect(() => {
    const socket = io.connect("http://localhost:8080");

    socket.emit("roomJoin", {});
  }, []);

  return (
    <>
      <div>{}</div>
    </>
  );
};

export default Chat;
