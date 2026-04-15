# CareLoop Healthcare Platform - Feature Implementation Guide

## Overview
This document outlines the implementation of key features for the CareLoop healthcare platform:
1. **User Authentication**
2. **CRUD Operations**
3. **API Integration**
4. **Payment Gateway**

---

## 1. User Authentication

### What Was Added:
- **AuthContext** (`src/context/AuthContext.jsx`): Manages user authentication state globally
- **useAuth Hook**: Custom hook to access authentication anywhere in the app
- **Token Management**: Automatically stores and retrieves authentication tokens

### How to Use:

```jsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return <div>Welcome, {user.name}!</div>;
}
```

### Features:
- ✅ User login/logout
- ✅ Token persistence in localStorage
- ✅ Automatic token injection in API requests
- ✅ User profile updates
- ✅ Protected routes for authenticated pages

---

## 2. CRUD Operations

### What Was Added:
- **API Service** (`src/services/api.js`): Comprehensive API client with Axios
- **Custom Hooks** (`src/hooks/useApi.js`): React hooks for easy data fetching
- **CRUD Services** for:
  - **Doctors**: Get, Create, Update, Delete, Search
  - **Appointments**: Book, Cancel, Get Slots, Track Queue
  - **Medical Records**: Upload, View, Manage records
  - **Payments**: Process, Track, Refund

### How to Use:

```jsx
import { useAppointments, useCreateAppointment } from './hooks/useApi';

function AppointmentList() {
  const { appointments, loading, error, refetch } = useAppointments();
  const { createAppointment, loading: creating } = useCreateAppointment();

  const handleBook = async () => {
    try {
      await createAppointment({
        doctorId: 1,
        date: '2026-04-20',
        time: '10:00 AM',
        notes: 'Checkup'
      });
      refetch(); // Refresh the list
    } catch (err) {
      console.error('Booking failed:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {appointments.map(apt => (
        <div key={apt.id}>{apt.doctor}</div>
      ))}
      <button onClick={handleBook}>Book Appointment</button>
    </div>
  );
}
```

### Available Hooks:
- `useLogin()` - Login functionality
- `useAppointments(filters)` - Get appointments
- `useCreateAppointment()` - Create appointment
- `useMedicalRecords(filters)` - Get medical records
- `useUploadMedicalRecord()` - Upload files
- `useDoctors(filters)` - Get doctors list
- `useSearchDoctors()` - Search doctors
- `useAvailableSlots(doctorId, date)` - Get available slots
- `useCancelAppointment()` - Cancel appointment
- `useQueueStatus(appointmentId)` - Track queue position

---

## 3. API Integration

### What Was Added:
- **Axios Client** with:
  - Base URL configuration from environment variables
  - Automatic Bearer token injection
  - Global error handling
  - Request/response interceptors
  - 401 auto-logout on token expiry

### API Endpoints Structure:

```
/api/auth
  POST /login
  POST /register
  POST /logout
  GET /profile
  PUT /profile

/api/doctors
  GET / (with filters)
  GET /:id
  POST /
  PUT /:id
  DELETE /:id
  GET /search?q=query

/api/appointments
  GET / (with filters)
  GET /:id
  POST /
  PUT /:id
  DELETE /:id
  GET /slots?doctorId=X&date=Y
  POST /:id/cancel

/api/medical-records
  GET / (with filters)
  GET /:id
  POST /
  PUT /:id
  DELETE /:id
  POST /:id/upload (multipart)

/api/queue
  GET /:appointmentId
  GET /
  POST /:appointmentId/checkin

/api/payments
  POST /intent
  GET /
  GET /:id
  POST /:id/refund
  POST /webhook
```

### Environment Configuration:

Create a `.env.local` file:
```env
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key_here
VITE_HOSPITAL_NAME=CareLoop Hospital
VITE_APP_VERSION=1.0.0
```

---

## 4. Payment Gateway (Stripe)

### What Was Added:
- **Payment Service** (`src/services/payment.js`): Stripe integration
- **PaymentForm Component** (`src/components/PaymentForm.jsx`): Reusable payment UI
- **Stripe Elements**: Secure card input handling

### How to Use:

