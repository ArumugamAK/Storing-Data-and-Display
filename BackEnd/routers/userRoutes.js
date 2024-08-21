const express = require('express');
const { getAllUsers } = require('../controller/usercontroller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getAllUsers);
const express = require('express');
router.get('/profile', verifyToken, getProfile);

module.exports = router;

module.exports = router;
