// import Order from "../models/Order.js";
// import Cart from "../models/Cart.js";
// import Product from '../models/product.js';


// export const placeOrder =async(req, res)=>{
//     try{
//         const {userId, address}=req.body;

//         //get Cart
//         const cart=await Cart.findOne({userId}).populate('items.productId');
//         if(!cart|| cart.items.length === 0){
//             return res.status(400).json({message:"Cart is empty"})
//         }

//         //prepare order items
//     const totalAmount = orderItems.reduce((total,item)=> total + (item.price * item.quantity),0 );   

//     //dedect stock from products
//     for(let item of cart.items){
//         await Product.findByIdAndUpdate(item.productId._id, {$inc:{stock: -item.quantity}});
//     }


//     // /create order
// const order =await Order.create({
//     userId,
//     items:orderItems,
//     address,
//     totalAmount,
//     paymentMethod: "COD",
// });

// await Cart.findOneAndUpdate({userId},{items:[]});

// res.status(201).json({message:"Order placed successfully",orderId: order._id})


//     }catch (error){
//         res.status(500).json({message: "Internal server error"})
//     }
// }
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from '../models/product.js';

export const placeOrder = async (req, res) => {
    try {
        const { userId, address } = req.body;

        // Get Cart
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // ✅ orderItems define karo
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
        }));

        // ✅ totalAmount calculate karo
        const totalAmount = orderItems.reduce(
            (total, item) => total + (item.price * item.quantity), 0
        );

        // Deduct stock
        for (let item of cart.items) {
            await Product.findByIdAndUpdate(
                item.productId._id,
                { $inc: { stock: -item.quantity } }
            );
        }

        // Create order
        const order = await Order.create({
            userId,
            items: orderItems,
            address,
            totalAmount,
            paymentMethod: "COD",
        });

        // Clear cart
        await Cart.findOneAndUpdate({ userId }, { items: [] });

        res.status(201).json({ message: "Order placed successfully", orderId: order._id });

    } catch (error) {
        console.error(error);  // ✅ error dekh sako terminal mein
        res.status(500).json({ message: "Internal server error" });
    }
};