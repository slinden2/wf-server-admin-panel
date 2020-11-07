import { Request, Response } from "express";
import { Session } from "./Session";

export interface Context {
  req: Request;
  res: Response;
  session?: Session;
}
