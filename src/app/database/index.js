import mongoose from "mongoose";

const connectToDB = async() => {
    const url = 'mongodb+srv://khangle240503:ldk112405@cluster0.dp1yh.mongodb.net/';
    
    mongoose.connect(url).then(()=> console.log('Database connection succesfully')).catch((e) => console.log(e))
}

export default connectToDB;