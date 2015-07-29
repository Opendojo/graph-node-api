var mediaTitles = MediaTitles.prototype;

function MediaTitles() {
    this.titles = [
        {id:1, title:'Star Wars'}
        ,{id:2, title:'The Goonies'}
        ,{id:3, title:'Harry Potter'}
        ,{id:897, title:'Bug\'s life'}
        ,{id:56677, title:'Toy story'}
        ,{id:333333, title:'Le grand bleu'}
        ,{id:123, title:'Lord of the Rings'}
        ,{id:1111, title:'Reservoir Dogs'}
        ,{id:23488, title:'From dusk till dawn'}
        ,{id:11123, title:'Snatch'}
        ,{id:345, title:'Fight Club'}
        ,{id:35780, title:'2001 Space Odyssey'}
        ,{id:342365, title:'C\'est arrivé près de chez vous'}
        ,{id:4978, title:'Holy Grail'}
        ,{id:3678, title:'Podium'}
        ,{id:33, title:'Shrek'}
        ,{id:445643, title:'Finding Nemo'}
        ,{id:985, title:'Totoro'}
        ,{id:224, title:'Ponyo'}
        ,{id:34562, title:'The Godfather'}
    ];
}

mediaTitles.getTitle = function(args) {
    if(args && this.titles[args]) {
        return this.titles[args];
    } else {
        return this.titles[Math.floor(Math.random()* (this.titles.length) )];
    }
};

module.exports = MediaTitles;