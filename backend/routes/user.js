const express = require('express');

const router = express.Router();
const zod = require("zod");
const {Users} = require("../db")
const {Accounts} = require("../db")
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require('../middleware');

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})

router.post('/signup', async(req, res)=>{
    const bodydata = req.body;
    const isSuccessful = signupBody.safeParse(bodydata);

    if(isSuccessful){
        const existingUser = await Users.findOne({
            username: req.body.username
        })

        if(existingUser){
            return res.status(411).json({
                message: "Email already taken/Incorrect inputs"
            })
        }
        else{
            const user = await Users.create({
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
            })

            const userId = user._id;

            await Accounts.create({
                userId : userId,
                balance : Math.floor(Math.random() * 10000) + 1
            })

            const token = jwt.sign({
                userId
            },JWT_SECRET);

            res.json({
                message: "User created successfully",
                token: token
            })
        }
    }
    else{
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async(req, res) =>{
    const bodydata = req.body;

    const isValidInputs = signinBody.safeParse(bodydata);

    if(!isValidInputs){
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const isExisitingUser = await Users.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(!isExisitingUser){
        return res.status(411).json({
            message: "Error while logging in"
        })
    }

    const userId = isExisitingUser._id;

    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        token: token
    })

})

const updatedBody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

router.put("/", authMiddleware,async(req, res)=>{
    const body = req.body;

    const verifiedBody = updatedBody.safeParse(body);

    if(!verifiedBody){
        return res.status(411).json({
            message: "Error while updating information"
        })
    }

    await Users.updateOne({_id : req.userId},req.body);

    res.json({
        message: "Updated successfully"
    })
})


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    console.log(filter);

    const users = await Users.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})



module.exports = router;