import React from "react";

interface DataTableProps {
  data: any[];
  tableName: string;
}

const DataTable: React.FC<DataTableProps> = ({ data, tableName }) => {
  return (
    <div>
      <h1>{tableName}</h1>
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key, index) => (
                <th key={index}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.entries(row).map(([key, value]: [string, any]) => {
                if (key[0] === "date") {
                  return <td key={key}>Datum</td>;
                }
                return <td key={key}>{value}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
