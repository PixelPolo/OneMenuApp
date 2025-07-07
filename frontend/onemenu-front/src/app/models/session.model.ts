export interface Session {
  sessionID?: string; // UUID
  title: string;
  description?: string;
  sessionDate: string;
  userID: string; // Creator
  creationDate?: string;
}
