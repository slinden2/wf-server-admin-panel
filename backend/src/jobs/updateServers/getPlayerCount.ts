export const getPlayerCount = (playerFile: string) => {
  return playerFile.split("\r\n").filter((row) => /^\d{1,2}/.test(row.trim()))
    .length;
};
