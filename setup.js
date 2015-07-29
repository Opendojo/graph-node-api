Media = require('./model/media.js');
User = require('./model/user.js');
Elastic = require('./model/elastic.js');
MediaTitles = require('./model/mediaTitles.js');

var es = new Elastic();
var movieRental = new MediaTitles();

Users = [];
for(i=0;i<10;i++) {
    var currentUser = new User({
        id: i
        ,name: 'name_'+i
        ,gender: i%2==0?'male':'female'
    });
    
    for(j=0; j<Math.floor(Math.random()*10+1); j++){
        var currentMovie = new Media(movieRental.getTitle());
        currentUser.addMovie(currentMovie);
    }
    Users.push(currentUser);
}

for(user in Users){
    var currentUser = Users[user];
    console.log('User: '+currentUser.getId()+' has been watching')
    es.sendUserData(currentUser);
    for(movie in currentUser.movies) {
        console.log(currentUser.movies[movie].title);
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

var aggregation = {
    _source: ["media"],
    aggs:{
        media:{terms:{field: "media.id"}}
    },
    query: {
        query_string: {
            query: "Nemo"
        }
    }
};