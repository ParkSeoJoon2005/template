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

module.exports = router;
