const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/checkout', async (req, res) => {
    let error;
    let status;
    try {
        const { amount, id } = req.body;

        // Create a payment intent using the Stripe API
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "USD",
            description: "React E-commerce Checkout",
            payment_method: id,
            confirm: true,
        });

        console.log("Payment Intent", paymentIntent);
        status = "success";
    } catch (err) {
        console.error("Error processing payment:", err);
        status = "failure";
        error = err.message;
    }
    // Send response back to client
    res.json({ error, status });
});

module.exports = router;
