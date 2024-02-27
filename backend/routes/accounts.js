
const express = require('express');
const mongoose = require("mongoose");
const router = express.Router();
const zod = require("zod");
const {Users} = require("../db")
const {Accounts} = require("../db")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require('../middleware');


console.log("in acc")

router.get("/balance", authMiddleware, async(req, res)=>{
    console.log(req.userId);
    const account = await Accounts.findOne({
        userId : req.userId
    });

    res.status(200).json({
        balance : account.balance,
    })
});


router.post("/transfer", authMiddleware, async(req, res)=>{
    const session = await mongoose.startSession();

    session.startTransaction();

    const {to ,amount} = req.body;

    const account = await Accounts.findOne({ userId: req.userId }).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Accounts.findOne({ userId: to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Invalid account"
        });
    }

    await Accounts.updateOne({userId: req.userId},{$inc : {balance : -amount }}).session(session);
    await Accounts.updateOne({userId: toAccount.userId},{$inc : {balance : amount }}).session(session);


    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });


});

module.exports = router;
