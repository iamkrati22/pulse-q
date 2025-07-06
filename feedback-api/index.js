const express = require('express');
const { Kafka } = require('kafkajs');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Kafka setup
const kafka = new Kafka({
  clientId: 'feedback-api',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'feedback-api',
    timestamp: new Date()
  });
});

// Feedback submission endpoint
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, category, message } = req.body;

    // Validate required fields
    if (!category || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'Category and message are required'
      });
    }

    // Validate category
    const validCategories = ['complaint', 'suggestion', 'praise', 'other'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid category. Must be one of: complaint, suggestion, praise, other'
      });
    }

    // Create feedback object
    const feedback = {
      name: name || 'Anonymous',
      email: email || '',
      category,
      message,
      timestamp: new Date().toISOString()
    };

    // Connect to Kafka producer
    await producer.connect();

    // Send feedback to Kafka
    await producer.send({
      topic: 'feedback-submitted',
      messages: [{ 
        value: JSON.stringify(feedback) 
      }],
    });

    console.log('📝 Feedback submitted:', {
      from: feedback.name,
      category: feedback.category,
      timestamp: feedback.timestamp
    });

    // Disconnect producer
    await producer.disconnect();

    res.status(200).json({
      status: 'success',
      message: 'Feedback submitted successfully!',
      data: feedback
    });

  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Feedback API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down feedback API...');
  await producer.disconnect();
  process.exit(0);
}); 