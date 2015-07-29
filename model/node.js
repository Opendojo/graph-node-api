var node = Node.prototype;

function Node(args) {
    this.id = 1;
    this.title = '';
    this.watched = Date.now();
    this.escort = '';
    for(arg in args){
        if(this.hasOwnProperty(arg)){
            this[arg] = args[arg];
        }
    }
}

module.exports = Node;