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
              {Object.values(row).map((value: any, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
