// import { useState } from "react";
// import api from "../api/axios";
// import { useNavigate } from "react-router";

// export default function AddProduct() {
//     const [from ,setForm] = useState({
//          title: "",
//          description: "",
//           price: "",
//           category: "",
//             image: "",
//              stock: "",
//     });

//     const navigate = useNavigate();

//     const handleChange = (e) => {
// setForm({
//     ...from,
//     [e.target.name]: e.target.value,
// });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try{
//             await api.post("/products/add",from);
//             alert("Product added successfully");
//             navigate("/admin/products");

//         }catch(error){
//             console.error("Error adding product",error);
//         }
//     }
//     return (
//         <div className="max-w-lg mx-10 bg-white p-6 shadow rounded">
//             <h2 className="text-2xl font-bold mb-6">Add Product</h2>
//             <form onSubmit={handleSubmit} className="space-y-3">
//                  {
//                    Object.keys(form).map((key) => (
//                      <input
//                         key={key}
//                         name={key}
//                         value={form[key]}
//                         onChange={handleChange}
//                         placeholder={key}
//                         className="w-full border border-gray-300 p-2 rounded"
//                         />
//                    )) 
//                  }
//                  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//                     Add Product
//                  </button>
//             </form>
                
//         </div>

// );
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
        image: "",
        stock: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/products/add", form);

            alert("Product added successfully");

            navigate("/admin/products"); // make sure this route exists

        } catch (error) {
            console.error("Error adding product", error);
        }
    };

    return (
        <div className="max-w-lg mx-10 bg-white p-6 shadow rounded">

            <h2 className="text-2xl font-bold mb-6">
                Add Product
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">

                {Object.keys(form).map((key) => (
                    <input
                        key={key}
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                        placeholder={key}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                ))}

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Product
                </button>

            </form>

        </div>
    );
}