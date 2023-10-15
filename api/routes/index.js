import express from 'express';
import user_routes from './user.js';
import label_routes from './label.js';
import category_routes from './category.js'
import product_routes from './product.js'
import order_routes from './order.js'
import auth_routes from '../routes/auth.js'

const app = express();

app.use('/user', user_routes);
app.use('/auth', auth_routes);  
app.use('/label', label_routes);
app.use('/category', category_routes);
app.use('/product', product_routes);
app.use('/order', order_routes);

export default app;