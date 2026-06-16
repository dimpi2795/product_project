

// // import Address from "../models/Address.js";

// // // ADD ADDRESS
// // export const saveAddress = async (req, res) => {

// //     try {

// //         const address = await Address.create(req.body);

// //         res.status(201).json({
// //             success: true,
// //             message: "Address saved",
// //             address
// //         });

// //     } catch (error) {

// //         console.log(error);

// //         res.status(500).json({
// //             success: false,
// //             message: error.message
// //         });

// //     }
// // };

// // // GET ALL ADDRESSES
// // export const getAddresses = async (req, res) => {

// //     try {

// //         const addresses = await Address.find()
// //         .populate("userId");

// //         res.status(200).json({
// //             success: true,
// //             addresses
// //         });

// //     } catch (error) {

// //         console.log(error);

// //         res.status(500).json({
// //             success: false,
// //             message: error.message
// //         });

// //     }
// // };

// // // UPDATE ADDRESS
// // export const updateAddress = async (req, res) => {

// //     try {

// //         const address = await Address.findByIdAndUpdate(
// //             req.params.id,
// //             req.body,
// //             { new: true }
// //         );

// //         if (!address) {
// //             return res.status(404).json({
// //                 message: "Address not found"
// //             });
// //         }

// //         res.status(200).json({
// //             success: true,
// //             message: "Address updated",
// //             address
// //         });

// //     } catch (error) {

// //         res.status(500).json({
// //             success: false,
// //             message: error.message
// //         });

// //     }
// // };

// // // DELETE ADDRESS
// // export const deleteAddress = async (req, res) => {

// //     try {

// //         const address = await Address.findByIdAndDelete(
// //             req.params.id
// //         );

// //         if (!address) {
// //             return res.status(404).json({
// //                 message: "Address not found"
// //             });
// //         }

// //         res.status(200).json({
// //             success: true,
// //             message: "Address deleted"
// //         });

// //     } catch (error) {

// //         res.status(500).json({
// //             success: false,
// //             message: error.message
// //         });

// //     }
// // };

// import Address from "../models/Address.js";

// // SAVE ADDRESS
// export const addAddress = async (req, res) => {

//   try {

//     const newAddress = await Address.create(req.body);

//     res.status(201).json({
//       success: true,
//       address: newAddress,
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }

// };
// export const saveAddress = async (req, res) => {

//   try {

//     const newAddress = await Address.create(
//       req.body
//     );

//     res.status(201).json({
//       success: true,
//       address: newAddress,
//     });

//   } catch (error) {

//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   }

// };


// // GET ADDRESSES - userId se filter karo
// export const getAddresses = async (req, res) => {
//   try {
//     const addresses = await Address.find({ userId: req.params.userId });
//     res.status(200).json({
//       success: true,
//       addresses
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // UPDATE ADDRESS
// export const updateAddress = async (req, res) => {

//     try {

//         const address = await Address.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true }
//         );

//         res.status(200).json(address);

//     } catch (error) {

//         res.status(500).json({
//             message: error.message
//         });

//     }
// };

// // DELETE ADDRESS
// export const deleteAddress = async (req, res) => {

//     try {

//         await Address.findByIdAndDelete(req.params.id);

//         res.status(200).json({
//             message: "Address deleted"
//         });

//     } catch (error) {

//         res.status(500).json({
//             message: error.message
//         });

//     }
// };

import Address from "../models/Address.js";


// SAVE ADDRESS
export const saveAddress = async (req, res) => {

  try {

    const newAddress = await Address.create(req.body);

    res.status(201).json({
      success: true,
      address: newAddress,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};


// GET ADDRESSES
export const getAddresses = async (req, res) => {

  try {

    const query = {};
    if (req.query.userId) {
      query.userId = req.query.userId;
    }

    const addresses = await Address.find(query);

    res.status(200).json({
      success: true,
      addresses
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// UPDATE ADDRESS
export const updateAddress = async (req, res) => {

  try {

    const address = await Address.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      address
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// DELETE ADDRESS
export const deleteAddress = async (req, res) => {

  try {

    await Address.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Address deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
