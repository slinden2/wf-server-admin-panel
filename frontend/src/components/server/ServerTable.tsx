import React from "react";
import { ServerColumn } from "../../types/ServerColumn";
import { ServerRow } from "../../types/ServerRow";

interface Props {
  data: ServerRow[];
  columns: ServerColumn[];
}

const ServerTable: React.FC<Props> = ({ columns, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.selector}>{col.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => {
              return <td key={col.selector}>{row[col.selector]}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ServerTable;
