import { io, Socket } from "socket.io-client";

// here we are using factory 
export enum WebsocketEnum {
  socket = 'socket'
}

interface WebsocketInterface {
  send: (message: string) => void;
  close: () => void;
  receive: () => void;
}

class SocketClient implements WebsocketInterface {
  private url: string;
  private socket: Socket;
  constructor() {
    this.url = "ws://localhost:8088/ws";
    this.socket = io(this.url, {
      
    });
  }  
  send(message: string){
    this.socket.send(message);
  }
  close(){
    this.socket.close();
  }
  receive(){
    this.socket.on("message" , (message) => {
      console.log(message)
    })
  }
}

export class WebsocketFactory {
  public static create(client: WebsocketEnum) {
    switch(client) {
      case WebsocketEnum.socket:
        return new SocketClient();
      default:
        throw new Error("Invalid websocket client");
    }
  }
}
