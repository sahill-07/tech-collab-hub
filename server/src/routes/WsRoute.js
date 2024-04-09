const { user_controller } = require("../controller/UserController");

class WsRouteClass{

    async main(ws, path, client_email, message){
        if(path.split('?token=')[0] === '/registeruser'){
            user_controller.postNewUser(ws, client_email, message);
        }
    }
}

module.exports = new WsRouteClass();