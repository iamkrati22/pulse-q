const { Kafka } = require('kafkajs');
require('dotenv').config();

const kafka = new Kafka({
  clientId: 'router-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'router-group' });
const producer = kafka.producer();

const CATEGORY_TOPICS = {
  complaints: 'feedback-complaints',
  suggestions: 'feedback-suggestions',
  praise: 'feedback-praise',
};

async function run() {
  await consumer.connect();
  await producer.connect();
  await consumer.subscribe({ topic: 'feedback-submitted', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const feedback = JSON.parse(message.value.toString());
      const { category } = feedback;
      let targetTopic = CATEGORY_TOPICS[category?.toLowerCase()];
      if (!targetTopic) {
        console.log('Unknown category:', category);
        return;
      }
      // Republish to category topic
      await producer.send({
        topic: targetTopic,
        messages: [{ value: JSON.stringify(feedback) }],
      });
      // Log to feedback-logs
      await producer.send({
        topic: 'feedback-logs',
        messages: [{ value: JSON.stringify({ ...feedback, routedTo: targetTopic, routedAt: new Date() }) }],
      });
      console.log(`Routed feedback to ${targetTopic} and logged.`);
    },
  });
}

run().catch(console.error); 