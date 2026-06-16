
import Cart from "../models/Cart.js";

// ADD TO CART
export const addToCart = async (req, res) => {

    try {

        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({
                message: "userId and productId required"
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {

            cart = new Cart({
                userId,
                items: [{ productId, quantity: 1 }]
            });

        } else {

            const item = cart.items.find(
                i => i.productId.toString() === productId
            );

            if (item) {
                item.quantity += 1;
            } else {
                cart.items.push({
                    productId,
                    quantity: 1
                });
            }
        }

        await cart.save();

        res.status(201).json({
            success: true,
            message: "Product added to cart",
            cart
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// REMOVE ITEM
export const removeItem = async (req, res) => {

    try {

        const { userId, productId } = req.body;

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.productId.toString() !== productId
        );

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item removed",
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// UPDATE QUANTITY
export const updateItemQuantity = async (req, res) => {

    try {

        const { userId, productId, quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            item => item.productId.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                message: "Item not found"
            });
        }

        item.quantity = quantity;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Quantity updated",
            cart
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const getCart = async (req, res) => {

  try {

    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId required"
      });
    }

    let cart = await Cart.findOne({ userId })
      .populate("items.productId");

    if (!cart) {
      cart = {
        items: []
      };
    }

    res.status(200).json({
      success: true,
      cart
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};