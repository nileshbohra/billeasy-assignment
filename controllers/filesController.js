const File = require('../db/models/files');
const fileQueue = require('../queues/fileQueue');

exports.uploadFile = async (req, res) => {
    try {
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
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};

exports.getFileById = async (req, res) => {
    try {
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
        res.status(200).json(file);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).json({ message: 'Error fetching file' });
    }
};

exports.getAllFilesByUserId = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const userId = req.user.id;
        const files = await File.findAll({
            where: {
                user_id: userId
            },
            offset,
            limit
        });
        res.status(200).json(files);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ message: 'Error fetching files' });
    }
};