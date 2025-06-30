const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true,"Food title is required"],
    },
    description: {
        type: String,
        required:[true,'Food description is required'],
    },
    foodPrice: {
        type: Number,
        required:[true,"Food price is required"],
    },
    foodimageURL: {
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQMXX9h-LUF6_Gbf8mO2RaT-PKgE3W1mx2eQ&s",
    },
    foodtags: {
        type:String,
    },
    category: {
        type: String,
        
    },
    code: {
        type:String,
    },
    isAvailable: {
        type: Boolean,
        default:true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'resturant',
    },
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max:5,
    },
    ratingCount: {
        type: String,
        
    }

    
}, {
    timestamps: true
});

module.exports = mongoose.model("Food",FoodSchema);
