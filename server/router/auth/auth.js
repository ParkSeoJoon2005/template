const express = require("express");
const router = express();
const cors = require("cors");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.use(cors());

router.post("/ipAuth", (req, res) => {
  console.log(req.body);
  const clientIp = req.body;
  res.json(clientIp);
});

router.post("/api/login", (req, res) => {
  console.log(req.body);
  if (req.body.id === "admin" && req.body.password === "1234") {
    const resUserData = {
      userInfo: {
        name: "admin",
      },
      key: 1000,
      status: true,
    };
    res.json(resUserData);
  } else {
    const resFailed = {
      status: false,
    };
    res.json(resFailed);
  }
});

// router.post('/api/authUser',(req,res)=>{
//     if(req.body.ip )
// })

module.exports = router;
