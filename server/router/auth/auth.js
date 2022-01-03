const express = require("express");
const router = express();
const cors = require("cors");
const db = require("../../db");

//JSON 형상화
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//CORS 설정
router.use(cors());

//클라이언트에서 IP 받아오는데 이걸 왜 해야될지 모르겠음
router.post("/ipAuth", (req, res) => {
  console.log(req.body);
  const clientIp = req.body;
  res.json(clientIp);
});

// 유저 유효성 처리
router.post("/authUser", (req, res) => {
  const conn = db.connectDB();
  conn.query(
    `SELECT * FROM user WHERE no='${req.body.key}'`,
    (err, results) => {
      if (err) throw err;
      if (results.length === 1) {
        const authUserRes = {
          isValid: true,
        };
        console.log(
          `/authUser Request Succeed with : ${JSON.stringify(req.body)}`
        );
        res.json(authUserRes);
      } else {
        const authUserFailedRes = {
          isValid: false,
        };
        console.log(
          `/authUser Request Failed with : ${JSON.stringify(req.body)}`
        );
        res.json(authUserFailedRes);
      }
    }
  );
  db.disconnectDB(conn);
});

//로그인 요청 처리
router.post("/login", (req, res) => {
  const conn = db.connectDB();
  conn.query(
    `SELECT * FROM user WHERE id='${req.body.id}' AND pw='${req.body.password}'`,
    (err, results) => {
      if (err) throw err;
      if (results.length === 1) {
        const resLoginData = {
          userInfo: {
            name: results[0].name,
          },
          key: results[0].no,
          status: true,
        };
        console.log(
          `/login Request Succeed with : ${JSON.stringify(req.body)}`
        );
        res.json(resLoginData);
      } else {
        const resLoginFailed = {
          status: false,
        };
        console.log(`/login Request Failed with : ${JSON.stringify(req.body)}`);
        res.json(resLoginFailed);
      }
    }
  );
  db.disconnectDB(conn);
});

//계정 생성 처리
router.post("/register", (req, res) => {
  const conn = db.connectDB();
  conn.query(
    `SELECT * FROM user WHERE id='${req.body.id}' OR name='${req.body.name}'`,
    (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        const createUserFailed = {
          status: false,
          msg: "Creating User Account Failed",
        };
        res.json(createUserFailed);
      } else {
        conn.query(
          `INSERT INTO user (id,pw,birthDay,phone,email,name) VALUES ('${req.body.id}','${req.body.password}','${req.body.birthDay}','${req.body.phone}','${req.body.email}','${req.body.name}')`,
          (err, results) => {
            console.log(results);
            if (err) throw err;
            const createUserSucceed = {
              status: true,
              msg: "Creating User Account Succeed",
            };
            res.json(createUserSucceed);
          }
        );
      }
    }
  );
  db.disconnectDB(conn);
});

router.post("/accountInfo", (req, res) => {
  const conn = db.connectDB();
  conn.query(`SELECT * FROM user WHERE no=${req.body.key}`, (err, results) => {
    if (err) throw err;
    const accountInfoRes = {
      id: results[0].id,
      pw: results[0].pw,
      birthDay: results[0].birthDay,
      phone: results[0].phone,
      email: results[0].email,
      name: results[0].name,
    };
    res.json(accountInfoRes);
  });
  db.disconnectDB(conn);
});

router.post("/test", (req, res) => {
  const conn = db.connectDB();
  conn.query(`SELECT * FROM user WHERE no=${req.body.no}`, (err, results) => {
    if (err) throw err;
    console.log(results);
  });
  db.disconnectDB(conn);
});

module.exports = router;
