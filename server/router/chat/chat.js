const express = require("express");
const router = express();
const cors = require("cors");
const db = require("../../db");

//JSON 형상화
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

//CORS 설정
router.use(cors());

router.get("/", (req, res) => {
  db.query(`SELECT * FROM chat`, (err, results) => {
    if (err) throw err;
    results.length !== 0 ? res.json(results) : res.json([]);
  });
});

router.post("/create", (req, res) => {
  const data = req.body;
  db.query(
    `INSERT INTO chat(R_Name,Author,ChatLog) VALUES("${data.R_Name}","${data.Author}","${data.ChatLog}");`,
    (err, results) => {
      if (err) throw err;
      const response = {
        status: true,
        msg: "Hurry! Go Chat!",
        roomNum: results.insertId,
      };
      res.json(response);
    }
  );
});

module.exports = router;
