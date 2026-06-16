

import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/product.js";

// PLACE ORDER
export const placeOrder = async (req, res) => {

    try {

        const { userId, address } = req.body;

        if (!userId || !address) {
            return res.status(400).json({
                success: false,
                message: "userId and address required"
            });
        }

        // GET CART
        const cart = await Cart.findOne({
            userId
        }).populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        // ORDER ITEMS
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            name: item.productId.title,
            price: item.productId.price,
            quantity: item.quantity
        }));

        // TOTAL
        const totalAmount = orderItems.reduce(
            (total, item) =>
                total + (item.price * item.quantity),
            0
        );

        // STOCK UPDATE
        for (let item of cart.items) {

            await Product.findByIdAndUpdate(
                item.productId._id,
                {
                    $inc: {
                        stock: -item.quantity
                    }
                }
            );
        }

        // CREATE ORDER
        const order = await Order.create({
            userId,
            items: orderItems,
            address,
            totalAmount,
            paymentMethod: "COD"
        });

        // CLEAR CART
        await Cart.findOneAndUpdate(
            { userId },
            { items: [] }
        );

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// GET ORDERS
export const getOrders = async (req, res) => {

    try {

        const orders = await Order.find()
            .populate("userId")
            .populate("items.productId");

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (req, res) => {

    try {

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order updated",
            order
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// DELETE ORDER
export const deleteOrder = async (req, res) => {

    try {

        const order = await Order.findByIdAndDelete(
            req.params.id
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


