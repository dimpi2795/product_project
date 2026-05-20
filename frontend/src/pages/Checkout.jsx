
// import { useState, useEffect } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const userId = localStorage.getItem("userId");
//   const [addressList, setAddressList] = useState([]);
//   const [selectAddress, setSelectAddress] = useState(null); // ✅ Fixed typo
//   const [cart, setCart] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "", phone: "", addressLine: "", city: "", state: "", pincode: ""
//   });

//   const loadData = () => {
//     if (userId) {
//       api.get(`/cart/${userId}`).then((res) => setCart(res.data));
//       api.get(`/address/${userId}`).then((res) => {
//         setAddressList(res.data);
//         // ✅ setAddress() hata diya, crash fix
//         if (res.data.length === 0) setShowForm(true);
//       });
//     }
//   };

//   useEffect(() => {
//     if (!userId) { navigate("/"); return; }
//     loadData();
//   }, [userId]);

//   const handleSaveAddress = async (e) => {
//     e.preventDefault();
//     try {
//       await api.post("/address/add", { ...formData, userId });
//       setShowForm(false);
//       loadData();
//     } catch (err) { alert("Error saving address"); }
//   };

//   if (!cart) return <div className="p-6 text-center">Loading...</div>;

//   const total = cart.items?.reduce(
//     (sum, i) => sum + (i.quantity * (i.productId?.price || 0)), 0
//   ) || 0;

//   const placeOrder = async () => {
//     if (!selectAddress) {
//       alert("Please select an address");
//       return;
//     }
//     await api.post("/order/place", { userId, address: selectAddress });
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 font-sans">
//       <h1 className="text-2xl font-bold mb-6">Checkout Process</h1>

//       {showForm ? (
//         <form onSubmit={handleSaveAddress} className="space-y-4 border p-6 rounded">
//           <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
//           {["fullName","phone","addressLine","city","state","pincode"].map((field) => (
//             <input key={field} className="w-full border p-3 rounded bg-gray-50"
//               placeholder={field}
//               onChange={(e) => setFormData({...formData, [field]: e.target.value})}
//               required
//             />
//           ))}
//           <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded font-bold">
//             Save Address
//           </button>
//           {addressList.length > 0 && (
//             <button type="button" onClick={() => setShowForm(false)} className="w-full text-gray-500">
//               Back to Selection
//             </button>
//           )}
//         </form>
//       ) : (
//         <div className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h2 className="text-lg font-semibold">Select Address</h2>
//             <button onClick={() => setShowForm(true)} className="text-blue-600 font-medium">+ Add New</button>
//           </div>

//           {addressList.map((addr) => (
//             <label key={addr._id} className={`block border p-4 rounded cursor-pointer ${
//               selectAddress?._id === addr._id ? "border-blue-500 bg-blue-50" : "border-gray-300"
//             }`}>
//               <input
//                 type="radio"
//                 name="address"
//                 value={addr._id}              // ✅ addr._id
//                 checked={selectAddress?._id === addr._id}
//                 onChange={() => setSelectAddress(addr)} // ✅ poora object
//                 className="mr-2"
//               />
//               <strong>{addr.fullName}</strong>
//               <p className="text-sm">{addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}</p>
//               <p className="text-sm">{addr.phone}</p>  {/* ✅ JSX fix */}
//             </label>
//           ))}

