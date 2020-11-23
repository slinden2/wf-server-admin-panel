import React from "react";
import {
  useGetConfigLazyQuery,
  useSaveConfigMutation,
} from "../../generated/apolloComponents";
import { buttonStyles } from "../../styles/buttonStyles";

interface Props {
  serverId: string | undefined;
  setShowPane: React.Dispatch<
    React.SetStateAction<["LOG" | "CONFIG" | null, string | null]>
  >;
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
      <h3 className="text-2xl mb-4">Config</h3>
      <textarea
        className="w-11/12 text-xs font-mono h-64 border bg-gray-100 px-2"
        defaultValue={configString}
        ref={configRef}
      />
      <div>
        <button className={buttonStyles} onClick={() => handleSave()}>
          Save
        </button>
        <button
          className={`${buttonStyles} ml-3`}
          onClick={() => setShowPane([null, null])}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ConfigPane;
