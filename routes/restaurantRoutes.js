const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createrestautantController, getrestaurantController,getrestaurantbyId,deleterestaurantController } = require('../controllers/restaurantController');


const router = express.Router();

//routes
//create restaurant || post
router.post('/create', authMiddleware, createrestautantController);

//get all restaurants || get
router.get('/getallrestaurents', authMiddleware, getrestaurantController)

//get restaurant by id || get
router.get('/getrestaurant/:id', authMiddleware, getrestaurantbyId)

//delete restaurant by id || delete
router.delete('/deleterestaurant/:id', authMiddleware, deleterestaurantController);


module.exports = router;