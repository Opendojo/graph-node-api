Media = require('./model/media.js');
User = require('./model/user.js');
Elastic = require('./model/elastic.js');
MediaTitles = require('./model/mediaTitles.js');

var es = new Elastic();
var movieRental = new MediaTitles();

Users = [];
for(i=0;i<10;i++) {
    // one out of three watch a movie for more than 5% (if relevant)
    var toProcess = Math.floor(Math.random()*9+1) % 3 == 0
    if (toProcess) {
        es.addOneMovieToAnExistingUser(i,new Media(movieRental.getTitle()))        
    }
}

es.search('/_search',{
    query: {
        query_string: {
            query: "Nemo"
        }
    }
});

var anotherSearch = {
    query:{
        match:{
            "movies.id": 3
        }
    }
};