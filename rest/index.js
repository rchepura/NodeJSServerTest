var express = require('express');
var router = express.Router();

/* rest api. */
router.get('/', function (req, res) {
    res.send({
        success: true,
        data: {test: 'test'}
    });
});

module.exports = router;