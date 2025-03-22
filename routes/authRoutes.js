const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/listusers", protect, authController.listUsers);

module.exports = router;
