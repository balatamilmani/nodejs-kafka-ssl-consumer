/*
 * Copyright (c) 2024. Balamurugan Tamilmani. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are not permitted.
 */

require('dotenv').config();

module.exports = {
    KAFKA_BROKER: process.env.KAFKA_BROKER,
    KAFKA_TOPIC: process.env.KAFKA_TOPIC,
    KAFKA_GROUP_ID: process.env.KAFKA_GROUP_ID,
    KAFKA_CLIENT_ID: process.env.KAFKA_CLIENT_ID,
};