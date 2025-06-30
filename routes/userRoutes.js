const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getuserController,updateUserController, resetpasswordController ,updatepasswordController,deleteuserController } = require('../controllers/userController,');


const router = express.Router();

//routes
//get user || get
router.get('/getuser', authMiddleware, getuserController);

//update user || put
router.put('/updateUser', authMiddleware, updateUserController)

//reset passwerd || put
router.put('/resetpassword', authMiddleware, resetpasswordController);

//update password || put
router.put('/updatepassword',authMiddleware,updatepasswordController)

//delete user || delete
router.delete('/deleteuser/:id',authMiddleware,deleteuserController)

module.exports = router;