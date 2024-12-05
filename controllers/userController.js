const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register user 

const registerUser = async (req, res)=>{
   try {
    const {username, email, password} = req.body
    if(!username|| !email|| !password){
        res.status(400).json({
            message: "something is missing",
            success: false
        })
    }
    const userAvailble = await User.findOne({email})
    if(userAvailble){
        return res.status(400).json({
            message:"User already register",
            success:false
        })
    }
    // hashed password

    const hashedPassword = await bcrypt.hash(password,10);
    // console.log("hashed password- ", hashedPassword)
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    res.status(201).json(user) 

   } catch (error) {
        res.status(500).json({
            message:"internal server error",
            status:false
        })
        console.log(error)
   }
}

// login User 
const loginUser = async(req, res)=>{
    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(400).json({
                message:"incorrect email or password",
                success: false
            })
        }
        const user = await User.findOne({email});
        // compare password with hashed password
        if(user && (await bcrypt.compare(password, user.password))){
            const accessToken = jwt.sign({
                user:{
                    username :user.username,
                    email:user.email,
                    id:user.id
                }
            },process.env.SECRET_KEY,{expiresIn:"15m"})
        res.status(200).json(accessToken)
        }
        else {
            res.status(401).json({
                message:"incorrect email or password",
                success:false
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            status:false
        })
        console.log(error)
    }
}

// current User info

const currentUser = async(req, res) => {
    try {
    res.status(200).json(req.user);
    } catch (error) {
        res.status(500).json({
            message:"internal server error",
            success:false
        })
    }
};

module.exports = {registerUser, loginUser, currentUser,}