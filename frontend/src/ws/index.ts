export interface SocketClientInterface {
  send: (message: string) => void;
  close: () => void;
  receive: (cb: (message: MessageEvent) => void) => void;
  isConnected: number;
}
class SocketClient implements SocketClientInterface {
  private url: string;
  private socket: WebSocket;
  private _isConnected: number;
  constructor() {
    this._isConnected = 0;
    this.url = "ws://localhost:8088/ws";
    this.socket = new WebSocket(this.url)
    this.socket.onopen = () => {
      this._isConnected = this.socket.OPEN;
    }
  }  

  send(message: string){
    this.socket.send(message);
  }

  close(){
    this.socket.close();
  }

  receive(cb: (message: MessageEvent) => void){
    this.socket.onmessage = cb
  }

  get isConnected() {
    return this._isConnected;
  }

}


export const socket = new SocketClient();


