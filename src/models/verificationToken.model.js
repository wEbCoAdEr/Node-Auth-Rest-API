/**
 * Module for defining the Password Reset Token schema and creating the model.
 * @module PasswordResetToken
 */

// Load required dependencies
const mongoose = require('mongoose');

// Define the Password Refresh Token schema
const VerificationTokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  verificationCode: {
    type: Number,
    required: true,
    minLength: 6,
    maxLength: 6
  },
  token: {
    type: String,
    required: true,
    index: true
  },
  ip: {
    type: String,
    required: true
  },
  expires: {
    type: Date, // Store expiration time as a Date object
    required: true
  },
  type: {
    type: String,
    enum: ['accountVerification', 'passwordReset'],
    required: true
  }
}, { timestamps: true });


// Create the RefreshToken model
const VerificationToken = mongoose.model('VerificationToken', VerificationTokenSchema);

module.exports = VerificationToken; // Export the PasswordResetToken model
