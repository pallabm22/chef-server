const userModel=require("../models/userModel")

const adminMiddleware = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.userId);
        if (user.usertype != "admin") {
            return res.status(500).send({
                success: false,
                message:"Only admin access"
            })
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        console.log(req);
        res.status(500).send({
            success: false,
            message: "Authentication failed",
            error
        })
    }
}

module.exports = adminMiddleware;