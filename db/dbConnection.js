const mongoose = require('mongoose');

const connectionDb = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log("connected DB successfully!")
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectionDb