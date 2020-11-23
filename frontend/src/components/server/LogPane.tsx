import { LazyQueryResult } from "@apollo/client";
import React from "react";
import { GetLogQuery, QueryGetLogArgs } from "../../generated/apolloComponents";

interface Props {
  getLogResult: LazyQueryResult<GetLogQuery, QueryGetLogArgs>;
}

const LogPane: React.FC<Props> = ({ getLogResult }) => {
  const elRef = React.useRef<HTMLDivElement>(null)!;

  React.useEffect(() => {
    elRef.current!.scrollTo({
      top: elRef.current?.scrollHeight,
      left: 0,
      behavior: "auto",
    });
  }, [elRef, getLogResult]);

  const logString = getLogResult.data?.getLog;

  return (
    <div>
      <h3 className="text-2xl mb-4">Log</h3>
      <div
        ref={elRef}
        className="overflow-y-scroll h-64 border bg-gray-100 px-2"
        dangerouslySetInnerHTML={{ __html: logString ? logString : "" }}
      />
    </div>
  );
};

export default LogPane;
