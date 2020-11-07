export interface Session {
  dateCreated: number;
  id: string;
  username: string;
  role: string;
  // Timestamp indicating when the session was created, in Unix milliseconds.
  issued: number;
  // Timestamp indicating when the session should expire, in Unix milliseconds.
  expires: number;
}
