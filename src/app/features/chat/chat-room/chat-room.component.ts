import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ChatUsersComponent } from '../chat-users/chat-users.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { Message } from '../../../core/models/message.model';
import { ChatService } from '../../../core/services/chat.service';
import { MessageSend } from '../../../core/models/send-message.model';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { concat } from 'rxjs';
import { SignalChatService } from '../../../core/services/signal-chat.service';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [ChatUsersComponent, NavbarComponent, FormsModule],
  templateUrl: './chat-room.component.html',
  styleUrl: './chat-room.component.css',
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;

  currentChatId: string = '';

  messages: Message[] = [];
  isLoading: boolean = false;

  messageToSend: MessageSend = {
    chatId: '',
    content: '',
    fileName: '',
    fileUrl: '',
    fileSize: 0,
  };

  fileToUpload: File | undefined = undefined;
  fileNameToUpload: string = '';

  imageApiUrl: string = environment.wwwrootUrl;

  constructor(
    private chatService: ChatService,
    private signalChatService: SignalChatService
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.chatService.currentChat$.subscribe((chat) => {
      if (chat) {
        this.messageToSend.chatId = chat.id;
        this.currentChatId = chat.id;

        this.chatService.getMessages(chat.id, undefined).subscribe({
          next: (res) => {
            this.messages = res;
            console.log(res);
            this.isLoading = false;
            this.scrollToBottom();
          },
        });
      }
    });

    this.signalChatService.receiveMessage((message) => {
      this.messages.unshift(message);
      this.scrollToBottom();
    });
  }

  sendMessage(): void {
    if (this.fileToUpload) {
      console.log('File uploading started');
      this.chatService.uploadChatFile(this.fileToUpload).subscribe({
        next: (res) => {
          console.log('File uploading completed');
          this.messageToSend.fileName = res.fileName;
          this.messageToSend.fileSize = res.fileSize;
          this.messageToSend.fileUrl = res.fileUrl;

          this.chatService.sendMessage(this.messageToSend).subscribe({
            next: (res) => {
              this.messages.unshift(res);
              this.messageToSend.content = '';
              this.removeSelectedFile();
              this.scrollToBottom();
            },
            error: (err) => {
              console.error(err);
            },
          });
        },
      });
    } else {
      if (!this.messageToSend.content.trim()) {
        return;
      }
      this.chatService.sendMessage(this.messageToSend).subscribe({
        next: (res) => {
          this.messages.unshift(res);
          this.messageToSend.content = '';
          this.scrollToBottom();
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  loadMessages(): void {
    this.isLoading = true;
    this.chatService
      .getMessages(
        this.currentChatId,
        this.messages[this.messages.length - 1].send_Date
      )
      .subscribe({
        next: (res) => {
          if (res) {
            this.messages = this.messages.concat(res);
          }

          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.fileToUpload = target.files[0];
      this.fileNameToUpload = this.fileToUpload.name;
    }
  }

  onScroll() {
    if (this.chatContainer.nativeElement.scrollTop <= 100 && !this.isLoading) {
      this.loadMessages();
    }
  }

  @HostListener('window:paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (const item of Array.from(items)) {
      if (item.type.startsWith('image/')) {
        const blob = item.getAsFile();
        if (blob) {
          this.fileToUpload = blob;
          this.fileNameToUpload = blob.name;
        }
      }
    }
  }
  generateMessages(count: number) {
    const messageTypes = ['text', 'image', 'file'];
    const messages: Message[] = [];

    for (let i = 0; i < count; i++) {
      const messageType =
        messageTypes[Math.floor(Math.random() * messageTypes.length)];
      const message = {
        id: crypto.randomUUID(),
        sender_Id: `user_${Math.floor(Math.random() * 10) + 1}`,
        messageType: messageType,
        content: messageType === 'text' ? `Message content ${i + 1}` : '',
        fileName:
          messageType !== 'text'
            ? `file_${i + 1}.${messageType === 'image' ? 'jpg' : 'pdf'}`
            : undefined,
        fileUrl:
          messageType !== 'text'
            ? `https://example.com/files/file_${i + 1}`
            : undefined,
        fileSize:
          messageType !== 'text'
            ? Math.floor(Math.random() * 5000) + 100
            : undefined,
        send_Date: new Date(),
      };
      // this.messages.unshift(message);
      messages.push(message);
    }
    this.messages = messages.concat(this.messages);
    return messages;
  }

  removeSelectedFile(): void {
    this.fileToUpload = undefined;
    this.fileNameToUpload = '';

    this.messageToSend.fileName = '';
    this.messageToSend.fileSize = 0;
    this.messageToSend.fileUrl = '';
  }
  downloadFile(fileUrl: string, fileName: string) {
    if (fileUrl) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName || 'File';
      link.click();
    }
  }

  public scrollToBottom() {
    setTimeout(() => {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    }, 10);
  }
}
