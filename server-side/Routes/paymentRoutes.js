import express from 'express';
import { createPayPalPayment, executePayPalPayment } from '../Controller/PaypalPaymentController.js';
import { createStripeSession, handleStripeWebhook } from '../Controller/StripePaymentController.js';
const router = express.Router();

// Initiate PayPal payment
router.post('/paypal', createPayPalPayment);

// Execute PayPal payment
router.get('/paypal/success', executePayPalPayment);

// Initiate Stripe payment
// Create Stripe session for payment
router.post('/stripe', createStripeSession);

// Stripe webhook for payment status updates
router.post('/stripe/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
