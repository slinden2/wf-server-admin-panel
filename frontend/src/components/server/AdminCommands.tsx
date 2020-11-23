import React from "react";
import {
  Command,
  useRunCommandMutation,
} from "../../generated/apolloComponents";
import { buttonStyles } from "../../styles/buttonStyles";

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
    <div className="">
      <h3 className="text-2xl mb-4">Admin Commands</h3>
      <button
        className={buttonStyles}
        onClick={(event) => handleButtonClick(event, Command.Reboot)}
      >
        Reboot
      </button>
      <button
        className={`${buttonStyles} mx-3`}
        onClick={(event) => handleButtonClick(event, Command.UpdateMods)}
      >
        Update mods
      </button>
      <button
        className={buttonStyles}
        onClick={(event) => handleButtonClick(event, Command.UpdateWfServer)}
      >
        Update WF server
      </button>
    </div>
  );
};

export default AdminCommands;
