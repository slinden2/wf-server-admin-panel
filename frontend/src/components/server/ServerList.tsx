import React from "react";

import { useAuthContext } from "../../context/AuthContext";
import {
  Command,
  useGetLogLazyQuery,
  useRunCommandMutation,
} from "../../generated/apolloComponents";
import { ServerColumn } from "../../types/ServerColumn";
import { ServerRow } from "../../types/ServerRow";
import LogPane from "./LogPane";
import ConfigPane from "./ConfigPane";
import ServerTable from "./ServerTable";
import { buttonStyles } from "../../styles/buttonStyles";

const columns: ServerColumn[] = [
  {
    name: "Name",
    selector: "name",
  },
  {
    name: "PID",
    selector: "pid",
  },
  {
    name: "Players",
    selector: "playerCount",
  },
  {
    name: "Max players",
    selector: "maxPlayerCount",
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
  const [getLog, getLogResult] = useGetLogLazyQuery({
    fetchPolicy: "no-cache",
  });
  const { user } = useAuthContext();
  const [runCommand] = useRunCommandMutation();
  const [configSrvId, setConfigSrvId] = React.useState<string>("");
  const [showPane, setShowPane] = React.useState<
    ["LOG" | "CONFIG" | null, string | null]
  >([null, null]);
  const elementsRef = React.useRef(
    Array.from({ length: 20 }).map(() => React.createRef<HTMLInputElement>())
  );

  if (user.loading) {
    return <div>Loading...</div>;
  }

  if (!user.data?.me?.servers.length) {
    return <div>No servers available</div>;
  }

  const handleButtonClick = async (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    command: Command.Start | Command.Stop | "GET_LOG" | "GET_CONFIG",
    serverId: string
  ) => {
    switch (command) {
      case "START":
        await runCommand({ variables: { serverId, type: Command.Start } });
        break;
      case "STOP":
        await runCommand({ variables: { serverId, type: Command.Stop } });
        break;
      case "GET_LOG":
        setShowPane(["LOG", serverId]);
        await getLog({ variables: { serverId } });
        break;
      case "GET_CONFIG":
        setConfigSrvId(serverId);
        setShowPane(["CONFIG", serverId]);
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
          type: Command.Command,
          command: event.currentTarget.value,
        },
      });

      // Clear input field
      if (elementsRef.current[index].current) {
        elementsRef.current[index].current!.value = "";
      }
    }
  };

  const tableData: ServerRow[] = user.data.me.servers.map((srv, index) => {
    const curRef = elementsRef.current[index];
    const logOpen = showPane[0] === "LOG" && showPane[1] === srv.id;

    return {
      ...srv,
      start: (
        <button
          className={buttonStyles}
          onClick={(event) => handleButtonClick(event, Command.Start, srv.id)}
        >
          Start
        </button>
      ),
      stop: (
        <button
          className={buttonStyles}
          onClick={(event) => handleButtonClick(event, Command.Stop, srv.id)}
        >
          Stop
        </button>
      ),
      getLog: (
        <button
          className={buttonStyles}
          onClick={(event) => handleButtonClick(event, "GET_LOG", srv.id)}
        >
          {logOpen ? "Reload log" : "Get log"}
        </button>
      ),
      getConfig: (
        <button
          className={buttonStyles}
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
    <div className="my-5">
      <h3 className="text-2xl mb-4">My Servers</h3>
      <ServerTable data={tableData} columns={columns} />
      {showPane[0] === "LOG" && <LogPane getLogResult={getLogResult} />}
      {showPane[0] === "CONFIG" && (
        <ConfigPane serverId={configSrvId} setShowPane={setShowPane} />
      )}
    </div>
  );
};

export default ServerList;
