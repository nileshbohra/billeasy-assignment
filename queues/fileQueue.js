const { Queue } = require('bullmq');
const { redisConfig } = require('../db/redis/config');

const fileQueue = new Queue('file-processing', {
    connection: redisConfig
});

module.exports = fileQueue;
