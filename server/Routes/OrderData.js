const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

// Route to handle new orders
router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        data.unshift({ Order_date: req.body.order_date }); // Adding order date to the beginning of the data array

        // Check if the email exists in the database
        let existingOrder = await Order.findOne({ email: req.body.email });

        if (existingOrder === null) {
            // If email does not exist, create a new order document
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
        } else {
            // If email exists, update the existing order document
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
        }
        res.json({ success: true });
    } catch (error) {
        console.error("Error processing order:", error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Route to retrieve orders by email
router.post('/myOrderData', async (req, res) => {
    try {
        let order = await Order.findOne({ 'email': req.body.email });
        res.json({ orderData: order });
    } catch (error) {
        console.error("Error retrieving order:", error.message);
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
