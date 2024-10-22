import stripe from "../Utils/stripe.js";
import { OrderModel } from '../Models/OrderModel.js';

export const createStripeSession = async (req, res) => {
    const { orderItems, totalPrice, userId } = req.body;

    const order = new OrderModel({
        orderItems,
        totalPrice,
        user: userId
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: orderItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100), // Stripe uses cents
            },
            quantity: item.qty,
        })),
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    order.paymentResult = {
        id: session.id,
        status: 'pending',
    };

    await order.save();

    res.status(201).json({ sessionId: session.id });
};

export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Mark order as paid
        const order = await OrderModel.findOneAndUpdate(
            { 'paymentResult.id': session.id },
            {
                isPaid: true,
                paidAt: new Date(),
                'paymentResult.status': 'paid',
            },
            { new: true }
        );

        if (order) {
            console.log(`Order ${order._id} marked as paid.`);
        }
    }

    res.json({ received: true });
};
