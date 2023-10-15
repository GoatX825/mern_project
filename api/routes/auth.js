import express from 'express';
import UserController from '../app/controllers/user.controller.js';
const router = express.Router();
import loginCheck from '../app/middleware/login.middleware.js'
const user_ctrl = new UserController();     // user_ctrl object
// console.log(user_ctrl);

router.route('/login')
    .post(user_ctrl.userLogin);  

router.route('/me')
    .get(loginCheck, user_ctrl.myProfile);

export default router;