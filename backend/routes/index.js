const express = require('express');
const router = express.Router();

const userRouter = require("../routes/user");
const accountsRouter = require("../routes/accounts");
// backend/api/index.js


router.use("/user", userRouter);
router.use("/account",accountsRouter);


module.exports = router;