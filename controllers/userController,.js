const bcrypt = require("bcryptjs");
//get user info

const userModel = require("../models/userModel");

const getuserController = async (req, res) => {
    // res.status(200).send("User data");
    // console.log("Req:", req.body.id);


    try {
        //find user
        const user = await userModel.findById({ _id:req.userId })
        //validate user
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        user.password = undefined;
        return res.status(200).send({
            success: true,
            message: "User is authorized.",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message:"Internal server error"
        })
    }
 };



//update user info
const updateUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({ _id: req.userId });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
                error
            })
        }
        const { username, address, phone } = req.body;
        if (username) user.username = username;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        await user.save();
        res.status(200).send({
            success: true,
            message: "User details has successfully updated",
            user
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Update api is not working",
            error
        })
    }
 };




//Reset Password
const resetpasswordController = async (req, res) => {
    try {
        const { email, newpassword, answer } = req.body;
        if (!email || !newpassword || !answer) {
            return res.status(500).send({
                success: false,
                message:"All fields are required",
            })
        }
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(404).send({
                success: false,
                message:" User not found",
            })
        }
        //hashing
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message:"Password reset is successful"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in resetpassword api",
            error
        })
    }
 };




//Update password
const updatepasswordController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({ _id: req.userId });
        //validate
        if (!user) {
            return res.status(404).send({
                success: false,
                message:"User not found",
            })
        }
        const { password, newpassword } = req.body;
        if (!password || !newpassword) {
            return res.status(500).send({
                success: false,
                message:"Please provide both old and new password",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message:"Password is invalid"
            })
        }

        //hashing
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newpassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "User password is updated",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in update password api",
            error
        })
    }
 }; 


//delete user account
const deleteuserController = async (req, res) => {
    try {
        const user = await userModel.findByIdAndDelete(req.params.id);
        res.status(200).send({
            success: true,
            message: "User account has been deleted",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in delete user api",
            error
        })
    }
 };
 
module.exports = {
    getuserController,
    updateUserController,
    resetpasswordController,
    updatepasswordController,
    deleteuserController,
};