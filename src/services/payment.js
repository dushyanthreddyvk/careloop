import { loadStripe } from '@stripe/stripe-js';

let stripePromise = null;

export const getStripe = async () => {
  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
    if (!publishableKey) {
      console.error('Stripe Public Key not found in environment variables');
      return null;
    }
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export const paymentService = {
  // Initialize payment with Stripe
  initializePayment: async (clientSecret) => {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe failed to initialize');
    }
    return stripe;
  },

  // Confirm card payment
  confirmCardPayment: async (clientSecret, cardElement) => {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe not initialized');
    }

    return stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
  },

  // Create payment method
  createPaymentMethod: async (cardElement, billingDetails) => {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe not initialized');
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    });

    if (error) {
      throw error;
    }

    return paymentMethod;
  },

  // Confirm setup for recurring payments
  confirmSetup: async (clientSecret, cardElement) => {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe not initialized');
    }

    return stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
  },

  // Validate card details
  validateCard: async (cardElement) => {
    const stripe = await getStripe();
    if (!stripe) {
      throw new Error('Stripe not initialized');
    }

    // Get card details
    const { complete, error } = await cardElement?.getFullResponse?.();
    return { complete, error };
  },
};

// Format currency for display
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount / 100); // Stripe amounts are in cents
};

// Format card error messages
export const formatCardError = (error) => {
  if (!error) return null;
  
  const errorMessages = {
    'invalid_number': 'Your card number is invalid.',
    'invalid_expiry_month': 'Your card\'s expiration month is invalid.',
    'invalid_expiry_year': 'Your card\'s expiration year is invalid.',
    'invalid_cvc': 'Your card\'s security code is invalid.',
    'expired_card': 'Your card has expired.',
    'incorrect_cvc': 'Your card\'s security code is incorrect.',
    'processing_error': 'An error occurred processing your card. Try again in a few seconds.',
    'rate_limit': 'Too many requests. Please try again later.',
  };

  return errorMessages[error.type] || error.message;
};

export default paymentService;
