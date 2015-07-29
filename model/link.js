var link = Link.prototype;

function Link(args) {
    this.source = 0;
    this.target = 0;
    this.viewcount = 1;
    this.lastusage = Date.now();
    for(arg in args){
        if(this.hasOwnProperty(arg)){
            this[arg] = args[arg];
        }
    }
}

link.same = function(link) {
    if( this.source == link.source && this.target == link.target ) {
        return true;
    }
    return false;
};

link.incrementView = function() {
    this.viewcount++;
};

link.asSource = function(source) {
    return this.source == source;
}

module.exports = Link;