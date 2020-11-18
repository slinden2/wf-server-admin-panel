import React from "react";
import {
  useGetConfigLazyQuery,
  useSaveConfigMutation,
} from "../../generated/apolloComponents";

interface Props {
  serverId: string | undefined;
  setShowPane: React.Dispatch<React.SetStateAction<"LOG" | "CONFIG" | null>>;
}

const ConfigPane: React.FC<Props> = ({ serverId, setShowPane }) => {
  const [getConfig, getConfigResult] = useGetConfigLazyQuery({
    fetchPolicy: "no-cache",
  });
  const [saveConfig, saveConfigResult] = useSaveConfigMutation();
  const configRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const callGetConfig = async () => {
      if (serverId) {
        await getConfig({ variables: { serverId } });
      }
    };
    callGetConfig();
  }, [serverId, getConfig]);

  const handleSave = async () => {
    const newConfig = configRef.current?.value;
    if (newConfig && serverId) {
      await saveConfig({ variables: { serverId, newConfig } });
      await getConfig({ variables: { serverId } });
    }
  };

  if (getConfigResult.loading || saveConfigResult.loading) {
    return <div>Loading...</div>;
  }

  const configString = getConfigResult.data?.getConfig;

  if (!configString) {
    return <div>No config found</div>;
  }

  return (
    <div>
      <textarea defaultValue={configString} ref={configRef} />
      <button onClick={() => handleSave()}>Save</button>
      <button onClick={() => setShowPane(null)}>Close</button>
    </div>
  );
};

export default ConfigPane;
