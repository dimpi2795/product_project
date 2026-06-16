
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const userId = localStorage.getItem("userId");


  // LOAD CART COUNT
  const loadCartCount = async () => {

  try {

    const userId = localStorage.getItem("userId");

    if (!userId) return;

    const res = await api.get(
      `/cart?userId=${userId}`
    );

    const count =
      res.data.cart?.items?.reduce(
        (acc, item) => acc + item.quantity,
        0
      ) || 0;

    setCartCount(count);

  } catch (error) {

    console.log(error);

  }

};

  useEffect(() => {
    loadCartCount();

    window.addEventListener("cartUpdated", loadCartCount);

    return () => {
      window.removeEventListener("cartUpdated", loadCartCount);
    };
  }, [userId]);

  const logout = () => {
    localStorage.clear();
    setCartCount(0);
    navigate("/login");
  };

  return (
    <nav className="flex justify-between p-4 shadow bg-gradient-to-r from to-blue-950  hover:bg-blue-400">
      <Link to="/" className="text-xl font-bold">
        <h4>Electronic Shop</h4>
      </Link>

      <div className="flex gap-4 items-center">

        {/* CART ICON */}
        <Link to="/cart" className="relative text-xl">
          🛒

  {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
          {cartCount}
        </span>
          )}
        </Link>

        {/* AUTH LINKS */}
        {!userId ? (
          <>
            <Link to="/login" className="text-lg  ">
              Login
            </Link>
            <Link to="/signup" className="text-lg">
              Signup
            </Link>
          </>
        ) : (
          <button onClick={logout} className="text-lg text-red-500">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}