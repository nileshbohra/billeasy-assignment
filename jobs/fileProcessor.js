const { Worker } = require('bullmq');
const File = require('../db/models/modelsList').files;
const { redisConfig } = require('../db/redis/config');

const fileWorker = new Worker('file-processing', async (job) => {
    const { fileId } = job.data;

    const file = await File.findByPk(fileId);
    if (!file) throw new Error('File not found');

    try {
        await file.update({ status: 'processing' });
        console.log('----------------------------------------------')
        console.log(`[jobId: ${job.id}][fileId: ${file.id}] Processing file: ${file.title}`);
        console.log('----------------------------------------------')

        await new Promise((resolve, reject) => setTimeout(resolve, 5000));

        await file.update({ status: 'processed' });
    } catch (err) {
        await file.update({ status: 'failed' });
        throw err;
    }
}, {
    connection: redisConfig
});

fileWorker.on('error', err => {
    console.error('FileProcessing Worker error:', err.message);
});

fileWorker.on('completed', job => {
    console.log('----------------------------------------------')
    console.log(`FileProcessing Job with id: ${job.id} completed`);
    console.log('----------------------------------------------')
});

fileWorker.on('failed', (job, err) => {
    console.error(`FileProcessing Job with id: ${job.id} failed:`, err.message);
});