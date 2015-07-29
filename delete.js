Elastic = require('./model/elastic.js');

var es = new Elastic();

for(i=0;i<10;i++) {
    es.deleteUser(i);
}

es.search('/_search',{
    query: {
        query_string: {
            query: 'Nemo'
        }
    }
});
