import { get } from "mongoose";
import Cart from "../models/Cart.js";

//add to cart
// export const addToCart = async (req,res) => {
//     try{
//         const {userId , productId} = req.body;
//         let cart = await Cart.findOne({userId});

//         if(!cart){
//             cart = new Cart({userId,items: [
//                 {productId,quantity: 1}
//             ]});
//         }else{
//             const item = cart.items.find(
//                 i => i.productId.toString() === productId
//             );
//         }

//         if(item){
//             item.quantity += 1;
//         }else{
//             cart.items.push({productId,quantity: 1});
//         }
//         await cart.save();
//         res.json({
//             message: "Product added to cart",
//              cart
//         })

//     }catch(error){
//         res.status(500).json({message: "Server error",error});
//     }
// }
export const addToCart = async (req,res) => {
    try{
        const {userId , productId} = req.body;

        let cart = await Cart.findOne({userId});

        if(!cart){

            cart = new Cart({
                userId,
                items:[
                    {
                        productId,
                        quantity:1
                    }
                ]
            });

        }else{

            const item = cart.items.find(
                i => i.productId.toString() === productId
            );

            if(item){
                item.quantity += 1;
            }else{
                cart.items.push({
                    productId,
                    quantity:1
                });
            }
        }

        await cart.save();

        res.json({
            message:"Product added to cart",
            cart
        });

    }catch(error){

        console.log(error);

        res.status(500).json({
            message:"Server error",
            error:error.message
        });
    }
}
// Remove item from cart

export const removeItem = async (req,res) => {
    try{
        const {userId , productId} = req.body;

        const cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }

        cart.items = cart.items.filter(
            i => i.productId.toString() !== productId
        );
        await cart.save();
        res.json({
            message: "Product removed from cart",
             cart
        })

    }catch(error){
        res.status(500).json({message: "Server error",error});
    }
}

// update item quantity in cart

export const updateItemQuantity = async (req,res) => {
    try{
        const {userId , productId, quantity} = req.body;    
        const cart = await Cart.findOne({userId});
        if(!cart){
            return res.status(404).json({message: "Cart not found"});
        }

        const item = cart.items.find(
            i => i.productId.toString() === productId
        );

        if(!item){
            return res.status(404).json({message: "Item not found in cart"});
        }

        item.quantity = quantity;
        await cart.save();
        res.json({
            message: "Item quantity updated",
             cart
        })
    }catch(error){
        res.status(500).json({message: "Server error",error});
    }
}

// get cart items for user

// export const getCart = async (req,res) => {
//     try{
//         const {userId} = req.params;
//         const cart = await Cart.findOne({userId}).populate("items.productId");
//      if(!cart){
//         return res.status(200).json({
//             userId,
//             items:[],

//         });
//      }
//         res.status(200).json(cart);

// }catch(error ){
//     res.status(500).json({message: "Server error",error});
// }
// }
// backend/controllers/cartController.js

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    // .populate zaruri hai taaki price aur title mile
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        userId,
        items: [], // Empty array bhej rahe hain taaki frontend error na de
        total: 0
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};