
const mongoose = require("mongoose");
const { Schema } = require("zod");

mongoose.connect('mongodb+srv://dileepkumar1228:DSdkhT5YKOLfcOe9@cluster0.wtemzz7.mongodb.net/paytmDB');

const UsersSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName : {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }, 
    password : {
        type: String,
        required: true,
        minLength: 6
    }
});

const Users = mongoose.model("Users", UsersSchema);

const AccountSchema = new mongoose.Schema({
    userId: {
       type: mongoose.Schema.Types.ObjectId,
       ref : Users,
       required : true
    },
	balance: {
        type: Number,
        required : true
    }
})


const Accounts = mongoose.model("Accounts", AccountSchema);

module.exports = {
    Users,
    Accounts
};