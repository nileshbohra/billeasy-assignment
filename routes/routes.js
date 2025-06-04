const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const filesRoutes = require('./filesRoutes');
const usersRoutes = require('./usersRoutes');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.use('/auth', authRoutes);
router.use('/files', authMiddleware, filesRoutes);
router.use('/users', authMiddleware, usersRoutes);

module.exports = router;