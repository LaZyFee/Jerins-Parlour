import paypal from 'paypal-rest-sdk';
import { OrderModel } from '../Models/OrderModel.js';

// Initiate PayPal payment
export const createPayPalPayment = async (req, res) => {
    const { totalPrice, orderItems, userId } = req.body;

    const order = new OrderModel({
        orderItems,
        totalPrice,
        user: userId
    });

    const createPaymentJson = {
        intent: 'sale',
        payer: {
            payment_method: 'paypal'
        },
        redirect_urls: {
            return_url: `${process.env.FRONTEND_URL}/booking/booking-list`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`
        },
        transactions: [{
            item_list: {
                items: orderItems.map(item => ({
                    name: item.name,
                    sku: item.name,
                    price: item.price.toFixed(2),
                    currency: 'USD',
                    quantity: item.qty
                }))
            },
            amount: {
                currency: 'USD',
                total: totalPrice.toFixed(2)
            },
            description: 'Order for ' + orderItems.map(item => item.name).join(', ')
        }]
    };

    paypal.payment.create(createPaymentJson, (error, payment) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error creating PayPal payment' });
        } else {
            const redirectUrl = payment.links.find(link => link.rel === 'approval_url').href;
            res.status(201).json({ paymentId: payment.id, redirectUrl });
        }
    });
};

// Handle success after PayPal redirects back
export const executePayPalPayment = (req, res) => {
    const { paymentId, PayerID } = req.query;
    console.log(paymentId, PayerID);

    const executePaymentJson = {
        payer_id: PayerID
    };

    paypal.payment.execute(paymentId, executePaymentJson, (error, payment) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error executing PayPal payment' });
        } else {
            // Update order status
            Order.findOneAndUpdate(
                { paymentResult: { id: paymentId } },
                {
                    isPaid: true,
                    paidAt: new Date(),
                    paymentResult: {
                        id: payment.id,
                        status: payment.state,
                        update_time: payment.update_time,
                        email_address: payment.payer.payer_info.email
                    }
                },
                { new: true }
            ).then(order => {
                res.status(200).json({ message: 'Payment successful', order });
            });
        }
    });
};
