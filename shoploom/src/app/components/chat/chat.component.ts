import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messages: string[] = [];
  newMessage: string = '';
  chatRoom = 'customer-support';

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    // Join chat room when component loads
    this.wsService.joinChatRoom(this.chatRoom);

    // Listen for incoming messages
    this.wsService.onMessage((message) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      console.log(`Sending message: ${this.newMessage}`); // Debugging
      this.wsService.sendMessage(this.chatRoom, `User: ${this.newMessage}`);
      this.newMessage = '';
    }
  }

}
