import { Environment } from "../types/Environment";

export const isEnvironment = (env: string | undefined): env is Environment => {
  if (env === "production" || env === "development") return true;
  else return false;
};
