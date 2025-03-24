const express = require("express");
const router = express.Router();
const {loginUser,registerUser,getUserInfo} = require("../controllers/authControllers");

// POST /api/auth/login
router.post("/login", loginUser);

// POST /api/auth/register
router.post("/register", registerUser);

router.get("/user", getUserInfo)
module.exports = router;
