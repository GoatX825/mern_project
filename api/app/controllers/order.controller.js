import generateRandomString from "../../config/helpers.js";
import OrderModel from "../model/order.model.js";

class OrderController{
    createOrder = async (req, res, next) => {
        let cart = req.body;
        let order_id = generateRandomString(10);
        let all_orders = [];
        cart.map((item) => {
            let cart_ind = {
                order_id: order_id,
            
                order_by: req.auth_user._id,
            
                product: item.product_id,
            
                qty: item.qty, 
            
                sub_amount: item.total_amount,
            
                discount: 0,
            
                total_amount: (item.total_amount), 
            
                status: "new"
            }

            all_orders.push(cart_ind);
        })

        let result = await OrderModel.insertMany(all_orders)
        res.json({
            result: all_orders,
            status: true,
            msg: "Your order has been placed successfully"
        })
    }
}

export default OrderController;