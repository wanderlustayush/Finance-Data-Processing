const express = require("express");
const router = express.Router();
const { getSummary, getCategoryBreakdown, getMonthlyTrends, getRecentActivity } = require("../controllers/dashboard.controllers");
const isAuth = require("../middlewares/isAuth");
const allowRoles = require("../middlewares/isAdmin");

router.get("/summary", isAuth, allowRoles("analyst"), getSummary);
router.get("/categories", isAuth, allowRoles("analyst"), getCategoryBreakdown);
router.get("/trends", isAuth, allowRoles("analyst"), getMonthlyTrends);
router.get("/recent", isAuth, allowRoles("analyst"), getRecentActivity);

module.exports = router;