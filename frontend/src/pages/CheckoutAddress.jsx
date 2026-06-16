// import { useState } from "react";
// import api from "../api/axios"
// import { useNavigate } from "react-router-dom";


// export default function CheckoutAddress(){
//     const userId = localStorage.getItem("userId");
//     const navigate = useNavigate();

//   const [form, setform] = useState({
//     fullName: "",
//     phone: "",
//     addressLine: "",
//     city: "",
//     state: "",
//     pincode: ""

// });

// // You also need the handleChange function here
// const handleChange = (e) => {
//     setform({
//         ...form,
//         [e.target.name]: e.target.value
//     });
// };
//     const saveAddress = async (e)=>{
//         e.preventDefault();
//         await api.post("/address/add",{
//             ...form,
//             userId,
//         });
//         navigate("/checkout");
//     }

//     return(
//         <div className="max-w-xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-4">Delivery Address</h1>
//             {
//                 Object.keys(form).map((key)=>(
//                     <input
//                     key={key}
//                     name={key}
//                     placeholder={key}
//                     onChange={handleChange}
//                     className="w-full p-2 border border-gray-300 rounded"
//                 />
//                 ))
//             }
//             <button
//             onClick={saveAddress}
//             className="w-full bg-blue-500 text-white p-2 rounded"
//             >
//                 Save Address
//             </button>
//         </div>
//     )
// }
import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CheckoutAddress() {

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const saveAddress = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/address/add",
        {
          ...form,
          userId,
        }
      );

      console.log(response.data);

      alert("Address Saved Successfully");

      navigate("/checkout");

    } catch (error) {

      console.log(error);

      alert("Address Save Failed");

    }

  };

  return (

    <div className="max-w-xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-4">
        Delivery Address
      </h1>

      <form
        onSubmit={saveAddress}
        className="space-y-4"
      >

        {
          Object.keys(form).map((key) => (

            <input
              key={key}
              type="text"
              name={key}
              value={form[key]}
              placeholder={key}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />

          ))
        }

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Save Address
        </button>

      </form>

    </div>

  );

}