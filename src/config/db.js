const mongoose = require('mongoose');

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('mogoDB connected');
    } 
    catch (error){
        console.error(`db connection error ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDb;