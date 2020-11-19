import React from "react";
import {
  Command,
  useRunCommandMutation,
} from "../../generated/apolloComponents";

const AdminCommands: React.FC = () => {
  const [runCommand] = useRunCommandMutation();

  const handleButtonClick = async (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    command: Command
  ) => {
    switch (command) {
      case Command.Reboot:
        await runCommand({ variables: { type: Command.Reboot } });
        break;
      case Command.UpdateMods:
        await runCommand({ variables: { type: Command.UpdateMods } });
        break;
      case Command.UpdateWfServer:
        await runCommand({ variables: { type: Command.UpdateWfServer } });
        break;
      default:
        return;
    }
  };

  return (
    <div>
      <h2>Admin Commands</h2>
      <button onClick={(event) => handleButtonClick(event, Command.Reboot)}>
        Reboot
      </button>
      <button onClick={(event) => handleButtonClick(event, Command.UpdateMods)}>
        Update mods
      </button>
      <button
        onClick={(event) => handleButtonClick(event, Command.UpdateWfServer)}
      >
        Update WF server
      </button>
    </div>
  );
};

export default AdminCommands;
