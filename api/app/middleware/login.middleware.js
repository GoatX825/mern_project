import jwt from 'jsonwebtoken';
import CONFIG from '../../config/constants.js';
import UserService from '../services/user.services.js';

let user_svc = new UserService();

// custom middleware: defined by user 
const loginCheck = async (req, res, next) => {
    // login
    let token = null;
    // console.log(req.headers);
    if(req.headers['authorization']) {
        token = req.headers['authorization'];       // token = req.headers.authorization
    }else if(req.headers['x-xsrf-token']) {
        token = req.headers['x-xsrf-token'];
    } else if(req.query['token']){
        token = req.query['token'];
    }
    
    if(!token) {
        next({
            status_code: 401,
            msg: 'Unauthorized access'
        })
    }else{

        token = token.split(' ');
        token = token[token.length -1];

        if(!token){
            next({
                status_code: 401,
                msg: "token not found"
            })
        }else{
            let data = jwt.verify(token, CONFIG.JWT_SECRET)
            // console.log(data);
            if(!data){
                next({
                    status: 401,
                    msg: "unknown data"
                })
            } else{
                try{
                    let user = await user_svc.getUserById(data.id);
                    // console.log(user);
                    if(user){
                        req.auth_user = user;
                        next();
                    }else{
                        next({
                            status_code: 401,
                            msg: "Invalid Token Data"
                        })
                    }

                }catch(error){
                    next({
                        status_code: 400,
                        msg: error
                    })
                }

            }
        }
    }
}

export default loginCheck;