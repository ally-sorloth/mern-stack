const mongoose = require("mongoose");
const { options } = require("../routes/router");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify:true,
        });
        console.log("Succesfully connected to DB");    
    } catch (error) {
        console.log("Error connectin DB", error);
        
    }
    
};

module.exports = connectDB;