

import { createBrowserRouter, RouterProvider,Outlet } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./admin/AddProduct";
import ProductList from "./admin/ProductList";
import EditProduct from "./admin/EditProduct";
import Cart from "./pages/Cart"
import Navbar from "./components/Navbar";
import CheckoutAddress from "./pages/CheckoutAddress";
import Checkout from "./pages/Checkout";
import OrderSucess from "./pages/OrderSucess";
// import './App.css';


function Layout(){
  return(
    <>
    <Navbar />
    <Outlet />
    </>
  )
}
const router = createBrowserRouter([
  {
    element: <Layout />,
    children:[
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/product/:id", element: <ProductDetails /> },
  {path: "/cart",element:<Cart/>},
  { path: "/admin/products/add", element: <AddProduct /> },
  { path: "/admin/products", element: <ProductList /> },
  { path: "/admin/products/edit/:id", element: <EditProduct /> },
{path:"/checkout-address",element:<CheckoutAddress/>},
{path:"/checkout" ,element:<Checkout/>},
{path:"/order-success/:id",element:<OrderSucess/>},
]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}