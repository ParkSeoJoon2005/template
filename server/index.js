const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.SERVER_PORT || 8080;

//CORS 모듈 임포트
const cors = require("cors");

//커스텀 Authentication 모듈 임포트
const authRouter = require("./router/auth/auth");

app.use("/api", authRouter);

app.use(cors());

app.get("/", (req, res) => {
  responseData = {
    msg: "bye",
  };
  res.json(responseData);
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
