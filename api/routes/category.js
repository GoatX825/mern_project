import express from 'express';
const router = express.Router();
import loginCheck from '../app/middleware/login.middleware.js';
import {isAdmin} from '../app/middleware/rbac.middleware.js';
import uploader from '../app/middleware/uploader.middleware.js';
import CategoryController from '../app/controllers/category.controller.js';
const cat_ctrl = new CategoryController();

router.route('/')
    .get(cat_ctrl.getAllCats)
    .post(loginCheck, isAdmin, uploader.single('image'), cat_ctrl.createCategory);

router.route('/:id')
    .get(cat_ctrl.getCategoryDetail)    
    .put(loginCheck, isAdmin, uploader.single('image'), cat_ctrl.updateCategory)    
    .delete(loginCheck, isAdmin, cat_ctrl.deleteCategoryById);    

export default router;