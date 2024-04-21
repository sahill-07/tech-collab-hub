class WsResponseType {
    error = 'error';
    progress = 'progress';
    userdata = 'userdata';


    buildErrorResponse(msg){
        return JSON.stringify({
            type : this.error,
            msg : msg,
            severity : this.error
        })
    }

    buildProgressResponse(percent, maxpercent, message){
        return JSON.stringify({
            type : this.progress,
            percent, maxpercent, message
        });
    }

    buildUserDataResponse(data){
        return JSON.stringify({
            type : this.userdata,
            data : data
        })
    }
}

module.exports = new WsResponseType();