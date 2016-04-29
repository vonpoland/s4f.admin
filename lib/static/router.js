const express = require('express');
const path = require('path');
const maxAge = require('config').get('maxAgeResources');
var router = express.Router();
var staticOptions = { maxAge: maxAge };

var basePath = path.normalize(path.join(__dirname, '../../'));

router.use('/img', express.static(basePath + '/public/img', staticOptions));
router.use('/js', express.static(basePath + '/public/js', staticOptions));
router.use('/css', express.static(basePath + '/public/css', staticOptions));
router.use('/partials', express.static(basePath + '/public/partials', staticOptions));

module.exports = router;