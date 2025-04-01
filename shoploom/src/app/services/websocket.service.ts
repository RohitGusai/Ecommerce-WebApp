import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {io} from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  private socket = io("http://localhost:4000");

  joinChatRoom(room : string)
  {
    this.socket.emit("joinChatRoom",room);
  }

  sendMessage(room : string,message : string)
  {
    this.socket.emit("sendMessage",{room,message});
  }

  onMessage(callback: (message: string) => void) {
    this.socket.on('receiveMessage', callback);
  }
}
