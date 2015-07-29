http = require('http');
querystring = require('querystring');

var elastic = Elastic.prototype;

function Elastic(args) {
    this.options = {
        hostname: '127.0.0.1'
        //hostname: '192.168.33.1'
        ,port: 9200
        ,path: '/movies'
        ,method: 'PUT'
    };
    this._options = this.options;
}

elastic.performRequest = function(data) {
    var req = http.request(this.options,function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    });
    if(data) {
        req.write(data);
    }
    req.end();
    this.options = this._options;
}

elastic.sendUserData = function(user) {
    this.options.path = '/movies/user/'+user.id;
    this.performRequest(JSON.stringify(user));
};

elastic.deleteUser = function(id) {
    this.options.path = '/movies/user/'+id;
    this.options.method = 'DELETE';
    this.performRequest();
}

elastic.search = function(endPoint, query) {
    this.options.path = endPoint;
    this.options.method = 'POST';
    this.performRequest(JSON.stringify(query));
};

elastic.addOneMovieToAnExistingUser = function(id, media) {
    this.options.path = '/movies/user/'+id+'/_update';
    this.options.method  = 'POST';
    this.performRequest(JSON.stringify({
        script_file: "update-user-media"
        ,params: {
            "new_media": media
        }
    }));
}

module.exports = Elastic;