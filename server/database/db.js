const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;

const connectToDatabase = async () => {
    try {
        // Connect to MongoDB using Mongoose
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("Connected to the database successfully");

        // Fetch food items from the 'food_items' collection
        const foodItems = await mongoose.connection.db.collection("food_items").find({}).toArray();
        global.food_items = foodItems;

        // Fetch food categories from the 'foodCategory' collection
        const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
        global.foodCategory = foodCategory;

        return foodItems;
    } catch (error) {
        console.error("Error while connecting to the database:", error.message);
    }
};

module.exports = connectToDatabase;
