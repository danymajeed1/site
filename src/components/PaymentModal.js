// src/components/PaymentModal.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PaymentModal = ({ isOpen, onClose, packageInfo }) => {
  // If no package is selected yet, don't render content
  if (!packageInfo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="payment-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="payment-card"
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="payment-header">
              <h3>Confirm Selection</h3>
              <button className="close-btn" onClick={onClose}>×</button>
            </div>

            <div className="payment-body">
              <div className="item-summary">
                <span className="item-label">Package</span>
                {/* DYNAMIC TITLE */}
                <span className="item-value">{packageInfo.title}</span>
              </div>
              <div className="item-summary">
                <span className="item-label">Total</span>
                {/* DYNAMIC PRICE */}
                <span className="item-price">{packageInfo.price}</span>
              </div>
              
              <div className="payment-methods-preview">
                <span> Pay</span>
                <span>G Pay</span>
                <span>Card</span>
              </div>
            </div>

            {/* DYNAMIC LINK: Goes to the specific Stripe URL for this package */}
            <a 
              href={packageInfo.stripeUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="stripe-checkout-btn"
            >
              Proceed to Booking
            </a>

            <p className="security-note">
              Payments processed securely by <strong>Stripe</strong>.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;