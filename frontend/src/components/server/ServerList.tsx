import React from "react";

import { useAuthContext } from "../../context/AuthContext";
import { useRunCommandMutation } from "../../generated/apolloComponents";
import { ServerColumn } from "../../types/ServerColumn";
import { ServerRow } from "../../types/ServerRow";
import LogPane from "./LogPane";
import ConfigPane from "./ConfigPane";
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
    name: "",
    selector: "getLog",
  },
  {
    name: "",
    selector: "getConfig",
  },
  {
    name: "Send command",
    selector: "sendCommand",
  },
];

const ServerList: React.FC = () => {
  const { user } = useAuthContext();
  const [runCommand] = useRunCommandMutation();
  const elementsRef = React.useRef(
    user.data?.me?.servers.map(() => React.createRef<HTMLInputElement>())
  );
  const [logSrvId, setLogSrvId] = React.useState<string>("");
  const [configSrvId, setConfigSrvId] = React.useState<string>("");
  const [showPane, setShowPane] = React.useState<"LOG" | "CONFIG" | null>(null);

  if (user.loading) {
    return <div>Loading...</div>;
  }

  if (!user.data?.me?.servers.length) {
    return <div>No servers available</div>;
  }

  const handleButtonClick = async (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    command: "START" | "STOP" | "GET_LOG" | "GET_CONFIG",
    serverId: string
  ) => {
    switch (command) {
      case "START":
        await runCommand({ variables: { serverId, type: "START" } });
        break;
      case "STOP":
        await runCommand({ variables: { serverId, type: "STOP" } });
        break;
      case "GET_LOG":
        setLogSrvId(serverId);
        setShowPane("LOG");
        break;
      case "GET_CONFIG":
        setConfigSrvId(serverId);
        setShowPane("CONFIG");
        break;
      default:
        return;
    }
  };

  const handleSendCommand = async (
    event: React.KeyboardEvent<HTMLInputElement>,
    serverId: string,
    index: number
  ) => {
    if (event.key === "Enter") {
      await runCommand({
        variables: {
          serverId,
          type: "COMMAND",
          command: event.currentTarget.value,
        },
      });

      // Clear input field
      if (elementsRef.current && elementsRef.current[index].current) {
        elementsRef.current[index].current!.value = "";
      }
    }
  };

  const tableData: ServerRow[] = user.data.me.servers.map((srv, index) => {
    const curRef = elementsRef.current && elementsRef.current[index];

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
      getLog: (
        <button
          onClick={(event) => handleButtonClick(event, "GET_LOG", srv.id)}
        >
          Get log
        </button>
      ),
      getConfig: (
        <button
          onClick={(event) => handleButtonClick(event, "GET_CONFIG", srv.id)}
        >
          Get config
        </button>
      ),
      sendCommand: (
        <input
          ref={curRef}
          type="text"
          onKeyDown={(event) => handleSendCommand(event, srv.id, index)}
        />
      ),
    };
  });

  return (
    <div>
      <ServerTable data={tableData} columns={columns} />
      {showPane === "LOG" && <LogPane serverId={logSrvId} />}
      {showPane === "CONFIG" && (
        <ConfigPane serverId={configSrvId} setShowPane={setShowPane} />
      )}
    </div>
  );
};

export default ServerList;
