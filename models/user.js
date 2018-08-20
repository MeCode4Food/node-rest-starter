class User{
    constructor(object){
        // id and date is optional for the constructor. 
        // this is to facilitate new journal creation (id should be incremented by the db)
        // and date will be created if there is none for new journals

        this.id = object.id? object.id : null;
        this.name = object.name;
        this.email = object.email;
        this.points = object.points;
    }
}

module.exports = User;