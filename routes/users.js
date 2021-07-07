var express = require('express');
var router = express.Router();
var insertUser= require('../controller/users');

router.get('/register', insertUser.userForm);
router.post('/login', insertUser.createData);

module.exports = router;