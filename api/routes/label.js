import express from 'express';
const router = express.Router();
import loginCheck from '../app/middleware/login.middleware.js';
import {isAdmin} from '../app/middleware/rbac.middleware.js';
import uploader from '../app/middleware/uploader.middleware.js'
import LabelController from '../app/controllers/label.controller.js';
const label_ctrl = new LabelController();

// grouping of routes using route() method

router.route('/')
    .get(label_ctrl.getAllLabels)
    .post(loginCheck, isAdmin, uploader.single('image'), label_ctrl.store);

router.get("/active-label", label_ctrl.getAllActiveLabels);

router.route('/:id')
    .get(label_ctrl.getLabelById)
    .put(loginCheck, isAdmin, uploader.single('image'), label_ctrl.update)
    .delete(loginCheck, isAdmin, label_ctrl.delete)

export default router;
