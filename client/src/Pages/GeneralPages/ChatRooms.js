import React, { useState, useEffect } from "react";
import axios from "axios";

import Contents from "../../ui/Contents";

import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

import Modal from "@material-ui/core/Modal";

import { IconContext } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";

const ChatRooms = (props) => {
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
  const [modalOpen, setModalOpen] = useState(false);
  const [roomName, setRoomName] = useState("");

  const cookies = new Cookies();
  const { userInfo, key } = cookies.get("loginInfo");

  const history = useHistory();

  const fetchRooms = async () => {
    const res = await axios.get(`${process.env.REACT_APP_TEST_URL}/chat`);
    return res;
  };

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    fetchRooms().then((value) => {
      console.log("/chat Data : ");
      console.log(value.data);
      setRooms(value.data);
      setDidFetch(true);
    });
  }, []);

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleRoomCreateSubmit = (e) => {
    e.preventDefault();
    const data = {
      R_Name: roomName,
      Author: userInfo.name,
      ChatLog: [],
    };
    axios
      .post(`${process.env.REACT_APP_TEST_URL}/chat/create`, data, {
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((data) => {
        if (data.status) {
          console.log(data);
          setModalOpen(false);
          // refreshRooms();
        } else {
          alert(data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div style={ChatWrapperStyle}>
        <div style={{ width: "80%", textAlign: "center" }}>
          <IconContext.Provider value={{ color: "blue", size: "2em" }}>
            <AiOutlinePlus
              style={{ float: "right" }}
              onClick={handleModalOpen}
            />
          </IconContext.Provider>

          <Modal
            open={modalOpen}
            onClose={handleModalOpen}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={ModalWrapperStyle}>
              <h1>CREATE ROOM</h1>
              <form onSubmit={handleRoomCreateSubmit} style={null}>
                <input
                  type="text"
                  placeholder="ENTER YOUR ROOM NAME!"
                  style={{ width: "50%", height: "10%", fontSize: "20px" }}
                  onChange={handleRoomNameChange}
                  value={roomName}
                />
                <button type="submit" style={{ width: "50px", height: "30px" }}>
                  START!
                </button>
              </form>
            </div>
          </Modal>
          <h1>ROOMS</h1>
        </div>
        {didFetch ? <Rooms data={rooms} /> : "LOADING"}
      </div>
    </>
  );
};

const ModalWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  textAlign: "center",

  backgroundColor: "white",

  width: "80%",
  height: "80%",
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

const RoomItem = (props) => {
  const history = useHistory();

  const handleRoomClick = (e, data) => {
    e.preventDefault();
    history.push("/chatRoom", {
      data,
    });
  };

  return (
    <div style={RoomStyle(props.index)}>
      {props.index + 1}
      <h3 style={{ margin: 0 }}>{props.value.R_Name}</h3>
      <h3 style={{ margin: 0 }}>Author : {props.value.Author}</h3>
      <button
        onClick={(e) => {
          handleRoomClick(e, props.value);
        }}
        style={{ margin: "10px 0px" }}
      >
        JOIN
      </button>
    </div>
  );
};

const RoomStyle = (index) => {
  return {
    width: "80%",
    height: "100%",

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",

    alignItems: "center",
    alignContent: "center",

    border: "1px solid black",
    borderBottom: index === 0 ? "none" : "1px solid black",
  };
};

export default ChatRooms;
