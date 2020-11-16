import { ServerRow } from "./ServerRow";

export interface ServerColumn {
  name: string;
  selector: keyof ServerRow;
}
