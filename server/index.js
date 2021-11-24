const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

const authRouter = require("./router/auth/auth");

app.use("/", authRouter);
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  responseData = {
    msg: "bye",
  };
  res.json(responseData);
});

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
