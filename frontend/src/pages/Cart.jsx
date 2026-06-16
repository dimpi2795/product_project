



import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();

  // Load cart
  const loadCart = async () => {
    try {
      if (!userId) return;
      const res = await api.get(`/cart?userId=${userId}`);
      setCart(res.data.cart || { items: [] });
    } catch (error) {
      console.log("Cart load error:", error);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Remove item
  const removeItem = async (productId) => {
    try {
      await api.delete(`/cart/removeItem`, {
        data: { userId, productId },
      });
      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
    }
  };

  // Update quantity
  const updateQty = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeItem(productId);
        return;
      }

      await api.patch(`/cart/updateItem`, {
        userId,
        productId,
        quantity,
      });

      loadCart();
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
    }
  };

  // Loading
  if (!cart) {
    return <div>Loading...</div>;
  }

  // Total price fix
  const total = (cart?.items || []).reduce(
    (acc, item) =>
      acc + (item.productId?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart?.items?.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {cart?.items?.map((item) => (
            <div
              key={item.productId._id}
              className="flex items-center justify-between p-4 border rounded"
            >
              {/* Product info */}
              <div className="flex items-center gap-4">
                <img
                 src={item.productId.image}                 
                  className="w-16 h-16 object-cover rounded"
                />

                <div>
                  <h2 className="text-lg font-semibold">
                    {item.productId.title}
                  </h2>
                  <p className="text-gray-600">
                    ${item.productId.price}
                  </p>
                </div>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQty(item.productId._id, item.quantity - 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
               
                  onClick={() =>
                    updateQty(item.productId._id, item.quantity + 1)
                  }
                  className="px-2 py-1 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>

              {/* Price */}
              <div>
                <p className="font-semibold">
                  $
                  {(item.productId.price * item.quantity).toFixed(2)}
                </p>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.productId._id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="text-right mt-4">
            <h2 className="text-xl font-bold">
              Total: ${total.toFixed(2)}
            </h2>
          </div>

          {/* Checkout */}
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}