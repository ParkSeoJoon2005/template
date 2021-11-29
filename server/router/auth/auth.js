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
  db.query(`SELECT * FROM user WHERE no='${req.body.key}'`, (err, results) => {
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
  });
});

//로그인 요청 처리
router.post("/login", (req, res) => {
  db.query(
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
});

//계정 생성 처리
router.post("/register", (req, res) => {
  console.log(req.body);
});

router.get("/test", (req, res) => {
  db.query(`SELECT * FROM USER`, (err, results) => {
    if (err) throw err;
    console.log(results);
  });
  db.end();
});

module.exports = router;
