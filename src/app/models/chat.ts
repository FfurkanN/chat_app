export interface Chat {
  id: string;
  name: string;
  creator_Id: string;
  members: string[];
  create_date: Date;
  messages: string[];
  unreadMessageCount: number;
}
