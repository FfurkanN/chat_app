export interface CreateChat {
  chatName: string;
  creatorId: string;
  members: string[];
  isPublic: boolean;
}
