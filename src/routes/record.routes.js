const express = require("express");
const router = express.Router();
const { getAllRecords, getRecordById, createRecord, updateRecord, deleteRecord } = require("../controllers/record.controllers");
const isAuth = require("../middlewares/isAuth");
const allowRoles = require("../middlewares/isAdmin");

router.get("/", isAuth, allowRoles("viewer"), getAllRecords);
router.get("/:id", isAuth, allowRoles("viewer"), getRecordById);
router.post("/", isAuth, allowRoles("admin"), createRecord);
router.patch("/:id", isAuth, allowRoles("admin"), updateRecord);
router.delete("/:id", isAuth, allowRoles("admin"), deleteRecord);

module.exports = router;