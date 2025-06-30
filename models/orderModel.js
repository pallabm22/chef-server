const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
    foods:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Food'
        }
    ],
    payment:
    {

    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    status: {
        type: String,
        enum: ['Order placed', 'Preparing', 'On the way', 'Delivered'],
        default:'Preparing',
    }
    
}, {
    timestamps: true
});

module.exports = mongoose.model("Orders",OrdersSchema);
