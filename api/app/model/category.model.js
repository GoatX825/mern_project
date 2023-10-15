import mongoose from "mongoose";
const CategorySchemaDef = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    slug: { 
        type: String,           // Smart Phones => http://domain/category/smart-phones
        required: true, 
        unique: true
    },

    parent: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },

    image: {
        type: String
    },

    status: {
        type: String,
        enum: ['active', 'inactive']
    },

    brand: [{
        type: mongoose.Types.ObjectId,
        ref: "Label"
    }]
}, {
    timestamps: true,
    autoIndex: true,
    autoCreate: true
});
const CategoryModel = mongoose.model('Category', CategorySchemaDef);
export default CategoryModel;
