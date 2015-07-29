/**
 * Media Graph with link between media while user goes from one media to the other
 * Links are from a media to a media. The Weight of a link represent the number of 
 * users that went from media A to media B 
 */

var express = require('express');
var app = express();


Graph = require('../model/graph.js');
User = require('../model/user.js');

var graph = new Graph();
var users = {};

// add info and get suggestions
app.get('/suggest', function(req, res){
    if(!req.query.userid) {
        res.status(480).send('Missing field: userid');
        return;
    }
    if( (!req.query.mediaidfrom && !req.query.mediaid) || (!req.query.mediaid) ) {
        res.status(480).send('Missing field: mediaid[from]');
        return;
    }
    var mediaid = null, mediaidfrom = null;
    // if we don't have the TO and FROM we need to store it until we get a second id
    if( req.query.mediaid ){
        // first visit
        if( !users[req.query.userid] ){
            users[req.query.userid] = new User();
            console.log('user created: '+req.query.userid);
        }
        var mediaCount = users[req.query.userid].addMedia(req.query.mediaid);
        if( mediaCount > 1 ){
            mediaidfrom = users[req.query.userid].shiftMedia();
            mediaid = users[req.query.userid].getFirstMedia();
        }
    } else {
        mediaidfrom = req.query.mediaidfrom;
        mediaid = req.query.mediaid;
    }
    // if we have the TO and FROM we can directly create the link
    if( mediaid && mediaidfrom && mediaid != mediaidfrom ){
        graph.addNode(new Node({id: mediaidfrom}));
        graph.addNode(new Node({id: mediaid}));
        graph.addLink(new Link({source: mediaidfrom, target: mediaid}));
        console.log('media linked: '+mediaidfrom+' -> '+mediaid);      
    }
    var mediaList = [];
    // search for linked media for the current media
    mediaList = graph.getNodeList(mediaid);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(mediaList));
    res.end();
});

// retrieve all the data structure
app.get('/json', function(req, res){
    res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    res.write(JSON.stringify(graph.getData()));
    res.end();
});

var server = app.listen(9100, function () {
    console.log('Server ready. Listening to: '+server.address().address+' port '+server.address().port);
})

process.on('SIGINT', function() {
    server.close();
    process.exit(1);
});
