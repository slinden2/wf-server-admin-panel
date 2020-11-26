import fs from "fs";
import config from "../config";

export const readFile = (fn: string) => {
  const file = fs.readFileSync(`${config.servers.pidPath}/${fn}`, {
    encoding: "utf-8",
  });
  return file;
};
