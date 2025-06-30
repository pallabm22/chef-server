const restaurantModel = require("../models/restaurantModel");

//create restaurant
const createrestautantController = async (req, res) => {
    try {
        const {
            title,
            imageURL,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoURL,
            rating,
            ratingcount,
            code,
            coords } = req.body;
        
        //validation
        if (!title || !coords) {
            return res.status(404).send({
                success: false,
                message:"Both Restaurant title and Location is mandetory"
            })
        }
        const newRestaurant = new restaurantModel({
            title,
            imageURL,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoURL,
            rating,
            ratingcount,
            code,
            coords
        });
        await  newRestaurant.save();
        res.status(200).send({
            success: true,
            message: "New Restaurant is successfully created",
            newRestaurant
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in create restaurant api",
            error
        })
    }
};
 


//get/show restaurant
// Get/show restaurant
const getrestaurantController = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find(); 
        if (!restaurants || restaurants.length === 0) {
            return res.status(404).send({
                success: false,
                message: "No restaurants found"
            });
        }
        res.status(200).send({
            success: true,
            total_restaurants: [`Total number of restaurants is :${restaurants.length}`],
            restaurants 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in get restaurant API",
            error
        });
    }
};


//get restaurant by id
const getrestaurantbyId = async (req, res) => {
    try {
        const restaurantId = req.params.id
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "Please provide restaurant id",
            })
        }
        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message:"Restaurant is not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Restaurant is found",
            restaurant
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in get restauran by id api",
            error
        })
    }
 };



//delete restaurant
const deleterestaurantController = async (req, res) => {
    try {
        const restaurant = req.params.id
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message:"Restauant not found"
            })
        }
        const restauranttodelete = await restaurantModel.findByIdAndDelete(restaurant);
        res.status(200).send({
            success: true,
            message: "Restaurant is successfully deleted",
            restauranttodelete
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in delete restaurant api",
            error
        })
    }
 };
    
    
    
    
module.exports = { createrestautantController, getrestaurantController, getrestaurantbyId, deleterestaurantController };
