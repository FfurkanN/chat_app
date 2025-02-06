export interface Chat {
  id: string;
  name: string;
  creator_id: string;
  members: string[];
  create_date: Date;
  messages: string[];
}
