"use client";
import React from "react";
import { useState } from "react";
import DefaultModal from "./DefaultModal";

interface ModalChildProps {
  setIsOpen: (isOpen: boolean) => void;
  id?: number;
}

interface DataTableProps {
  data: any[];
  tableName: string;
  AddItemModal?: React.ComponentType<ModalChildProps>;
  EditItemModal?: React.ComponentType<ModalChildProps>;
  DeleteItemModal?: React.ComponentType<ModalChildProps>;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  tableName,
  AddItemModal,
  EditItemModal,
  DeleteItemModal,
}) => {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [idForFetch, setIdForFetch] = useState(16);

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
      <table>
        <thead>
          <tr>
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
              {Object.entries(row).map(([key, value]: [string, any]) => {
                if (key[0] === "date") {
                  return <td key={key}>Datum</td>;
                }
                return <td key={key}>{value}</td>;
              })}
              {EditItemModal && (
                <td
                  onClick={() => {
                    setIdForFetch(row.id);
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
                    setIdForFetch(row.id);
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
      <DefaultModal
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        buttonName="Add new item "
      >
        {AddItemModal && (
          <AddItemModal setIsOpen={setIsOpenAddModal} id={idForFetch} />
        )}
      </DefaultModal>
      <DefaultModal
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        buttonName="Delete an item "
      >
        {DeleteItemModal && (
          <DeleteItemModal setIsOpen={setIsOpenDeleteModal} id={idForFetch} />
        )}
      </DefaultModal>
      <DefaultModal
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
        buttonName="Delete an item "
      >
        {EditItemModal && (
          <EditItemModal setIsOpen={setIsOpenEditModal} id={idForFetch} />
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
