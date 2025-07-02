require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Path validation middleware (FIRST)
app.use((req, res, next) => {
  const path = req.path;
  console.log(`Incoming request - Method: ${req.method}, Path: ${path}, URL: ${req.originalUrl}`);
  if (path.includes('://')) {
    console.warn(`Rejected invalid path: ${path}`);
    return res.status(400).json({
      status: 'error',
      message: `Invalid URL in request path: ${path}`
    });
  }
  next();
});

// Enhanced Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Secure Email Configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false // Only for development
  }
});

// Enhanced In-Memory Database
let users = [
  {
    id: 1,
    username: 'demo',
    email: 'user@example.com',
    accountNumber: '0123456789',
    balance: 48750.00,
    transactions: [],
    createdAt: new Date().toISOString()
  }
];

// Improved Helper Functions
const generateTransactionId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return `FPX-${Array.from({ length: 6 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length))
  ).join('')}-${Date.now().toString().slice(-6)}`;
};

const sendEmailNotification = async (user, transaction, type) => {
  try {
    const mailOptions = {
      from: `"FlexiPay Alerts" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: `${type === 'credit' ? 'Credit' : 'Debit'} Alert - ₦${transaction.amount.toLocaleString()}`,
      html: generateEmailTemplate(user, transaction, type)
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${user.email}`);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email notification');
  }
};

const generateEmailTemplate = (user, transaction, type) => {
  // ... (keep your existing email template code)
  return `...`;
};

// Enhanced API Routes
app.get('/api/user', (req, res, next) => {
  try {
    const user = users[0];
    if (!user) throw new Error('User not found');

    res.json({
      status: 'success',
      data: {
        username: user.username,
        accountNumber: user.accountNumber,
        balance: user.balance,
        transactions: user.transactions.slice(0, 10)
      }
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/users', async (req, res, next) => {
  try {
    const { username, email, initialBalance } = req.body;

    if (!username || !email) {
      return res.status(400).json({
        status: 'error',
        message: 'Username and email are required'
      });
    }

    const newUser = {
      id: users.length + 1,
      username,
      email,
      accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      balance: parseFloat(initialBalance) || 0,
      transactions: [],
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

    res.status(201).json({
      status: 'success',
      data: newUser
    });
  } catch (error) {
    next(error);
  }
});

app.post('/api/transactions', async (req, res, next) => {
  try {
    const { type, amount, name, description, bank, account } = req.body;
    const user = users[0];

    if (!['credit', 'debit'].includes(type)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid transaction type'
      });
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid amount'
      });
    }

    if (type === 'debit' && amountNum > user.balance SCAN) {
      return res.status(400).json({
        status: 'error',
        message: 'Insufficient balance'
      });
    }

    const transaction = {
      id: generateTransactionId(),
      type,
      amount: amountNum,
      name,
      date: new Date().toISOString(),
      description: description || `${type} transaction`,
      bank: bank || 'FlexiPay MFB',
      account: account || user.accountNumber,
      status: 'completed'
    };

    user.balance = type === 'credit'
      ? user.balance + transaction.amount
      : user.balance - transaction.amount;

    user.transactions.unshift(transaction);

    sendEmailNotification(user, transaction, type)
      .catch(e => console.error('Email sending failed:', e));

    res.status(201).json({
      status: 'success',
      data: {
        balance: user.balance,
        transaction
      }
    });
  } catch (error) {
    next(error);
  }
});

// Updated catch-all route
app.get('*', (req, res) => {
  const path = req.path;
  if (path.includes('://')) {
    console.warn(`Catch-all route received invalid path: ${path}`);
    return res.status(400).json({
      status: 'error',
      message: `Invalid route path: ${path}`
    });
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});