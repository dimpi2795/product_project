
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const loadProducts = async () => {
    try {
      const res = await api.get(
        `/products?search=${search}&category=${category}`
      );

      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [search, category]);

  const addToCart = async (productId) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please log in to add items to your cart.");
        return;
      }

      const res = await api.post(`/cart/add`, {
        userId,
        productId,
      });

      const total = res.data.cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      localStorage.setItem("cartCount", total);

      window.dispatchEvent(new Event("cartUpdated"));

      alert("Product added to cart");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      {/* Search */}
      <div className="mb-4 flex gap-3">
        <input
          type="text"
          placeholder="Search products.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-1/2"
        />

        {/* Category Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Laptops">Laptops</option>
          <option value="Smart Phone">Smart Phone</option>
          <option value="TV">TV</option>
          <option value="Tablets">Tablets</option>
          
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded p-3 flex flex-col items-center hover:shadow-lg transition hover:scale-110 transition duration-250 "
          >
            <Link to={`/product/${product._id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain bg-blue-950 rounded"
              />

              <h2 className="mt-2 font-semibold text-lg">
                {product.title}
              </h2>

              <p className="text-gray-600">{product.price}</p>
            </Link>

            <button
              onClick={() => addToCart(product._id)}
              className="mt-3 w-full bg-blue-500  text-white px-3 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}