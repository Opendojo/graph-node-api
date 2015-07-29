var express = require('express');
var app = express();

Media = require('../model/media.js');
User = require('../model/user.js');

var memoryStructure = {
    media: {}
    ,users: {}
};

app.get('/*', function(req,res){
    if(!req.query.userid || !req.query.mediaid) {
        res.status(404).send('Image not found').end;
        return;
    }
    // get current movie information while keeping trakc of movie usage
    var userId = req.query.userid;
    var mediaId = req.query.mediaid;
    // optional
    var userInfo = {};
    if (req.query.userinfo) {
        userInfo = req.query.userinfo;
    }
    var mediaInfo = {};
    if (req.query.mediainfo) {
        userInfo = req.query.mediainfo;
    }
    // store this info into the global service
    var currentUser = new User({id: userId});
    var currentMedia = new Media({id: mediaId});
    // store everything in memory structure
    if(!memoryStructure.users[currentUser.id]){
        currentUser.mediaIds[currentMedia.id] = true;
        memoryStructure.users[currentUser.id] = currentUser;
    } else {
        memoryStructure.users[currentUser.id].mediaIds[currentMedia.id] = true;
    }
    if(!memoryStructure.media[currentMedia.id]){
        memoryStructure.media[currentMedia.id] = currentMedia;
        memoryStructure.media[currentMedia.id].userIds[currentUser.id] = true;
    } else {
        memoryStructure.media[currentMedia.id].viewcount += 1;
        memoryStructure.media[currentMedia.id].watched = currentMedia.watched;
        memoryStructure.media[currentMedia.id].userIds[currentUser.id] = true;
    }
    console.log(memoryStructure);
    // return a list of appropriate media
    var mediaList = [];
    for(userId in memoryStructure.media[currentMedia.id].userIds){
        console.log("found: "+userId);
        for(mediaId in memoryStructure.users[userId].media){
            console.log("found media: "+mediaId);
            mediaList.push(mediaId);
        }
    }
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(mediaList)).end;
});

var server = app.listen(9100, function () {

})

process.on('SIGINT', function() {
  server.close();
  process.exit(1);
});