```jsx
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from './services/payment';
import { PaymentForm } from './components/PaymentForm';

const stripePromise = getStripe();

function CheckoutPage() {
  const handlePaymentSuccess = (data) => {
    console.log('Payment successful:', data);
    // Redirect to confirmation page
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
  };

  return (
    <Elements stripe={stripePromise}>
      <PaymentForm
        amount={99900} // Amount in cents
        appointmentId={123}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </Elements>
  );
}
```

### Payment Features:
- ✅ Secure card element with Stripe
- ✅ Client-side validation
- ✅ Error handling and display
- ✅ Payment intent creation
- ✅ Support for recurring payments (setup)
- ✅ Card format helpers and validators

### Setting Up Stripe:

1. Get your Stripe keys from [Stripe Dashboard](https://dashboard.stripe.com)
2. Add to `.env.local`:
   ```env
   VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
   ```
3. Backend should handle:
   - Creating payment intents
   - Webhook verification
   - Payment confirmation

---

## File Structure

```
src/
├── context/
│   └── AuthContext.jsx          # Authentication state management
├── services/
│   ├── api.js                   # API client and CRUD operations
│   └── payment.js               # Stripe payment service
├── hooks/
│   └── useApi.js                # Custom hooks for API calls
├── components/
│   ├── ProtectedRoute.jsx       # Route protection wrapper
│   ├── PaymentForm.jsx          # Stripe payment form
│   └── ...other components
├── pages/
│   ├── LoginPage.jsx            # Login UI
│   ├── DashboardPage.jsx        # Main dashboard
│   ├── AppointmentBookingPage.jsx
│   ├── DoctorDiscoveryPage.jsx
│   ├── MedicalRecordsPage.jsx
│   ├── QueueTrackingPage.jsx
│   ├── EmergencyPage.jsx
│   └── ProfilePage.jsx
├── App.jsx                       # Main app with auth & routing
└── main.jsx                      # Entry point with AuthProvider
```

---

## Setup Instructions

### 1. Install Dependencies
```bash
npm install axios react-router-dom @stripe/react-stripe-js @stripe/stripe-js
```

### 2. Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Backend Requirements
Your backend needs to implement:
- User authentication endpoints
- CRUD endpoints for doctors, appointments, records
- Stripe payment processing
- Queue tracking system
- Medical record storage

---

## Best Practices

### Authentication
- Always check `isAuthenticated` before rendering protected content
- Use `useAuth()` hook instead of passing auth as props
- Tokens auto-refresh when needed
- Logout automatically on 401 responses

### API Calls
- Use custom hooks from `useApi.js` for consistent error handling
- Handle loading and error states in components
- Refetch data after mutations (create, update, delete)
- Use filters for efficient data fetching

### Payment Processing
- Always use Stripe Elements for security
- Never handle raw card data
- Implement proper error messages
- Show loading states during payment

### Protected Routes
- Wrap protected pages with `<ProtectedRoute>`
- Redirect to login for unauthorized access
- Check auth state before sensitive operations

---

## Security Considerations

1. **Token Storage**: Tokens stored in localStorage - consider httpOnly cookies for production
2. **HTTPS Only**: Always use HTTPS in production
3. **CORS**: Configure CORS properly on backend
4. **Stripe Keys**: Use environment variables, never hardcode keys
5. **API Validation**: Always validate on both frontend and backend
6. **XSS Prevention**: Sanitize user input before displaying

---

## Troubleshooting

### Login Not Working
- Check API URL in `.env.local`
- Verify backend is running
- Check browser console for errors
- Verify credentials are correct

### API Calls Failing
- Check network tab in DevTools
- Verify Authorization header is present
- Check token hasn't expired
- Verify CORS settings on backend

### Payment Not Processing
- Check Stripe public key is set correctly
- Verify payment amount is in cents
- Check browser console for errors
- Test with Stripe test card: 4242 4242 4242 4242

---

## Next Steps

1. **Implement Backend**: Create API endpoints matching the service definitions
2. **Add Testing**: Unit tests for hooks and components
3. **Error Handling**: More granular error messages and recovery
4. **State Management**: Consider Redux for complex state
5. **Real-time Updates**: Add WebSocket for queue tracking
6. **Analytics**: Track user actions and payment flow

---

## Support & Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Axios Documentation](https://axios-http.com/)
- [React Hooks Documentation](https://react.dev/reference/react/hooks)
- API Documentation: Check backend repository

---

**Version**: 1.0.0  
**Last Updated**: April 15, 2026
