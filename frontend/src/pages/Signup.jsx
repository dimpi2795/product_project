import { useState } from "react";
import api from "../api/axios";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [msg,setMsg]=useState("");

  const handleChange = (e) => {
     setForm({
      ...form,
      [e.target.name]:e.target.value
     })
  }

 const handleSubmit = async (e) => {
    e.preventDefault();

   try {

    const response = await api.post("/auth/signup", form);

    setMsg(response.data.message);

  } catch (error) {

    setMsg(error.response?.data?.message || "An error occurred");

  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

       {msg && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center ">
          {msg}
        </div>
       )}


        <form onSubmit={handleSubmit} className="space-y-4">
          <input
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          />

          <input
          name="email"
          type="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focuse:outline-none focuse:ring-2 focus:ring-blue-500"
          required
            />

         <input
          name="password"
          type="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-black-300 rounded-md hover:black-white-blue focuse:outline-none focuse:ring-2 focus:ring-blue-500"
          required
            />

            <button
            type="submit"
            className="w-full bg-blue-500 hover:drop-shadow-sky-950 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </form>
      </div>
    </div>
  )
}
          