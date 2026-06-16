


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // agar tumhara api file different path pe hai to adjust karna

const Login = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handeleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      console.log(response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);

      setMsg("Login successful ✔");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.log(error);

      setMsg(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">

      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to Your Account
        </h2>

        {msg && (
          <div className="mb-4 text-center text-sm font-medium text-red-600">
            {msg}
          </div>
        )}

        <form onSubmit={handeleSubmit} className="space-y-4">

          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;