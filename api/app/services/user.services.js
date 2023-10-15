import UserModel from "../model/user.model.js";
import bcrypt, { hashSync } from 'bcrypt';

class UserService{
    validateRegister = (data, is_edit=false) => {
        let error_msgs = {};  

        if(!data.name){
            error_msgs.name = "Name field is required"
        }

       if(!is_edit){
            if(!data.email){
                error_msgs.email = "Email field is required"
            }

            if(!data.password){
            error_msgs.password = "Password field is required"
        }
       }
        if(!data.role){
            error_msgs.role = "Role field is required"
        }
        
        return error_msgs;
    }

    userRegister = async (data) => {
        // console.log(data);
        try{
            data['password'] = hashSync(data['password'], 10)
            let user = new UserModel(data);
            return user.save();
        }catch(err){
            throw err
        }
    }

    getAllUsers = () => {
        return UserModel.find()
    }

    getUserById =  (user_id) =>{
        try{
            return UserModel.findById(user_id);
        }catch(err){
            throw err
        }
    }

    updateUserById = async (data, id) => {
        try{
            return await UserModel.findByIdAndUpdate(id, {
                $set: data
            })
        }catch(err){
            throw err;
        }
    }

    deleteUserById = async (id) => {
        try{
            return await UserModel.findByIdAndDelete(id);
        }catch(error){
            throw error;
        }
    }
}

export default UserService;