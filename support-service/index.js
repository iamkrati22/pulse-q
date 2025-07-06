const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
  clientId: 'support-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'support-group' });
const producer = kafka.producer();

async function run() {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: 'feedback-complaints', fromBeginning: true });

  console.log('Support service started - listening to feedback-complaints');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const feedback = JSON.parse(message.value.toString());
      const { name, email, category, message: feedbackMessage, timestamp } = feedback;
      
      console.log('📧 Support received complaint:', {
        from: name,
        email,
        message: feedbackMessage,
        timestamp
      });

      // Process the complaint (in a real app, this would trigger support workflows)
      const processedComplaint = {
        ...feedback,
        processedBy: 'support-service',
        processedAt: new Date(),
        status: 'received',
        priority: 'high' // complaints are high priority
      };

      // Log to feedback-logs
      await producer.send({
        topic: 'feedback-logs',
        messages: [{ 
          value: JSON.stringify({
            ...processedComplaint,
            service: 'support',
            action: 'complaint_processed'
          })
        }],
      });

      console.log('✅ Complaint processed and logged');
    },
  });
}

run().catch(console.error); 