const express = require('express');
const router = express.Router();
const logger = require('../utils/logger');


router.get('/', (req, res) => {
  logger.getProcessLog();  
  //res.status(200).send('Process has been terminated.');  
  process.exit();  
});

module.exports = router;

