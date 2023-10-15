import mongoose from "mongoose";
const ProductSchemaDef = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },

    summary: {
        type: String,
        index: true
    },

    description: {
        type: String,
        index: true
    },

    category: [{
        type: mongoose.Types.ObjectId,
        ref: "Category",
        required: true
    }],

    price: {
        type: Number,  
        required: true,
        min: 1
    }, 

    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },

    after_discount: {
        type: Number,
        required: true,
        min: 1
    },

    // foreign relation with Label Model
    brand: {
        type: mongoose.Types.ObjectId,
        ref: "Label",
        default: null
    },

    is_featured: {
        type: Boolean,
        default: false
    },

    // foreign table
    seller:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        default: null
     },

    images: [String],

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "inactive"
    },

    meta: {
        type: String,
        default: null
    }

}, {
    timeseries: true,
    autoCreate: true,
    autoIndex: true
});

const ProudctModel = mongoose.model('Product', ProductSchemaDef);

export default ProudctModel;

/**First ma Category Created then after Product will be assigned to that category 
 * search garnu parne field(db ma search garnu  paryo vane and to make search operation very fast
 * make => (index: true)
 */