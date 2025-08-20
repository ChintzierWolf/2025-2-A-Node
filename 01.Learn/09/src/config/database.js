const mongoose = require ('mongoose');

const connectDB = async(app) => {
    const strConnection = 'mongoDB://localhost:27017/practica09';
    try 
    {
        await mongoose.connect(strConnection,{
            useNewUrlParser:true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB is Connected');
    } 
    
    catch (error) 
    {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;