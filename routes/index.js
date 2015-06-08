var express = require('express');
var path = require('path');
var router = express.Router();
var config = require('../config');
var url = require('url');
var authParsedUrl = url.parse(config.RestApiServer);
var http = ('https:' == authParsedUrl.protocol) ? require('https') : require('http');
var companyIcon = '';



/* GET Test page. */
router.get('/test', function (req, res) {
    
   res.send(authParsedUrl);
    
//    res.send(req.session.lang);
});

/* GET home page. */
router.get('/', function (req, res) {
        res.render('index', {
            title: 'Node JS Server Test'
        });
});

module.exports = router;

function value(obj) {
    if ( obj == undefined ) {
        return '""'
    } else {
        return '"' + obj + '"';
    }
}