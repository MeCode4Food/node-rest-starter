class Journal{
    constructor(id, content, date, title){
        this.id = this.id? this.id : null;
        this.content = content;
        this.date = date;
        this.title = title;
    }
}

module.exports = Journal;