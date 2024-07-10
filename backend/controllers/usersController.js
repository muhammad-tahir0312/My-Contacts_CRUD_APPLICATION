const asyncHandler = require("express-async-handler");
const UserModels = require("../modals/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//register
const register = asyncHandler( async (req,res) =>{
    const {username,email,password} = req.body;   

    if(!username || !email || !password){
        res.status(400);
        throw new Error("All Fields are Manditory");
    }

    const useravailable = await UserModels.findOne({email});
    if(useravailable){
        res.status(400);
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserModels.create({name:username, email:email, password:hashedPassword});
    if(!newUser){
        res.status(500);
        throw new Error("Failed to register user");
    }else{
        res.status(200).json({id:newUser.id, email:newUser.email});
    }
})

//login
const login = asyncHandler( async (req,res) =>{
    const {email, password} = req.body;
    
    if(!email ||!password){
        res.status(400);
        throw new Error("Email and Password are required");
    }
    const user = await UserModels.findOne({email});
    if(!user){
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        res.status(401);
        throw new Error("Invalid Email or Password");
    }

    const payload = {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    };

    const token = jwt.sign(payload, "I am Tahir", {expiresIn: '1d'});
    res.json({username: user.name, token: token})
})

//current
const current = asyncHandler( async (req,res) =>{   
    res.json(req.user);
})

module.exports ={register, login, current}