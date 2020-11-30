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
            <th key={col.selector} className="py-4 px-2 border-t bg-gray-100">
              {col.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => {
              let colClass = "py-4 px-2 text-center border-t";
              if (col.selector === "pid" && row[col.selector] === 0) {
                colClass = `${colClass} bg-red-200`;
              }

              if (col.selector === "pid" && row[col.selector] !== 0) {
                colClass = `${colClass} bg-green-200`;
              }

              return (
                <td key={col.selector} className={colClass}>
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
