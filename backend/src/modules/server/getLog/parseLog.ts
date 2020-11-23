export const parseLog = (logFile: string, numOfRows: number) => {
  const rows = logFile.split("\r\n");
  const logRows = rows.map((row) => {
    const timeStamp = row.substr(0, 8);
    const message = row.substr(9, row.length);
    return `<p class="py-1 text-xs font-mono"><span class="mr-3">${timeStamp}</span><span class="log-message">${message}</span></p>`;
  });

  return logRows.length <= numOfRows
    ? logRows.join("")
    : logRows.slice(logRows.length - numOfRows).join("");
};
