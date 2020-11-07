import { Session } from "./Session";

export type PartialSession = Omit<Session, "issued" | "expires">;
