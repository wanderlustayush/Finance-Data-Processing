const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/user.controllers");
const isAuth = require("../middlewares/isAuth");
const allowRoles = require("../middlewares/isAdmin");

router.get("/", isAuth, allowRoles("admin"), getAllUsers);
router.get("/:id", isAuth, allowRoles("admin"), getUserById);
router.post("/", isAuth, allowRoles("admin"), createUser);
router.patch("/:id", isAuth, allowRoles("admin"), updateUser);
router.delete("/:id", isAuth, allowRoles("admin"), deleteUser);

module.exports = router;
