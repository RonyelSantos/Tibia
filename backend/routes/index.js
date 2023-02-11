const express = require("express");
const router = express.Router();
const tibia_scrap = require("../controller/tibia");

// Home Page
// router.get("/", (_, res) => {
//   res.json({ success: "Bem vindo" });
// });

router.post("/tibia_scrap", async (req, res) => {
  const { character } = req.body;

  let result = await tibia_scrap(character);

  if (result.statuscode) {
    res.status(result.statuscode).json(result.message)
  } else {
    res.status(result.statuscode).json(result.message)
  }
  
});

// Catch All
// router.get("*", (req, res) => {
//   const healthcheck = {
//     uptime: process.uptime(),
//     message: 'OK',
//     timestamp: Date.now(),
//     service: process.env.SERVICE
//   };
//   try {
//     res.send(healthcheck);
//   } catch (error) {
//     healthcheck.message = error;
//     res.status(503).send();
//   }
// });

module.exports = router;
