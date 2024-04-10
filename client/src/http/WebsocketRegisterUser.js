import WebsocketUtils from '../utils/WebsocketUtils'
import { store  } from '../store/index';

class WebsocketRegisterUser {
  main(data) {
    const token = store.getState().UserSlice.token;
    console.log(token, data);
    // Establish WebSocket connection
    this.socket = new WebSocket(`ws://localhost:8080/registeruser?token=${token}`);

    // Event handlers
    this.socket.addEventListener("open", () => {
      console.log("Connected to WebSocket server");
      this.socket.send(JSON.stringify(data));
    });

    this.socket.addEventListener("message", (event) => {
      console.log("Received message:", event.data);
      WebsocketUtils.processMessage(event.data);
    });

    this.socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
      WebsocketUtils.processError(error)
    });

    this.socket.addEventListener("close", () => {
      console.log("Disconnected from WebSocket server");
      this.socket.removeEventListener('open', ()=>{});
      this.socket.removeEventListener('message',()=>{});
      this.socket.removeEventListener('error', ()=>{});
      this.socket.removeEventListener('close',()=>{});
    });

    // Sending data
  }
  sendData(data) {
    this.socket.send(JSON.stringify(data));
  }

  closeSocket(){
    this.socket.close();
  }
}

export default new WebsocketRegisterUser();