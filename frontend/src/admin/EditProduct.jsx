import {  useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
    const {id}= useParams();
    const navigate = useNavigate();


    const [form,setform] = useState({
        title:"",
        description:"",
        price:"",
        category:"",
    
        stock:"",
    })
    const [image, setImage] = useState(null);


    const allowedFields = ["title","description","price","category","stock"];


// const loadProduct = async () => {
//     const res = await api.get(`/products`);
//     const product = res.data.find((p) => p._id === parseInt(id));
//     setform(product);
// }
const loadProduct = async () => {
    const res = await api.get(`/products`);
    const product = res.data.find((p) => p._id === id);

    if (product) {
        setform(product);
    }
};

    useEffect(() => {
        loadProduct();
    }, []);

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value,
        });
    };   

    const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("stock", form.stock);

    if (image) {
      formData.append("image", image);
    }

   await api.patch(`/products/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Product updated successfully");

    navigate("/admin/products");

  } catch (error) {
    console.log(error);
  }
};
    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded">
            <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
                {
                    allowedFields.map((key)=>(
                        allowedFields.includes(key) && (
                            <input

                            key={key}
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            placeholder={key}
                            //  type="file"
                            //   onChange={(e) => setImage(e.target.files[0])}
                            className="w-full p-2 border border-gray-300 rounded"
                          
                            />
                        )))}
                        <input
  type="file"
  onChange={(e) => setImage(e.target.files[0])}
  className="w-full p-2 border border-gray-300 rounded"
/>
                    
                
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Update Product
                    </button>
                    </form>
                    </div>
    )             
               } ;
                       