var graph = Graph.prototype;

Node = require('../model/node.js');
Link = require('../model/link.js');

function Graph(args) {
    this.dataStructure = {
        nodes: {},
        links: []
    };
    for(arg in args){
        if(this.hasOwnProperty(arg)){
            this[arg] = args[arg];
        }
    }
}

graph.addNode = function(node) {
    var nodeId = this.findNode(node);
    if( !nodeId ){
        this.dataStructure.nodes[node.id] = node;
    }
};

graph.addLink = function(link) {
    var linkId = this.findLink(link);
    // add weight if the link alreayd exists
    if (linkId ) {
        this.dataStructure.links[linkId].incrementView();
    } else {
        this.dataStructure.links.push(link);
    }
};

graph.findLink = function(link) {
    for( var linkId in this.dataStructure.links ) {
        if ( this.dataStructure.links[linkId].same(link) ) {
            return linkId;
        }
    }
    return null;
};

graph.findNode = function(node) {
    if(this.dataStructure.nodes[node.id]) {
        return node.id;
    } else {
        return null;
    }
};

graph.getNodeList = function(nodeid, depth) {
    console.log('graph.getNodeList', nodeid, depth);
    if( depth == null ){
        depth = 1;
    }
    var nodeList = [];
    for( var linkId in this.dataStructure.links ) {
        if( this.dataStructure.links[linkId].asSource(nodeid) ) {
            nodeList.push(this.dataStructure.nodes[nodeid]);
            if( (depth - 1) > 0 ){
                var subNodeList = this.getNodeList(this.dataStructure.links[linkId].target, (depth - 1) );
                for(var id in subNodeList) {
                    nodeList.push(subNodeList[id]);
                }
            }
        }
    }
    console.log('graph.getNodeList', nodeList);
    return nodeList;
}

graph.getData = function() {
    return this.dataStructure;
};

module.exports = Graph;