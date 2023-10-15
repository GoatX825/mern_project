import express from 'express';
const router = express.Router();
import loginCheck from '../app/middleware/login.middleware.js';
import OrderController from '../app/controllers/order.controller.js';
const order_ctrl = new OrderController();

router.route('/')
    .get((req, res, next) => {})
    .post(loginCheck, order_ctrl.createOrder)

router.route('/:id')
    .get((req, res, next) => {})
    .put(loginCheck, (req, res, next) => {})
    .delete(loginCheck, (req, res, next) => {})

export default router;