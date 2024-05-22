const express = require('express');
const adminRoutes = require('./v1/adminRoute');
const employeeRoutes = require('./v1/employeeRoute');

const router = express.Router();


router.use('/v1', adminRoutes)

router.use('/v1',employeeRoutes)

module.exports = router;