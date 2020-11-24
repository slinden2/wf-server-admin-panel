export const downloadLog = async (serverId: string, serverName: string) => {
  const res = await fetch(`/api/logs/${serverId}`);
  const blob = await res.blob();
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${serverName}.log`);
  document.body.appendChild(link);
  link.click();
  if (link.parentNode) {
    link.parentNode.removeChild(link);
  }
};
