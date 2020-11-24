export interface ServerRow {
  id: string;
  name: string;
  pid: number;
  // displayName: string;
  playerCount: number;
  maxPlayerCount: number;
  start: React.ReactNode;
  stop: React.ReactNode;
  getLog: React.ReactNode;
  downloadLog: React.ReactNode;
  getConfig: React.ReactNode;
  sendCommand: React.ReactNode;
}
