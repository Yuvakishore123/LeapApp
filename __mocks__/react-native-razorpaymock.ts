const RazorpayCheckout = {
  open: jest.fn(() => Promise.resolve({razorpay_payment_id: 'mockPaymentId'})),
};

export default RazorpayCheckout;
