// server.js (Node.js)
const express = require('express');
const stripe = require('stripe')('your_stripe_secret_key'); // Replace with your Stripe Secret Key
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const cartItems = req.body.items;

    const lineItems = cartItems.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100, // Stripe expects amounts in cents
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success.html', // Replace with your success URL
            cancel_url: 'http://localhost:3000/cart.html',      // Replace with your cancel URL
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(4242, () => console.log('Server running on http://localhost:4242'));