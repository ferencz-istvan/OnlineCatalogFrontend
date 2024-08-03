"use client";
import React from "react";
import { useState } from "react";
import DefaultModal from "./DefaultModal";

interface ModalChildProps {
  setIsOpen: (isOpen: boolean) => void;
  dataForFetch?: Record<string, any>;
}

interface DataTableProps {
  data: any[];
  tableName: string;
  AddItemModal?: React.ComponentType<ModalChildProps>;
  EditItemModal?: React.ComponentType<ModalChildProps>;
  DeleteItemModal?: React.ComponentType<ModalChildProps>;
  headerList?: string[];
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  tableName,
  AddItemModal,
  EditItemModal,
  DeleteItemModal,
  headerList,
}) => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [dataForFetch, setDataForFetch] = useState([]);

  return (
    <div>
      <h1>{tableName}</h1>
      {AddItemModal && (
        <div>
          <button onClick={() => setIsOpenAddModal(true)}>
            ✙ Add new item
          </button>
          <br />
        </div>
      )}
      {!headerList ? (
        <table>
          <thead>
            <tr>
              <th>nr.</th>
              {data.length > 0 &&
                Object.keys(data[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              {EditItemModal && <th>edit</th>}
              {DeleteItemModal && <th>delete</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {Object.entries(row).map(([key, value]: [string, any]) => {
                  if (key[0] === "date") {
                    return <td key={key}>Datum</td>;
                  }
                  return <td key={key}>{value}</td>;
                })}
                {EditItemModal && (
                  <td
                    onClick={() => {
                      setDataForFetch(row);
                      setIsOpenEditModal(true);
                    }}
                    style={{
                      filter: `drop-shadow(3px 5px 4px darkslategray)`,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    &#x1F4DD;
                  </td>
                )}
                {DeleteItemModal && (
                  <td
                    onClick={() => {
                      setDataForFetch(row);
                      setIsOpenDeleteModal(true);
                    }}
                    style={{
                      filter: `drop-shadow(3px 5px 4px darkslategray)`,
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    &#9940;
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>nr.</th>
                {headerList.length > 0 &&
                  headerList.map((header, index) => (
                    <th key={index}>{header}</th>
                  ))}
                {EditItemModal && <th>edit</th>}
                {DeleteItemModal && <th>delete</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {headerList.map((header, headerIndex) => (
                    <td key={header}>{row[header]}</td>
                  ))}
                  {EditItemModal && (
                    <td
                      onClick={() => {
                        setDataForFetch(row);
                        setIsOpenEditModal(true);
                      }}
                      style={{
                        filter: `drop-shadow(3px 5px 4px darkslategray)`,
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      &#x1F4DD;
                    </td>
                  )}
                  {DeleteItemModal && (
                    <td
                      onClick={() => {
                        setDataForFetch(row);
                        setIsOpenDeleteModal(true);
                      }}
                      style={{
                        filter: `drop-shadow(3px 5px 4px darkslategray)`,
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                    >
                      &#9940;
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <DefaultModal
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        buttonName="Add new item "
      >
        {AddItemModal && <AddItemModal setIsOpen={setIsOpenAddModal} />}
      </DefaultModal>
      <DefaultModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        buttonName="Delete an item "
      >
        {DeleteItemModal && (
          <DeleteItemModal
            setIsOpen={setIsOpenDeleteModal}
            dataForFetch={dataForFetch}
          />
        )}
      </DefaultModal>
      <DefaultModal
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
        buttonName="Delete an item "
      >
        {EditItemModal && (
          <EditItemModal
            setIsOpen={setIsOpenEditModal}
            dataForFetch={dataForFetch}
          />
        )}
      </DefaultModal>
      <style jsx>{`
        table {
          border: 2px solid darkslategrey;
          padding: 15px;
          border-radius: 20px;
        }
        thead {
          background-color: darkgray;
        }
        thead th {
          padding: 10px;
          border-radius: 5px;
        }
        tbody td {
          padding: 10px;
        }
      `}</style>
    </div>
  );
};

export default DataTable;

//child component variants for table modal
{
  /*  <TestModal
          setIsOpen={function (isOpen: boolean): void {
            throw new Error("Function not implemented.");
          }}
        /> */
}
{
  /*  <AddSubject
          setIsOpen={function (isOpen: boolean): void {
            throw new Error("Function not implemented.");
          }}
          id={idForFetch}
        /> */
}
