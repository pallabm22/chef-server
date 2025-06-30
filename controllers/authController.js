const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

//register
const registerController = async (req, res) => {
    try {
        const { username, email, password, phone, address,answer } = req.body;
        //validation
        if (!username || !email || !password || !phone || !address ||!answer) {
            return res.status(500).send({
                success: false,
                message:"Please provide all fields",
            })
        }
        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.status(500).send({
                success: false,
                message:"Email is already registered, Please login"
            })
        }
        //hashing
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword =await bcrypt.hash(password, salt);
        //create user
        const user = await userModel.create({
            username,
            email,
            password:hashedPassword,
            address,
            phone,
            answer,
        })
        res.status(201).send({
            success: true,
            message: "User is successfully registered !",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:'error in register api',
            error
        })
    }
 }


//login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validate
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Email or password is not provided!",
            });
        }
        //check user
        const user = await userModel.findOne({ email: email });
        //email check
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered!",
            });
        }
        //password check
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Password is incorrect !"
            });
        }

        //token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });


        res.status(200).send({
            success: true,
            message: "user has logged in Successfully",
            token,
            user,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Login failed, error in login API",
            error,
        });
    }
 };
     
    
    
    
module.exports = { registerController, loginController };