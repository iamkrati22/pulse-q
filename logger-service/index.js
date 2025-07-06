const { Kafka } = require('kafkajs');
const WebSocket = require('ws');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const WS_PORT = process.env.WS_PORT || 8080;

// Kafka setup
const kafka = new Kafka({
  clientId: 'logger-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'logger-group' });

// WebSocket server
const wss = new WebSocket.Server({ port: WS_PORT });

// Store connected clients
const clients = new Set();

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('🔌 New WebSocket client connected');
  clients.add(ws);

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'connection',
    message: 'Connected to Pulse-Q Logger Service',
    timestamp: new Date()
  }));

  ws.on('close', () => {
    console.log('🔌 WebSocket client disconnected');
    clients.delete(ws);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
});

// Broadcast to all connected clients
function broadcastToClients(data) {
  const message = JSON.stringify(data);
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

// Kafka consumer
async function runKafkaConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'feedback-logs', fromBeginning: true });

  console.log('📊 Logger service started - listening to feedback-logs');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const logData = JSON.parse(message.value.toString());
      
      console.log('📝 Received log:', {
        service: logData.service || 'unknown',
        action: logData.action || 'unknown',
        timestamp: logData.timestamp || logData.processedAt
      });

      // Broadcast to all connected WebSocket clients
      const broadcastData = {
        type: 'feedback_log',
        data: logData,
        timestamp: new Date()
      };

      broadcastToClients(broadcastData);
    },
  });
}

// HTTP endpoints for status
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    connectedClients: clients.size,
    timestamp: new Date()
  });
});

app.get('/stats', (req, res) => {
  res.json({
    connectedClients: clients.size,
    kafkaStatus: 'connected',
    timestamp: new Date()
  });
});

// Start HTTP server
app.listen(PORT, () => {
  console.log(`🌐 Logger HTTP server running on port ${PORT}`);
});

// Start WebSocket server
console.log(`🔌 WebSocket server running on port ${WS_PORT}`);

// Start Kafka consumer
runKafkaConsumer().catch(console.error);

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down logger service...');
  await consumer.disconnect();
  wss.close();
  process.exit(0);
}); 