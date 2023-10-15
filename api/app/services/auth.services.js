import UserModel from "../model/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import CONFIG from "../../config/constants.js";

class AuthService{
    generateJWTTOKEN = (payload) => {
        let token = jwt.sign(payload, CONFIG.JWT_SECRET);
        return token;
        
    }

    login =  async (username, password) => {
        try{
            let user = await UserModel.findOne({
            email: username
            
        })  
            if(!user){
                throw {status: 400, msg: "User does not exist"}
            }else{ 
                if(bcrypt.compareSync(password, user.password)){
                    // token
                    let response = {
                        user: user,
                        token: this.generateJWTTOKEN({
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        })
                    }
                    return response;
                }else{
                    
                    throw { status: 400, msg: 'Login Credentials do not match'}
                }
            }
        }catch(e){
            console.log(e);
            throw { status: 400, msg: e.msg}
        }
            
    }
}

export default AuthService;