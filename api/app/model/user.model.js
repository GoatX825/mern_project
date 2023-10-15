import mongoose from "mongoose";
const LocationSchema = new mongoose.Schema({
    location: {
        type: String
    }
})
const UserSchemaDef = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    role: {
         type: String,
         required: true,
         enum : ['admin', 'seller', 'customer', 'user', 'vendor'],
         default: 'user'
    },
    image: {
        type: String,
        default: null
    },

    address: {
        billing: {
            location: LocationSchema
        },
        shipping: {
            location: LocationSchema
        }
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const UserModel = new mongoose.model('User', UserSchemaDef)
export default UserModel;

