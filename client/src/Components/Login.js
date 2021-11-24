import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

import { connect } from "react-redux";

import Contents from "../ui/Contents";

import { setLoginData, setLogin } from "../redux/loginAction";

function Login(props) {
  useEffect(() => {
    console.log(props);
  }, []);
  return (
    <>
      <Contents elements={<LoginWrapper />} />
    </>
  );
}

function LoginWrapper() {
  return (
    <div style={LoginWrapperStyle}>
      <LoginTitle />
      <ConnectedLoginForm />
    </div>
  );
}

const LoginWrapperStyle = {
  height: "100%",
  width: "100%",

  display: "flex",
  justifyContent: "center",
  alignItems: "Center",
  flexDirection: "column",
};

function LoginTitle() {
  const history = useHistory();

  const handleLogoClick = () => {
    history.push("/");
  };
  return (
    <h1
      style={{
        fontSize: "500%",
      }}
      onClick={handleLogoClick}
      onMouseOver={(e) => {
        e.target.style.cursor = "pointer";
      }}>
      LOGO
    </h1>
  );
}

function LoginForm(props) {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");

  const history = useHistory();
  const cookies = new Cookies();

  const fetchLogin = async (loginData) => {
    const response = await axios.post(
      "http://localhost:8080/api/login",
      loginData,
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
    return response;
  };

  // 추후, Fetch 로 로그인 처리 로직 작성 필요
  const handleLoginFormSubmit = (e) => {
    e.preventDefault();
    console.log(`ID : ${id} && PassWd : ${passwd}`);
    const loginData = {
      id: id,
      password: passwd,
    };
    fetchLogin(loginData)
      .then((value) => {
        if (value.data.status) {
          const cookieData = {
            userInfo: value.data.userInfo,
            key: value.data.key,
          };
          cookies.set("loginInfo", JSON.stringify(cookieData), { path: "/" });
          console.log(cookieData);
          props.setIsLogin(true);
          props.setLoginData(value.data);
          console.log(
            `Login Succeed with Login Status : ${loginData.id} & ${loginData.password}`
          );
          history.push("/");
        } else { 
          console.log(value);
          setId("");
          setPasswd("");
          alert("Login Failed");
        }
      })
      .catch(console.log);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePwChange = (e) => {
    setPasswd(e.target.value);
  };
  return (
    <div style={LoginFormDivStyle}>
      <form onSubmit={handleLoginFormSubmit} style={LoginFormStyle}>
        <input
          type="text"
          style={inputStyle}
          placeholder="아이디"
          onChange={handleIdChange}
          value={id}
        />

        <input
          type="password"
          style={inputStyle}
          placeholder="비밀번호"
          onChange={handlePwChange}
          value={passwd}
        />
        <button type="submit" style={inputStyle}>
          LOGIN
        </button>
        <div style={(inputStyle, { display: "space-between" })}>
          <span
            style={{ marginRight: "10px" }}
            onClick={(e) => {
              history.push("/register");
            }}>
            회원가입
          </span>
          <span
            style={{ marginRight: "10px" }}
            onClick={(e) => {
              history.push("/accountSearch");
            }}>
            아이디/비밀번호 찾기
          </span>
        </div>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsLogin: (bool) => dispatch(setLogin(bool)),
    setLoginData: (data) => dispatch(setLoginData(data)),
  };
};

const ConnectedLoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

const LoginFormDivStyle = {
  width: "80%",
  height: "80%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const LoginFormStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  width: "60%",
};

const inputStyle = {
  width: "80%",
  height: "60px",

  marginTop: "10px",

  textAlign: "center",
};

export default Login;
