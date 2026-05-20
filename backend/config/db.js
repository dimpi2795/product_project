// import mongoose from "mongoose";

// const connectDB = async () => {
//     try{
//     await mongoose.connect(process.env.MONGO_URI); 
//        console.log("MongoDB connected successfully")
    
//     }catch(error){
//         console.error(`Error: ${error.message}`);
       
//     }
// }


// export default connectDB;


import mongoose from "mongoose";

const connectDB = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log("MongoDB Connected");

  } catch (error) {

    console.log(error);

  }
};

export default connectDB;