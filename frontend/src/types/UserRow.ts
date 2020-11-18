import { Server } from "../generated/apolloComponents";

export interface UserRow {
  id: string;
  username: string;
  role: "USER" | "ADMIN";
  servers: React.ReactNode;
}
