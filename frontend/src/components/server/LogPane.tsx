import { LazyQueryResult, QueryLazyOptions } from "@apollo/client";
import React from "react";
import {
  Exact,
  GetLogQuery,
  QueryGetLogArgs,
  useGetLogLazyQuery,
} from "../../generated/apolloComponents";

interface Props {
  getLogResult: LazyQueryResult<GetLogQuery, QueryGetLogArgs>;
}

const LogPane: React.FC<Props> = ({ getLogResult }) => {
  const logString = getLogResult.data?.getLog;

  return (
    <div dangerouslySetInnerHTML={{ __html: logString ? logString : "" }} />
  );
};

export default LogPane;
