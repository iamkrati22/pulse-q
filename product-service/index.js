const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
  clientId: 'product-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'product-group' });
const producer = kafka.producer();

async function run() {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: 'feedback-suggestions', fromBeginning: true });

  console.log('Product service started - listening to feedback-suggestions');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const feedback = JSON.parse(message.value.toString());
      const { name, email, category, message: feedbackMessage, timestamp } = feedback;
      
      console.log('💡 Product received suggestion:', {
        from: name,
        email,
        message: feedbackMessage,
        timestamp
      });

      // Process the suggestion (in a real app, this would trigger product roadmap updates)
      const processedSuggestion = {
        ...feedback,
        processedBy: 'product-service',
        processedAt: new Date(),
        status: 'reviewed',
        priority: 'medium' // suggestions are medium priority
      };

      // Log to feedback-logs
      await producer.send({
        topic: 'feedback-logs',
        messages: [{ 
          value: JSON.stringify({
            ...processedSuggestion,
            service: 'product',
            action: 'suggestion_reviewed'
          })
        }],
      });

      console.log('✅ Suggestion reviewed and logged');
    },
  });
}

run().catch(console.error); 