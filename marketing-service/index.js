const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
  clientId: 'marketing-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'marketing-group' });
const producer = kafka.producer();

async function run() {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: 'feedback-praise', fromBeginning: true });

  console.log('Marketing service started - listening to feedback-praise');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const feedback = JSON.parse(message.value.toString());
      const { name, email, category, message: feedbackMessage, timestamp } = feedback;
      
      console.log('🌟 Marketing received praise:', {
        from: name,
        email,
        message: feedbackMessage,
        timestamp
      });

      // Process the praise (in a real app, this would trigger testimonial collection)
      const processedPraise = {
        ...feedback,
        processedBy: 'marketing-service',
        processedAt: new Date(),
        status: 'collected',
        priority: 'low' // praise is low priority but valuable for marketing
      };

      // Log to feedback-logs
      await producer.send({
        topic: 'feedback-logs',
        messages: [{ 
          value: JSON.stringify({
            ...processedPraise,
            service: 'marketing',
            action: 'praise_collected'
          })
        }],
      });

      console.log('✅ Praise collected and logged');
    },
  });
}

run().catch(console.error); 