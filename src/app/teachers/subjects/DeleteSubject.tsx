import React from "react";
import { useState } from "react";

interface DeleteSubjectProps {
  setIsOpen: (isOpen: boolean) => void;
  dataForFetch?: Record<string, any>;
}

const DeleteSubject: React.FC<DeleteSubjectProps> = ({
  setIsOpen,
  dataForFetch = null,
}) => {
  const id = dataForFetch?.id;
  const [newNameValue, setNewNameValue] = useState("name");
  const [newDescriptionValue, setNewDescriptionValue] = useState("description");
  const handleClose = () => {
    setIsOpen(false);
  };

  async function DeleteSubjectFetch() {
    try {
      const url = `http://localhost:3000/subjects/${id}`;
      const method = "DELETE";
      //const data = { name: newNameValue, description: newDescriptionValue };
      const token = localStorage.getItem("accessToken");

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        /*   body: JSON.stringify(data), */
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  /*Calling the function: 
  AddSubjectFetch()
    .then((responseData) => {
      console.log("Response data:", responseData);
    })
    .catch((error) => {
      console.error("Error:", error);
    }); */

  return (
    <div>
      <p>Are you sure to delete this element?</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("ide jön a fetch");
          console.log(`id for fetch ${id}`);
          DeleteSubjectFetch()
            .then((responseData) => {
              console.log("Response data:", responseData);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          handleClose();
          location.reload();
        }}
      >
        Delete this element
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleClose();
        }}
      >
        Cancel
      </button>
      <style jsx>
        {`
          button {
            padding: 10px;
            margin: 10px;
            border-radius: 15px;
            cursor: pointer;
          }
          button:hover {
            box-shadow: 3px 3px 8px darkslategray;
          }
        `}
      </style>
    </div>
  );
};

export default DeleteSubject;
