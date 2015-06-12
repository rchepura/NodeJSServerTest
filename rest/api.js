var express = require('express');
var router = express.Router();
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var config = require('../config');
var url = require('url');


/* rest api GET. */
router.get('/*', function (req, res) {
    var actUrl = config.APIServer;
    
//    if ( !req.session.sa_access_token && !req.session.access_token ) {
//        res.send({
//            success: false
//            , message: "Authorization Failed."
//            , data: req.query
//        });
//        return;
//    }   

//    req.headers.Authorization = req.session.sa_access_token || req.session.access_token;

    console.log('API Url: ' + actUrl);

    console.log('REQUEST DUMP HEADERS: ');
    console.log(req.headers);

    apiProxy.web(req, res, {        
        target: actUrl
    }, function (err) {
        res.send({
            success: false,
            message: err
        });
    });
});

var request = require('request');

/* rest api POST. */
router.post('/*', function (req, res) {
    var actUrl = config.APIServer;
    var body = JSON.stringify(req.body || {});
    
    if ( !req.session.sa_access_token && !req.session.access_token ) {
        res.send({
            success: false
            , message: "Authorization Failed."
            , dataQuery: req.query
            , dataBody: req.body
        });
        return;
    }
    
    req.headers.Authorization = req.session.sa_access_token || req.session.access_token;
    
    console.log('POST API Url: ' + actUrl);
    console.log('POST BODY: ');
    console.log(body);
    
    console.log('POST DUMP HEADERS: ');
    console.log(req.headers);


    req.pipe(request.post(actUrl + req.url, {
        body: body
    }, function (err, httpResponse, resBody) {
        if ( err ) {
            console.log('ERROR: ');
            console.log(err);
        } else {
//            console.log('PUT httpResponse: ');
//            console.log(httpResponse);
            console.log('PUT RESPONSE DUMP BODY: ');
            console.log(resBody);
        }
    })).pipe(res);
});

/* rest api PUT. */
router.put('/*', function (req, res) {
    var actUrl = config.APIServer;
    var body = JSON.stringify(req.body || {});
    
    if ( !req.session.sa_access_token && !req.session.access_token ) {
        res.send({
            success: false
            , message: "Authorization Failed."
            , dataQuery: req.query
            , dataBody: req.body
        });
        return;
    }
    
    req.headers.Authorization = req.session.sa_access_token || req.session.access_token;
    
    console.log('PUT API Url: ' + actUrl);
    console.log('PUT BODY: ');
    console.log(body);


    console.log('PUT REQUEST DUMP HEADERS: ');
    console.log(req.headers);

    req.pipe(request.put(actUrl + req.url, {
        body: body
    }, function (err, httpResponse, resBody) {
        if ( err ) {
            console.log('ERROR: ');
            console.log(err);
        } else {
//            console.log('PUT httpResponse: ');
//            console.log(httpResponse);
            console.log('PUT RESPONSE DUMP BODY: ');
            console.log(resBody);            
        }
    })).pipe(res);
});

/* rest api DELETE. */
router.delete('/*', function (req, res) {
    var actUrl = config.APIServer;
    
    if ( !req.session.sa_access_token && !req.session.access_token ) {
        res.send({
            success: false
            , message: "Authorization Failed."
            , data: req.query
        });
        return;
    }   

    req.headers.Authorization = req.session.sa_access_token || req.session.access_token;

    console.log('DELETE API Url: ' + actUrl);

    console.log('DELETE REQUEST DUMP HEADERS: ');
    console.log(req.headers);

    apiProxy.web(req, res, {        
        target: actUrl
    }, function (err) {
        res.send({
            success: false,
            message: err
        });
    });
});

module.exports = router;