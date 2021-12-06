import React, { useState, useEffect } from "react";
import Contents from "../../ui/Contents";

import { io } from "socket.io-client";
const socket = io.connect("http://localhost:8080");

const Chat = (props) => {
  return <Contents elements={<ChatWrapper />} />;
};

const ChatWrapper = (props) => {
  const [chat, setChat] = useState([]);
  useEffect(() => {
    console.log(socket);
    socket.emit("hi", { msg: "hi" });
  }, []);

  return (
    <>
      <div>{}</div>
    </>
  );
};

export default Chat;
