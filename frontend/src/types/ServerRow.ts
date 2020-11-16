export interface ServerRow {
  id: string;
  name: string;
  pid: number;
  displayName: string;
  start: React.ReactNode;
  stop: React.ReactNode;
  sendCommand: React.ReactNode;
}
