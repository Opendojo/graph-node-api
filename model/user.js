var user = User.prototype;

function User(args) {
    this.id = 1;
    this.gender = 'male';
    this.name = '';
    this.mediaIds = [];
    this.created = Date.now();
    for(arg in args){
        if(this.hasOwnProperty(arg)){
            this[arg] = args[arg];
        }
    }
}

user.addMedia = function(mediaId) {
    this.mediaIds.push(mediaId);
    console.log('user.addMedia',this.mediaIds);
    return this.mediaIds.length;
};

user.shiftMedia = function() {
    var mediaId = this.mediaIds.shift();
    console.log('user.shiftMedia',this.mediaIds, mediaId);
    return mediaId;
}

user.getFirstMedia = function() {
    if( this.mediaIds.length >0 ){
        return this.mediaIds[0];
    }
}

user.getId = function() {
    return this.id;
};

module.exports = User;