const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

//create food
const createfoodController = async (req, res) => {
    try {
        const {
            title,
            description,
            foodPrice,
            foodimageURL,
            foodtags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount,
        } = req.body;
        if (!title || !description || !foodPrice || !restaurant) {
            return res.status(404).send({
                success: false,
                message:"Please provide all essential informations"
            })
        }
        const newfood = await foodModel({
            title,
            description,
            foodPrice,
            foodimageURL,
            foodtags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount
        });
        newfood.save();
        res.status(200).send({
            success: true,
            message: "Food item is successfully created",
            newfood
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in create food api",
            error
        })
    }
 };
    

//get all food
const getallfoodController = async (req, res) => {
    try {
        const foods = await foodModel.find();
        if (!foods) {
            return res.status(404).send({
                success: false,
                message:"No foods are found",
            })
        }
        return res.status(200).send({
            success: true,
            message: "Foods are fetched successfully",
            totalFoods: foods.length,
            foods
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in getallfood api",
            error
        })
    }
};
 
//get food by id
const getfoodbyIdController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message:"Please provide food id to search"
            })
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message:"Food is not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Food item is found",
            food
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in get food by id",
            error
        })
    }
 };



//get food by restaurant id
const getfoodbyrestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message:"Please provide restaurant id to find food"
            })
        }
        const foods = await foodModel.find({ restaurant: restaurantId });
        if (!foods) {
            return res.status(404).send({
                success: false,
                message:"No food is found"
            })
        }
        res.status(200).send({
            success: true,
            message: "Foods are found",
            foodCount: foods.length,
            foods
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in get food by restaurant api",
            error
        })
    }
 };


//update food by id
const updatefoodController = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message: "Food id is not provided"
            });
        }
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: `Food is not found with food id ${foodId}`,
            })
        }
        const {
            title,
            description,
            foodPrice,
            foodimageURL,
            foodtags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount,
        } = req.body;
        //update
        if (title)
            food.title = title;
        if(description)
            food.description = description;
        if (foodPrice)
            food.foodPrice = foodPrice;
        if (foodimageURL)
            food.foodimageURL = foodimageURL;
        if (foodtags)
            food.foodtags = foodtags;
        if (category)
            food.category = category;
        if (code)
            food.code = code;
        if (isAvailable)
            food.isAvailable = isAvailable;
        if (restaurant)
            food.restaurant = restaurant;
        if (rating)
            food.rating = rating;
        if (ratingCount)
            food.ratingCount = ratingCount;
        
        
        await food.save();

        res.status(200).send({
            success: true,
            message: "Food item has been successfully updated",
            food
        })
   

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in update food api",
            error
        })
    }
 };


//delete food by id
const deletefoodCOntroller = async (req, res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(404).send({
                success: false,
                message:"Please provide food id"
            })
        }
        const food = await foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success: true,
            message: "Food item is deleted successfully",
            food
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in delete food api",
            ReferenceError
        })
        
    }
};

//Place order
const placeorderController = async (req, res) => {
    try {
        const { cart } = req.body;
        if (!cart) {
            return res.status(500).send({
                success: false,
                message:"Please add food to cart and select payment method",
            })
        }
        //Total bill
        let total = 0;
        cart.map((i) => {
            total += i.foodPrice;
        })
        const newOrder = new orderModel({
            foods: cart,
            payment: total,
            buyer:req.userId
        })
        await newOrder.save();
        res.status(200).send({
            success: true,
            message: "Order is placed",
            newOrder
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in place order api",
            error
        })
    }
};

//change order status
const changeorderstatusController = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(404).send({
                success: false,
                message:"OrderId is not provided"
            })
        }
        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, { status: status }, { new: true });
        order.save();
        res.status(200).send({
            success: true,
            message: "Order status has been successfully updated",
            order
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Problem in change order status api",
            error,
        })
    }
 };
module.exports = {createfoodController,getallfoodController,getfoodbyIdController,getfoodbyrestaurantController,updatefoodController,deletefoodCOntroller,placeorderController,changeorderstatusController};

