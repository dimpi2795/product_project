

// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router-dom";


// export default function AddProduct() {

//     const [form, setForm] = useState({
//         title: "",
//         description: "",
//         price: "",
//         category: "",
//         image: "",
//         stock: "",
//     });

//     const navigate = useNavigate();


//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await api.post("/products/add", form);

//             alert("Product added successfully");

//             navigate("/admin/products"); // make sure this route exists

//         } catch (error) {
//             console.error("Error adding product", error);
//         }
//     };

//     return (
//         <div className="max-w-lg mx-10 bg-white p-6 shadow rounded">

//             <h2 className="text-2xl font-bold mb-6">
//                 Add Product
//             </h2>

//             <form onSubmit={handleSubmit} className="space-y-3">

//                 {Object.keys(form).map((key) => (
//                     <input
//                      name="image"
//                         key={key}
//                         name={key}
//                         value={form[key]}
//                         onChange={handleChange}
//                         placeholder={key}
//                         className="w-full border border-gray-300 p-2 rounded"
//                     />
//                 ))}

//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     Add Product
//                 </button>

//             </form>

//         </div>
//     );
// }
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // TEXT INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("category", form.category);
      formData.append("stock", form.stock);
      formData.append("image", image);

      await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product added successfully ✅");

      navigate("/admin/products");
    } catch (error) {
      console.log("ADD PRODUCT ERROR:", error.response?.data || error.message);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* TITLE */}
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />

        {/* DESCRIPTION */}
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2 rounded"
          required
        />

        {/* PRICE */}
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="w-full border p-2 rounded"
          required
        />

        {/* CATEGORY */}
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-2 rounded"
        />

        {/* STOCK */}
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          className="w-full border p-2 rounded"
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border p-2 rounded"
          required
        />

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}