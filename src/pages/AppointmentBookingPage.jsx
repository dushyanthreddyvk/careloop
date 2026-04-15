import { motion } from "framer-motion";
import { CalendarClock, CheckCircle2, CreditCard, Smartphone, Wallet } from "lucide-react";
import { useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { Button } from "../components/Button";

const CONSULTATION_FEE = 99900; // Amount in cents ($999.00)

export function AppointmentBookingPage({ selectedDoctor, onConfirm }) {
  const [step, setStep] = useState('details'); // details, payment, confirmation
  const [paymentMethod, setPaymentMethod] = useState(''); // creditCard, debitCard, upi
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
  });
  const [upiId, setUpiId] = useState('');
  
  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  const paymentMethods = [
    {
      id: 'creditCard',
      name: 'Credit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'debitCard',
      name: 'Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, RuPay',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: Smartphone,
      description: 'Google Pay, PhonePe, PayTM',
      color: 'bg-orange-50 border-orange-200'
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConfirmDetails = () => {
    if (!formData.patientName || !formData.phoneNumber || !formData.preferredDate) {
      alert('Please fill in all required fields');
      return;
    }
    setStep('payment');
  };

  const validatePaymentDetails = () => {
    if (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') {
      if (!cardDetails.cardNumber || !cardDetails.cardHolderName || !cardDetails.expiryDate || !cardDetails.cvv) {
        alert('Please fill in all card details');
        return false;
      }
      if (cardDetails.cardNumber.length < 13) {
        alert('Please enter a valid card number');
        return false;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId) {
        alert('Please enter your UPI ID');
        return false;
      }
      if (!upiId.includes('@')) {
        alert('Please enter a valid UPI ID (e.g., yourname@upi)');
        return false;
      }
    }
    return true;
  };

  const handlePaymentSuccess = () => {
    if (!validatePaymentDetails()) {
      return;
    }
    setStep('confirmation');
    setTimeout(() => {
      onConfirm();
    }, 1500);
  };
  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] border border-white/80 bg-white/90 p-6"
      >
        {step === 'details' && (
          <>
            <SectionHeader
              eyebrow="Appointment Booking"
              title="Confirm a seamless OPD visit"
              subtitle="Review provider details, date preferences, and appointment notes."
            />

        <div className="grid gap-4 md:grid-cols-2">
          {[
            { label: 'Patient Name', name: 'patientName' },
            { label: 'Phone Number', name: 'phoneNumber' },
            { label: 'Preferred Date', name: 'preferredDate' },
            { label: 'Preferred Time', name: 'preferredTime' },
          ].map((field, index) => (
            <motion.label
              key={field.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="block"
            >
              <span className="mb-2 block text-sm font-medium text-slate-700">
                {field.label}
              </span>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type={field.name === 'preferredDate' ? 'date' : 'text'}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                placeholder={field.label}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,165,233,0.12)]"
              />
            </motion.label>
          ))}
        </div>

        <label className="mt-4 block">
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Consultation Notes
          </span>
          <motion.textarea
            whileFocus={{ scale: 1.005 }}
            rows="4"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Describe symptoms or visit purpose"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,165,233,0.12)]"
          />
        </label>

            <Button className="mt-6" onClick={handleConfirmDetails}>
              Proceed to Payment
            </Button>
          </>
        )}

        {step === 'payment' && (
          <>
            <SectionHeader
              eyebrow="Payment"
              title="Secure payment processing"
              subtitle="Complete your consultation booking with secure payment."
            />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 space-y-6"
            >
              {/* Consultation Fee */}
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Consultation Fee</span>
                  <span className="font-semibold text-slate-900">${(CONSULTATION_FEE / 100).toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              {!paymentMethod ? (
                <>
                  <div>
                    <p className="mb-4 font-semibold text-slate-900">Select Payment Method</p>
                    <div className="grid gap-3 md:grid-cols-3">
                      {paymentMethods.map((method) => {
                        const Icon = method.icon;
                        return (
                          <motion.button
                            key={method.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`rounded-[24px] border-2 p-4 text-left transition ${method.color}`}
                          >
                            <Icon className="h-6 w-6 text-slate-700" />
                            <h3 className="mt-2 font-semibold text-slate-900">{method.name}</h3>
                            <p className="mt-1 text-xs text-slate-600">{method.description}</p>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Credit Card / Debit Card Payment Form */}
                  {(paymentMethod === 'creditCard' || paymentMethod === 'debitCard') && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 rounded-[24px] border border-slate-200 bg-slate-50 p-6"
                    >
                      <div>
                        <p className="mb-4 font-semibold text-slate-900">
                          {paymentMethod === 'creditCard' ? 'Credit Card Details' : 'Debit Card Details'}
                        </p>
                        
                        <div className="space-y-3">
                          <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                              Card Number
                            </label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={cardDetails.cardNumber}
                              onChange={handleCardChange}
                              placeholder="1234 5678 9012 3456"
                              maxLength="16"
                              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.12)]"
                            />
                          </div>

                          <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              name="cardHolderName"
                              value={cardDetails.cardHolderName}
                              onChange={handleCardChange}
                              placeholder="John Doe"
                              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.12)]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="mb-1 block text-sm font-medium text-slate-700">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                name="expiryDate"
                                value={cardDetails.expiryDate}
                                onChange={handleCardChange}
                                placeholder="MM/YY"
                                maxLength="5"
                                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.12)]"
                              />
                            </div>
                            <div>
                              <label className="mb-1 block text-sm font-medium text-slate-700">
                                CVV
                              </label>
                              <input
                                type="password"
                                name="cvv"
                                value={cardDetails.cvv}
                                onChange={handleCardChange}
                                placeholder="123"
                                maxLength="3"
                                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.12)]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* UPI Payment Form */}
                  {paymentMethod === 'upi' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 rounded-[24px] border border-slate-200 bg-slate-50 p-6"
                    >
                      <div>
                        <p className="mb-4 font-semibold text-slate-900">UPI Details</p>
                        
                        <div>
                          <label className="mb-1 block text-sm font-medium text-slate-700">
                            UPI ID
                          </label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="yourname@googleplay or yourphone@paytm"
                            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-sky-400 focus:shadow-[0_0_0_4px_rgba(14,165,233,0.12)]"
                          />
                          <p className="mt-2 text-xs text-slate-600">
                            Supported: Google Pay, PhonePe, PayTM, WhatsApp Pay
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Demo Info */}
                  <div className="rounded-[24px] border border-sky-200 bg-sky-50 p-4">
                    <div className="flex items-start gap-3">
                      <CreditCard className="mt-0.5 h-5 w-5 text-sky-600" />
                      <div>
                        <p className="font-medium text-sky-900">Demo Payment</p>
                        <p className="mt-1 text-sm text-sky-700">
                          No real charges will be made in demo mode. Click "Confirm Payment" to proceed.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="mt-6 w-full bg-green-600 hover:bg-green-700"
                    onClick={handlePaymentSuccess}
                  >
                    Confirm Payment & Book Appointment
                  </Button>
                  
                  <Button 
                    variant="secondary"
                    className="w-full"
                    onClick={() => {
                      setPaymentMethod('');
                      setCardDetails({ cardNumber: '', cardHolderName: '', expiryDate: '', cvv: '' });
                      setUpiId('');
                    }}
                  >
                    Change Payment Method
                  </Button>
                </>
              )}
              
              <Button 
                variant="secondary"
                className="w-full"
                onClick={() => setStep('details')}
              >
                Back to Details
              </Button>
            </motion.div>
          </>
        )}

        {step === 'confirmation' && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center gap-4 py-12"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">Appointment Confirmed!</h3>
              <p className="text-center text-slate-600">
                Your appointment with {selectedDoctor?.name || 'Dr. Aarya Menon'} has been successfully booked and paid.
              </p>
              <div className="mt-4 rounded-[24px] bg-green-50 p-4 text-center">
                <p className="text-sm text-slate-600">Your booking reference</p>
                <p className="mt-2 font-semibold text-green-700">APT-{Date.now().toString().slice(-6)}</p>
              </div>
            </motion.div>
          </>
        )}
      </motion.section>

      <motion.aside
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="space-y-4"
      >
        <div className="rounded-[32px] border border-white/80 bg-slate-950 p-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
            Selected Doctor
          </p>
          <h3 className="mt-3 text-2xl font-semibold">
            {selectedDoctor?.name ?? "Dr. Aarya Menon"}
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            {selectedDoctor?.specialty ?? "Cardiology"} ·{" "}
            {selectedDoctor?.hospital ?? "CARELOOP Medical Center"}
          </p>
          <div className="mt-6 rounded-[24px] border border-white/10 bg-white/10 p-4">
            <div className="flex items-center gap-3">
              <CalendarClock className="h-5 w-5 text-sky-300" />
              <div>
                <p className="text-sm text-slate-300">Fastest available slot</p>
                <p className="font-semibold text-white">Today, 5:30 PM</p>
              </div>
            </div>
          </div>

          {step === 'payment' && (
            <div className="mt-4 border-t border-white/20 pt-4">
              <p className="text-xs text-slate-400">Consultation Fee</p>
              <p className="mt-1 text-2xl font-semibold text-white">${(CONSULTATION_FEE / 100).toFixed(2)}</p>
            </div>
          )}
        </div>

        <div className="rounded-[32px] border border-white/80 bg-white/90 p-6">
          <h3 className="text-lg font-semibold text-slate-900">What’s included</h3>
          <div className="mt-4 space-y-3">
            {[
              "Digital token and queue update",
              "Consultation summary added to records",
              "Prescription-ready post visit workflow",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-500" />
                <p className="text-sm text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.aside>
    </div>
  );
}
