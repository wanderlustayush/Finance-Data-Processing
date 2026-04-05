const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/auth.controllers");
const isAuth = require("../middlewares/isAuth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", isAuth, getMe);

module.exports = router;