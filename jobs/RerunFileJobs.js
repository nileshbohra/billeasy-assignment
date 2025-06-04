const File = require('../db/models/modelsList').files;
const { Op } = require('sequelize');
const { redisConfig } = require('../db/redis/config');
const Queue = require('../queues/fileQueue');

const reRun = async () => {
    const files = await File.findAll({
        where: {
            status: {[Op.or] : ['failed', 'processing']}
        }
    });
    if (files.length === 0) {
        console.log('No files found');
        return;
    } else {
        for (const file of files) {
            const job = await Queue.add('file-processing', { fileId: file.id });
            console.log(`[jobId: ${job.id}][fileId: ${file.id}] Rerun file: ${file.title}`);
        }
    }
}

exports.reRun = reRun;