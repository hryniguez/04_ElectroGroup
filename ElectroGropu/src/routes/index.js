const express = require('express');
const router = express.Router();
const {home,about,contact} = require("../controllers/indexcontrollers")

router
.get('/', home)
.get('/about', about)
.get('/contact', contact)


module.exports = router;
