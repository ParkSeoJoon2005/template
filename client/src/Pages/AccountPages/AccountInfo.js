import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Contents from "../../ui/Contents";
require("dotenv").config();

const AccountInfo = () => {
  return <Contents elements={<AccountInfoWrapper />} />;
};

const AccountInfoWrapper = () => {
  const [accountData, setAccountData] = useState(undefined);

  const cookies = new Cookies();

  const fetchAccountInfo = async (data) => {
    const response = await axios.post(
      `http://15.165.86.96:8080/api/accountInfo`,
      data,
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
    return response;
  };
  useEffect(() => {
    const cookieData = cookies.get("loginInfo");
    const requestData = {
      key: cookieData.key,
    };
    fetchAccountInfo(requestData)
      .then((res) => {
        setAccountData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return accountData ? JSON.stringify(accountData) : <div>LOADING</div>;
};

export default AccountInfo;
