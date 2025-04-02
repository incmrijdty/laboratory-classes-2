const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');


router.get('/', (req, res) => {
  logger.getProcessLog();  
  process.exit();  
});

module.exports = router;

