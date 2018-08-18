class Journal{
    constructor(id, content, date, title){
        // id and date is optional for the constructor. 
        // this is to facilitate new journal creation (id should be incremented by the db)
        // and date will be created if there is none for new journals

        this.id = this.id? id : null;
        this.content = content;
        this.date = date? date : new Date().toISOString();
        this.title = title;
    }
}

module.exports = Journal;