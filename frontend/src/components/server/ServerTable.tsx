import React from "react";
import { ServerColumn } from "../../types/ServerColumn";
import { ServerRow } from "../../types/ServerRow";

interface Props {
  data: ServerRow[];
  columns: ServerColumn[];
}

const ServerTable: React.FC<Props> = ({ columns, data }) => {
  return (
    <table className="border-collapse">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.selector} className="py-4 px-2 border-t bg-blue-100">
              {col.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => {
              return (
                <td
                  key={col.selector}
                  className="py-4 px-2 text-center border-t"
                >
                  {row[col.selector]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ServerTable;
