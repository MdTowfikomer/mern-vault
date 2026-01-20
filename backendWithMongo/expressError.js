class ExpressError extends Error{
    constructor(status, message){
        super();// calling the Error(parent) constructor
        this.status = status;
        this.message = message;
    }
}
module.exports = ExpressError;