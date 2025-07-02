// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Email configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// In-memory database for demo purposes
let users = [
  {
    id: 1,
    username: 'demo',
    email: 'user@example.com',
    accountNumber: '0123456789',
    balance: 48750.00,
    transactions: []
  }
];

// Helper functions
const generateTransactionId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomString = '';
  for (let i = 0; i < 6; i++) {
    randomString += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const timestamp = Math.floor(Date.now() / 1000).toString().slice(-6);
  return `FPX-${randomString}-${timestamp}`;
};

const sendEmailNotification = async (user, transaction, type) => {
  try {
    const mailOptions = {
      from: `"FlexiPay Alerts" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `${type === 'credit' ? 'Credit' : 'Debit'} Alert - ${transaction.amount} NGN`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); padding: 20px; color: white;">
            <h2 style="margin: 0; font-size: 20px;">FlexiPay Nigeria</h2>
          </div>
          
          <div style="padding: 20px;">
            <h3 style="color: ${type === 'credit' ? '#38a169' : '#e53e3e'}; margin-top: 0;">
              ${type === 'credit' ? 'Credit Alert' : 'Debit Alert'}
            </h3>
            
            <p>Dear ${user.username},</p>
            
            <p>Your FlexiPay account <strong>${user.accountNumber}</strong> has been ${type === 'credit' ? 'credited' : 'debited'} with:</p>
            
            <div style="background: #f7fafc; padding: 15px; border-radius: 6px; margin: 15px 0; text-align: center;">
              <p style="margin: 0; font-size: 24px; font-weight: bold; color: ${type === 'credit' ? '#38a169' : '#e53e3e'}">
                ${type === 'credit' ? '+' : '-'}₦${transaction.amount.toLocaleString()}
              </p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold; width: 40%;">Transaction ID:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${transaction.id}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">${type === 'credit' ? 'Sender' : 'Recipient'}:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${transaction.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">${transaction.bank === 'MTN' || transaction.bank === 'Airtel' || transaction.bank === 'Glo' || transaction.bank === '9mobile' ? 'Phone Number' : 'Account Number'}:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${transaction.account}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Bank/Provider:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${transaction.bank}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Description:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${transaction.description}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">Date:</td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${new Date(transaction.date).toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Available Balance:</td>
                <td style="padding: 8px;">₦${user.balance.toLocaleString()}</td>
              </tr>
            </table>
            
            <p style="margin-top: 20px;">
              ${type === 'debit' ? 'If you did not initiate this transaction, please contact our support immediately.' : ''}
            </p>
            
            <p>Thank you for banking with us.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #718096;">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>FlexiPay MFB, Lagos, Nigeria</p>
            </div>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email notification sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
};

// API Routes

// Get user data
app.get('/api/user', (req, res) => {
  const user = users[0]; // For demo, we'll just use the first user
  res.json({
    username: user.username,
    accountNumber: user.accountNumber,
    balance: user.balance,
    transactions: user.transactions.slice(0, 10) // Return only recent transactions
  });
});

// Create new user
app.post('/api/users', (req, res) => {
  const { username, email, initialBalance } = req.body;
  
  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required' });
  }
  
  const newUser = {
    id: users.length + 1,
    username,
    email,
    accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    balance: parseFloat(initialBalance) || 0,
    transactions: []
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// Process transaction
app.post('/api/transactions', async (req, res) => {
  const { type, amount, name, description, bank, account } = req.body;
  const user = users[0]; // For demo, we'll just use the first user
  
  if (!type || !amount || !name) {
    return res.status(400).json({ error: 'Type, amount and name are required' });
  }
  
  if (type === 'debit' && amount > user.balance) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }
  
  const transaction = {
    id: generateTransactionId(),
    type,
    amount: parseFloat(amount),
    name,
    date: new Date().toISOString(),
    description: description || (type === 'credit' ? 'Credit transaction' : 'Debit transaction'),
    bank: bank || 'FlexiPay MFB',
    account: account || user.accountNumber
  };
  
  // Update user balance
  user.balance = type === 'credit' 
    ? user.balance + transaction.amount 
    : user.balance - transaction.amount;
  
  // Add transaction to user's history
  user.transactions.unshift(transaction);
  
  // Send email notification
  try {
    await sendEmailNotification(user, transaction, type);
  } catch (error) {
    console.error('Failed to send email notification:', error);
  }
  
  res.status(201).json({
    balance: user.balance,
    transaction
  });
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});