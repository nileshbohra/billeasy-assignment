
const { where } = require('sequelize');
const File = require('../db/models/files');
const fileQueue = require('../queues/fileQueue');

exports.uploadFile = async (req, res) => {
    if (req.file) {
        const fileInfo = req.file;
        const { description } = req.body;
        const file = new File({
            user_id: req.user.id,
            original_filename: fileInfo.originalname,
            storage_path: fileInfo.path,
            title: fileInfo.originalname,
            file_size: fileInfo.size,
            file_type: fileInfo.mimetype,
            description: description ? description : '',
            status: 'uploaded'
        })
        const savedFile = await file.save();

        await fileQueue.add('processFile', { fileId: savedFile.id });

        res.status(201).json({ message: 'File uploaded successfully and queued for processing.', fileId: savedFile.id, status: 'uploaded' });

    } else {
        res.status(400).json({ message: 'No file uploaded' });
    }
};

exports.getFileById = async (req, res) => {
    const fileId = req.params.id;
    const userId = req.user.id;
    const file = await File.findOne({
        where: {
            id: fileId,
            user_id: userId
        }
    })
    if (!file) {
        return res.status(404).json({ message: 'File not found' });
    }
    res.json(file);
};