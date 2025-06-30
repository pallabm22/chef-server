const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createfoodController,getallfoodController,getfoodbyIdController,getfoodbyrestaurantController, updatefoodController, deletefoodCOntroller, placeorderController, changeorderstatusController } = require('../controllers/foodController');
const adminMiddleware = require('../middlewares/adminMiddleware');


const router = express.Router();

//routes
//create food
router.post('/createfood', authMiddleware, createfoodController);


//get all food
router.get('/getallfood', getallfoodController);

//get food by id
router.get('/getfood/:id', getfoodbyIdController);

//get food by restaurant id
router.get('/getfoodbyrestaurant/:id', getfoodbyrestaurantController);

//update food by id
router.put('/updatefoodbyid/:id', authMiddleware, updatefoodController);

//delete food by id
router.delete('/deletefood/:id', authMiddleware, deletefoodCOntroller);

//place order
router.post('/placeOrder', authMiddleware, placeorderController);

//change order status
router.put('/changeorderstatus/:id', authMiddleware, adminMiddleware, changeorderstatusController);


module.exports = router;