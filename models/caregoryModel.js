const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true,"Category title is required"],
    },
    imageURL: {
        type: String,
        default: "https://img.freepik.com/premium-vector/good-food-logo-design_79169-10.jpg?semt=ais_hybrid&w=740"
    },
    new: {
        type: Boolean,
        default:false
    },
    
}, {
    timestamps: true
});

module.exports = mongoose.model("Category",CategorySchema);
