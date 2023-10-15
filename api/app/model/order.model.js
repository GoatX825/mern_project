import mongoose from "mongoose";
const OrderSchemaDef = new mongoose.Schema({
    order_id: {
        type: String,
        required: true
    },

    order_by: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },

    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true
    },

    qty: {
        type: Number,
        required: true,
        min: 1
    }, 

    sub_amount: {
        type: Number,
        required: true,
        min: 1
    },

    discount: {
        type: Number,
        default: 0
    },

    total_amount: {
        type: Number,
        required: true,
        min: 1
    }, 

    // tracking the product
    status: {
        type: String,
        enum: ['new', 'verified', 'cancelled', 'deleivered'],
        default: 'new'
    },

    note: {
        type: String,
        
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const OrderModel = mongoose.model('Order', OrderSchemaDef);

export default OrderModel;