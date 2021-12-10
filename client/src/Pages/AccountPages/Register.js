import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import Contents from "../../ui/Contents";

const Register = () => {
  return <Contents elements={<RegisterWrapper />} />;
};

const RegisterWrapper = (props) => {
  return (
    <>
      <div style={RegisterWrapperStyle}>
        <RegisterForm />
      </div>
    </>
  );
};

const RegisterWrapperStyle = {
  height: "100%",
  width: "100%",

  display: "flex",
  justifyContent: "center",
  alignItems: "Center",
  flexDirection: "column",
};

const RegisterForm = (props) => {
  const [id, setId] = useState(undefined);
  const [passwd, setPasswd] = useState(undefined);
  const [birthDay, setBirthDay] = useState(undefined);
  const [phone, setPhone] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [name, setName] = useState(undefined);

  const [msg, setMsg] = useState(null);

  const history = useHistory();

  const fetchRegisterData = async (data) => {
    const response = await axios.post(
      `http://${process.env.PRODUCTION_URL}:8080/api/register`,
      data,
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
    return response;
  };

  const handleInputChange = (e, type) => {
    const query = `set${type}('${e.target.value}');`;
    console.log(query);
    eval(query);
    console.log(passwd, id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const birthDayReg = /^\d{4}-\d{2}-\d{2}$/;
    const emailReg =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    if (birthDayReg.test(birthDay)) {
      if (emailReg.test(email)) {
        const data = {
          id,
          password: passwd,
          birthDay,
          phone,
          email,
          name,
        };
        fetchRegisterData(data)
          .then((data) => {
            console.log(data);
            if (data.data.status) {
              alert("Creating Account Succeed!!");
              setMsg(null);
              history.push("/login");
            } else {
              setMsg(data.data.msg);
              return;
            }
          })
          .catch((err) => console.log(err));
      } else {
        alert("Invalid Email Type!");
      }
    } else {
      alert("Invalid birthday type!");
      return;
    }

    console.log(birthDayReg.test(birthDay), emailReg.test(email));
    console.log(id, passwd);
  };

  return (
    <>
      <h1>ACCOUNT REGISTER</h1>
      <form style={FormStyle} onSubmit={handleSubmit}>
        <FormInput
          type={"text"}
          value={id}
          placeHolder={"ID"}
          onChange={handleInputChange}
          usingState={"Id"}
        />
        <FormInput
          type={"password"}
          value={passwd}
          placeHolder={"PASSWORD"}
          onChange={handleInputChange}
          usingState={"Passwd"}
        />
        <FormInput
          type={"text"}
          value={birthDay}
          placeHolder={"BIRTHDAY"}
          onChange={handleInputChange}
          usingState={"BirthDay"}
        />
        <FormInput
          type={"number"}
          value={phone}
          placeHolder={"PHONE NUMBER"}
          onChange={handleInputChange}
          usingState={"Phone"}
        />
        <FormInput
          type={"email"}
          value={email}
          placeHolder={"EMAIL"}
          onChange={handleInputChange}
          usingState={"Email"}
        />
        <FormInput
          type={"text"}
          value={name}
          placeHolder={"NICKNAME"}
          onChange={handleInputChange}
          usingState={"Name"}
        />
        <br />
        <button
          type="submit"
          onClick={handleSubmit}
          style={{ width: "30%", height: "50px" }}>
          SUBMIT
        </button>
      </form>
      {msg !== null ? (
        <p style={{ color: "red", fontWeight: "bold" }}>{msg}</p>
      ) : null}
    </>
  );
};

const FormInput = (props) => {
  return (
    <input
      type={props.type}
      value={props.value}
      placeholder={props.placeHolder}
      onChange={(e) => {
        props.onChange(e, props.usingState);
      }}
      style={{
        width: "60%",
        height: "60px",
        marginTop: "10px",
        textAlign: "center",
      }}
    />
  );
};

const FormStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",

  width: "100%",
};

export default Register;
