import express from 'express';
import loginCheck from '../app/middleware/login.middleware.js';
import { isAdminSeller } from '../app/middleware/rbac.middleware.js';
import uploader from '../app/middleware/uploader.middleware.js';
import ProductControler from '../app/controllers/product.controller.js';
const prod_ctrl = new ProductControler();

const router = express.Router();
router.route('/')
    .get(prod_ctrl.getAllProducts)
    .post(loginCheck, isAdminSeller, uploader.array('image'), prod_ctrl.addProduct)
    
router.get('/active-product', prod_ctrl.getAllActiveProducts)
router.get('/bycat/:slug', prod_ctrl.getAllProductsByCat)
router.route('/:id')
    .get(prod_ctrl.getProductById)
    .put(loginCheck, isAdminSeller, uploader.array('image'), prod_ctrl.updateProduct)
    .delete(loginCheck, isAdminSeller, prod_ctrl.deleteProductById)

router.route('/:id/:image_name')
.delete(loginCheck, isAdminSeller, prod_ctrl.deleteImageByProductId)

export default router;