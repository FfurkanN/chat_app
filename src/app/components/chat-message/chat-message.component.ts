import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Message } from '../../models/message';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { formatDistanceToNow } from 'date-fns';
import { environment } from '../../../environments/environment';
import { ChatService } from '../../core/services/chat.service';
import { MessageSendModel } from '../../models/message-send';
import { FormsModule } from '@angular/forms';
import { UsersBarComponent } from '../users-bar/users-bar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-chat-message',
  standalone: true,
  imports: [CommonModule, FormsModule, UsersBarComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.css',
})
export class ChatMessageComponent implements OnInit {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;

  @Input() messages: Message[] = [];
  @Input() usersInChat: User[] = [];
  @Input() currentChatId: string = '';

  constructor(private chatService: ChatService) {}

  currentUserId: string = '';

  selectedFileName: string = '';
  fileToUpload: File | null = null;

  ngOnInit(): void {
    // setTimeout(() => this.scrollToBottom(), 10);
  }

  messageToSend: MessageSendModel = {
    chatId: '',
    content: '',
    sendDate: new Date(),
    fileName: '',
    fileUrl: '',
    fileSize: 0,
  };

  previusSender: string = '';
  profileImageApi: string = environment.profileImageUrl;

  @HostListener('window:paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const items = event.clipboardData?.items;
    if (!items) return;

    for (const item of Array.from(items)) {
      if (item.type.startsWith('image/')) {
        const blob = item.getAsFile();
        if (blob) {
          this.fileToUpload = blob;
          this.selectedFileName = blob.name || 'pasted-image.png';
          console.log('Pano görüntüsü tespit edildi:', this.selectedFileName);
        }
      }
    }
  }

  sendMessage(message: MessageSendModel): void {
    this.messageToSend.chatId = this.currentChatId;

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
              this.messages.push(res);
              this.messageToSend.content = '';
              this.removeSelectedFile();
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
          this.messages.push(res);
          this.messageToSend.content = '';
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.fileToUpload = target.files[0];
      this.selectedFileName = this.fileToUpload.name;
    }
  }

  removeSelectedFile(): void {
    this.fileToUpload = null;
    this.selectedFileName = '';

    this.messageToSend.fileName = '';
    this.messageToSend.fileSize = 0;
    this.messageToSend.fileUrl = '';
  }

  getSender(senderId: string): User {
    const sender = this.usersInChat.find((user) => user.id === senderId);
    if (!sender) {
      throw new Error(`User with Id ${senderId} not found`);
    }
    return sender;
  }

  getSendTime(sendDate: Date): string {
    return formatDistanceToNow(sendDate);
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
    this.chatContainer.nativeElement.scrollTop =
      this.chatContainer.nativeElement.scrollHeight;
  }
}
