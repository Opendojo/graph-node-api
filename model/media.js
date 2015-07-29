var media = Media.prototype;

function Media(args) {
    this.id = 1;
    this.title = 'Hello';
    this.watched = Date.now();
    this.viewcount = 1;
    this.userIds = {};
    for(arg in args){
        if(this.hasOwnProperty(arg)){
            this[arg] = args[arg];
        }
    }
}

module.exports = Media;