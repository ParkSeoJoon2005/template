import React, { useEffect } from "react";

import axios from "axios";

import { connect } from "react-redux";
import { setDidIpRequest } from "../redux/loginAction";

import Jumbo from "../ui/Jumbo";
import Contents from "../ui/Contents";

// 유저의 ip 정보를 가져올 수 있는 API
const publicIp = require("public-ip");

function Home(props) {
  // 메인 페이지에 접속했을 때, 유저 ip 불러오는 함수
  const getIp = async () => {
    const ip = await publicIp.v4();
    return ip;
  };

  const fetchIp = async () => {
    const ip = await getIp();
    const ipData = {
      ip: ip,
    };
    const response = await axios.post("http://localhost:8080/ipAuth", ipData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    if (response.data !== null) {
      return response;
    } else {
      return new Error("Fetch Failed!");
    }
  };

  // 메인 페이지에 접속했을 때, 유저 ip 불러오고, 이미 정보가 있으면 서버에 보내지 않음
  useEffect(() => {
    // 추후에 리덕스를 사용해, 이미 정보가 있는 경우 ( 리덕스 STATE 가 NULL 이 아닐때 ) 에는 서버에 보내지 않게 코드 작성 필요
    console.log(props);
    if (props.login.ipData === false) {
      fetchIp().then((value) => {
        console.log(`IP Request Result : ${JSON.stringify(value.data)}`);
        props.setDidIpRequest(true);
      });
    }
  }, []);

  return (
    <>
      <Contents
        elements={
          <>
            <Jumbo path={"./Images/JumboBg.jpg"} content={"Jumbo Contents"} />
            <div style={{ height: "800px", backgroundColor: "black" }}></div>
          </>
        }
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setDidIpRequest: (boolean) => {
      dispatch(setDidIpRequest(boolean));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
