export const getMaxPlayerCount = (configFile: string) => {
  const maxPlayersRow = configFile
    .split("\n")
    .find((row: string) => row.startsWith("max_players"));
  if (!maxPlayersRow) {
    throw new Error("Invalid config: max_players= missing");
  }
  const [, maxPlayers] = maxPlayersRow.split("=");

  return Number(maxPlayers);
};
