export interface Message {
  id: string;
  chat_Id: string;
  sender_Id: string;
  messageType: string;
  content: string;
  file_Url: string;
  send_Date: Date;
  receive_Date: Date;
}
