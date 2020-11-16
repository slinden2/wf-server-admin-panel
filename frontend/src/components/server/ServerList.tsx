import React, { RefObject } from "react";

import { useAuthContext } from "../../context/AuthContext";
import { ServerColumn } from "../../types/ServerColumn";
import { ServerRow } from "../../types/ServerRow";
import ServerTable from "./ServerTable";

const columns: ServerColumn[] = [
  {
    name: "Name",
    selector: "name",
  },
  {
    name: "PID",
    selector: "pid",
  },
  // {
  //   name: "Display name",
  //   selector: "displayName",
  // },
  {
    name: "",
    selector: "start",
  },
  {
    name: "",
    selector: "stop",
  },
  {
    name: "Send command",
    selector: "sendCommand",
  },
];

const ServerList: React.FC = () => {
  const { user } = useAuthContext();

  if (user.loading) {
    return <div>Loading...</div>;
  }

  if (!user.data?.me?.servers.length) {
    return <div>No servers available</div>;
  }

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    command: "START" | "STOP",
    serverId: string
  ) => {
    switch (command) {
      case "START":
        console.log(`Starting server ${serverId}`);
        break;
      case "STOP":
        console.log(`Stopping server ${serverId}`);
        break;
      default:
        return;
    }
  };

  const handleSendCommand = (
    event: React.KeyboardEvent<HTMLInputElement>,
    serverId: string
  ) => {
    if (event.key === "Enter") {
      console.log(
        `Sending command ${event.currentTarget.value} to ${serverId}`
      );
      event.currentTarget.value = "";
    }
  };

  const tableData: ServerRow[] = user.data.me.servers.map((srv) => {
    return {
      ...srv,
      start: (
        <button onClick={(event) => handleButtonClick(event, "START", srv.id)}>
          Start
        </button>
      ),
      stop: (
        <button onClick={(event) => handleButtonClick(event, "STOP", srv.id)}>
          Stop
        </button>
      ),
      sendCommand: (
        <input
          type="text"
          onKeyDown={(event) => handleSendCommand(event, srv.id)}
        />
      ),
    };
  });

  return (
    <div>
      <ServerTable data={tableData} columns={columns} />
    </div>
  );
};

export default ServerList;
