import React from "react";
import { useGetConfigLazyQuery } from "../../generated/apolloComponents";

interface Props {
  serverId: string | undefined;
  setShowPane: React.Dispatch<React.SetStateAction<"LOG" | "CONFIG" | null>>;
}

const ConfigPane: React.FC<Props> = ({ serverId, setShowPane }) => {
  const [getConfig, getConfigResult] = useGetConfigLazyQuery({
    fetchPolicy: "no-cache",
  });

  React.useEffect(() => {
    const callGetConfig = async () => {
      if (serverId) {
        await getConfig({ variables: { serverId } });
      }
    };
    callGetConfig();
  }, [serverId, getConfig]);

  const logString = getConfigResult.data?.getConfig;

  if (!logString) {
    return <div>No config found</div>;
  }

  return (
    <div>
      <textarea defaultValue={logString} />
      <button>Save</button>
      <button onClick={() => setShowPane(null)}>Close</button>
    </div>
  );
};

export default ConfigPane;
