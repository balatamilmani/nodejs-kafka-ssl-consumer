/*
 * Copyright (c) 2024. Balamurugan Tamilmani. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are not permitted.
 */

const { Kafka } = require('kafkajs')
const fs = require('fs')
const path = require('path');
const { KAFKA_BROKER, KAFKA_TOPIC, KAFKA_GROUP_ID, KAFKA_CLIENT_ID } = require('./config');
const logger = require('./logger');

// Create Kafka object
const kafka = new Kafka({
  clientId: KAFKA_CLIENT_ID,
  brokers: [KAFKA_BROKER],
  ssl: {
    rejectUnauthorized: false,
    ca: [fs.readFileSync(path.resolve(__dirname, "./ssl-certificates/ca-cert.pem"), 'utf-8')],
    key: fs.readFileSync(path.resolve(__dirname, "./ssl-certificates/client-key.pem"), 'utf-8'),
    cert: fs.readFileSync(path.resolve(__dirname, "./ssl-certificates/client-cert.pem"), 'utf-8')
  }
})

logger.info(`kafka object created`)

// Create Kafka Consumer
const consumer = kafka.consumer({ groupId: KAFKA_GROUP_ID, groupInstanceId: 'group-ins-id' })
logger.info(`kafka consumer object created`)

/**
 * This method is called when the consumer starts
 */
const main = async () => {
  // Consuming
  await consumer.connect()
  logger.info(`Consumer connected to Kafka`)

  await consumer.subscribe({ topic: KAFKA_TOPIC, fromBeginning: true })
  logger.info(`Consumer subscribed to Topic`)

  // Listener, that executed for every event
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      logger.info({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}

// start the application
main().catch(console.error)