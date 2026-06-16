 

// import Product from "../models/product.js";


// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
// });

// export const upload = multer({ storage });

// export const createProduct = async (req, res) => {
//   try {
//     const imageUrl = req.file
//       ? `http://localhost:8000/uploads/${req.file.filename}`
//       : req.body.image; // fallback URL ke liye

//     const newProduct = await Product.create({
//       ...req.body,
//       image: imageUrl,  // ✅ Full URL save hogi
//     });

//     res.status(201).json({ message: "Product created successfully", product: newProduct });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };
// // Create Product
// export const createProduct = async (req, res) => {
//   try {

//     console.log(req.body);

//     const newProduct = await Product.create(req.body);

//     res.status(201).json({
//       message: "Product created successfully",
//       product: newProduct,
//     });

//   } catch (error) {

//     console.log(error);

//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// // Get Products
// export const getProducts = async (req, res) => {
//   try {
//    const { search,category } = req.query;

//    let filter = {};

//     if (search) {
//       filter.title = { $regex: search, $options: "i" };
//     }

//     if (category) {
//       filter.category = category;
//     }
//     const products = await Product.find(filter).sort({ createdAt: -1 });

//     res.json(products);

//   } catch (error) {

//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// // Update Product
// export const updateProduct = async (req, res) => {
//   try {

//     const updated = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json({
//       message: "Product updated successfully",
//       updated,
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// // Delete Product
// export const deleteProduct = async (req, res) => {
//   try {

//     await Product.findByIdAndDelete(req.params.id);

//     res.json({
//       message: "Product deleted successfully",
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };


import Product from "../models/product.js";
import multer from "multer";
import path from "path";
// import Product from "../models/Product.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

export const upload = multer({ storage });

// Create Product
export const createProduct = async (req, res) => {
  try {
    const imageUrl = req.file
      ? `http://localhost:8000/uploads/${req.file.filename}`
      : req.body.image;

    const newProduct = await Product.create({ ...req.body, image: imageUrl });
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Products
export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};
    if (search) filter.title = { $regex: search, $options: "i" };
    if (category) filter.category = category;
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Product updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {

  try {

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
