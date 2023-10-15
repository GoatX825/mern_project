import express from 'express';
import loginCheck from '../app/middleware/login.middleware.js';
import UserController from '../app/controllers/user.controller.js';
import uploader from '../app/middleware/uploader.middleware.js';
const router = express.Router();
const user_ctrl = new UserController();     // user_ctrl object
// console.log(user_ctrl);

router.route('/')
    .get(uploader.none(), user_ctrl.listAllUsers)
    .post(uploader.single('image'),user_ctrl.userRegister);  

router.route('/:id')
    .get(user_ctrl.getUserById)
    .put(loginCheck, uploader.single('image'), user_ctrl.updateUserById)
    .delete(loginCheck, user_ctrl.deleteUserById)

export default router;