import { Component } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agent',
  imports: [CommonModule,FormsModule],
  templateUrl: './agent.component.html',
  styleUrl: './agent.component.css'
})
export class AgentComponent {
  messages: string[] = [];
  newMessage: string = '';
  chatRoom = 'customer-support'; // Same room as user

  constructor(private wsService: WebsocketService) {}

  ngOnInit(): void {
    // Admin joins the same chat room
    this.wsService.joinChatRoom(this.chatRoom);

    // Listen for incoming messages
    this.wsService.onMessage((message) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.wsService.sendMessage(this.chatRoom, `Admin: ${this.newMessage}`);
      this.newMessage = '';
    }
  }
}
