const express = require('express');
const router = express.Router();
const users = require('../data/users');
const { generarToken, verificarToken } = require('../middlewares/authMiddleware');