//           <div className="border-t pt-6">
//             <h2 className="font-bold text-xl mb-4">Order Summary</h2>
//             <div className="flex justify-between text-lg mb-2">
//               <span>Items in Cart:</span><span>{cart.items.length}</span>
//             </div>
//             <div className="flex justify-between text-2xl font-bold">
//               <span>Total Amount:</span><span>${total.toFixed(2)}</span>
//             </div>
//             <button onClick={placeOrder}
//               disabled={!selectAddress || cart.items.length === 0} // ✅ same state
//               className={`mt-6 w-full p-4 rounded font-bold text-white ${
//                 (!selectAddress || cart.items.length === 0) ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
//               }`}
//             >
//               Place Order (COD)
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const userId = localStorage.getItem("userId");
  const [addressList, setAddressList] = useState([]);
  const [selectAddress, setSelectAddress] = useState(null);
  const [cart, setCart] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "", phone: "", addressLine: "", city: "", state: "", pincode: ""
  });

  // ✅ Fix 1: useCallback nahi, seedha useEffect ke andar rakho
  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    api.get(`/cart/${userId}`)
      .then((res) => setCart(res.data))
      .catch(() => alert("Error loading cart"));

    api.get(`/address/${userId}`)
      .then((res) => {
        setAddressList(res.data);
        if (res.data.length === 0) setShowForm(true);
      })
      .catch(() => alert("Error loading addresses"));

  }, [userId]);

  // ✅ Fix 2: Alag loadData function — sirf save ke baad call hoga
  const reloadAddresses = () => {
    api.get(`/address/${userId}`)
      .then((res) => {
        setAddressList(res.data);
        if (res.data.length === 0) setShowForm(true);
      });
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      await api.post("/address/add", { ...formData, userId });
      setShowForm(false);
      reloadAddresses(); // ✅ Sirf address reload karo
    } catch (err) {
      alert("Error saving address. Please try again.");
    }
  };

  if (!cart) return <div className="p-6 text-center">Loading...</div>;

  const total = cart.items?.reduce(
    (sum, i) => sum + (i.quantity * (i.productId?.price || 0)), 0
  ) || 0;

  // ✅ Fix 3: try/catch + navigate add kiya
  const placeOrder = async () => {
    if (!selectAddress) {
      alert("Please select an address");
      return;
    }
    try {
    const res =  await api.post("/order/place", {
        userId,
        address: selectAddress,
      });
      const orderId = res.data._id || res.data.orderId;
      navigate(`/order-success/${orderId}`); 
      // alert("Order placed successfully! 🎉");
      // navigate("/"); // ✅ Order ke baad redirect
    } catch (err) {
      alert("Order failed. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6">Checkout Process</h1>

      {showForm ? (
        <form onSubmit={handleSaveAddress} className="space-y-4 border p-6 rounded">
          <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
          {["fullName", "phone", "addressLine", "city", "state", "pincode"].map((field) => (
            <input
              key={field}
              className="w-full border p-3 rounded bg-gray-50"
              placeholder={field}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
              required
            />
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700"
          >
            Save Address
          </button>
          {addressList.length > 0 && (
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="w-full text-gray-500 mt-2"
            >
              Back to Selection
            </button>
          )}
        </form>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Select Address</h2>
            <button
              onClick={() => setShowForm(true)}
              className="text-blue-600 font-medium"
            >
              + Add New
            </button>
          </div>

          {addressList.length === 0 && (
            <p className="text-red-500 text-sm">
              No address found. Please add one.
            </p>
          )}

          {addressList.map((addr) => (
            <label
              key={addr._id}
              className={`block border p-4 rounded cursor-pointer transition-all ${
                selectAddress?._id === addr._id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <input
                  type="radio"
                  name="address"
                  value={addr._id}
                  checked={selectAddress?._id === addr._id}
                  onChange={() => setSelectAddress(addr)} // ✅ poora object
                />
                <strong>{addr.fullName}</strong>
                {selectAddress?._id === addr._id && (
                  <span className="ml-auto text-blue-600 text-sm font-medium">
                    ✓ Selected
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 ml-5">
                {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="text-sm text-gray-600 ml-5">{addr.phone}</p>
            </label>
          ))}

          <div className="border-t pt-6">
            <h2 className="font-bold text-xl mb-4">Order Summary</h2>
            <div className="flex justify-between text-lg mb-2">
              <span>Items in Cart:</span>
              <span>{cart.items.length}</span>
            </div>
            <div className="flex justify-between text-2xl font-bold text-gray-900 mb-6">
              <span>Total Amount:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={placeOrder}
              disabled={!selectAddress || cart.items.length === 0}
              className={`w-full p-4 rounded font-bold text-white shadow-lg transition-all ${
                !selectAddress || cart.items.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Place Order (COD)
            </button>

            {cart.items.length === 0 && (
              <p className="text-red-500 text-center mt-2 text-sm">
                Cart is empty! Please add items first.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}