import React from "react";
import { useGetLogLazyQuery } from "../../generated/apolloComponents";

interface Props {
  serverId: string | undefined;
}

const LogPane: React.FC<Props> = ({ serverId }) => {
  const [getLog, getLogResult] = useGetLogLazyQuery({
    fetchPolicy: "no-cache",
  });

  React.useEffect(() => {
    const callGetLog = async () => {
      if (serverId) {
        await getLog({ variables: { serverId } });
      }
    };
    callGetLog();
  }, [serverId, getLog]);

  const logString = getLogResult.data?.getLog;

  return (
    <div dangerouslySetInnerHTML={{ __html: logString ? logString : "" }} />
  );
};

export default LogPane;
