import { Component, OnInit } from '@angular/core';
import { ChatService } from './service/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  roomId!: string;
  messageText!: string;
  messageArray: {user: string, message: string}[] = [];

  phone!: string;
  currentUser: any;
  selectedUser: any;

  userList = [
    {
      id: 1,
      name: 'Athiban',
      phone: '1234567890',
      image: 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png',
      roomId: {
          2: 'room-1',
          3: 'room-2',
          4: 'room-3'
      }
    },
    {
      id: 2,
      name: 'Raja',
      phone: '0987654321',
      image: 'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png',
      roomId: {
          1: 'room-1',
          3: 'room-4',
          4: 'room-5'
      }
    }
  ]

  constructor(private chatService: ChatService) {
    this.chatService.getMessage().subscribe( (data) => {
      this.messageArray.push(data);
    });
  }
  ngOnInit(): void {
    this.currentUser = this.userList[0];
  }

  selectUserHandler(phone: string) {
    this.selectedUser = this.userList.find( user => user.phone === phone);
    this.roomId = this.selectedUser.roomId[this.selectedUser.id];
    this.messageArray = [];

    this.join(this.currentUser.name, this.currentUser.roomId);
  }

  join(userName: string, roomId: string) {
    this.chatService.joinRoom({user: userName, roomId: roomId});
  }

  sendMessage() {
    this.chatService.sendMessage({
      data: this.currentUser.name,
      room: this.roomId,
      message: this.messageText
    });

    this.messageText = '';
  }
}
