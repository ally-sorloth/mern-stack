//mongodb+srv://dbUser:p7NvxsQJ2xTbfLDy@cluster0.7fvgf.mongodb.net/<dbname>?retryWrites=true&w=majority
const mongoose = require("mongoose");
const { options } = require("../routes/router");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Succesfully connected to DB");    
    } catch (error) {
        console.log("Error connectin DB", error);
        
    }
    
};

module.exports = connectDB;