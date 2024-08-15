import React from "react";
import { useState, useEffect } from "react";

interface EditSubjectProps {
  setIsOpen: (isOpen: boolean) => void;
  dataForFetch?: Record<string, any>;
}

const EditSubject: React.FC<EditSubjectProps> = ({
  setIsOpen,
  dataForFetch = null,
}) => {
  const id = dataForFetch?.id;
  const [nameValue, setNameValue] = useState("name");
  const [descriptionValue, setDescriptionValue] = useState("description");
  const [fetchedSubject, setFetchedSubject] = useState({});
  const handleClose = () => {
    setIsOpen(false);
  };

  async function GetSubjectWithIdFetch(id: any) {
    try {
      const url = `http://localhost:3000/subjects/${id}`;
      const method = "GET";
      //const data = { name: nameValue, description: descriptionValue };
      const token = localStorage.getItem("accessToken");

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        //body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function EditSubjectFetch(id: number) {
    try {
      const url = `http://localhost:3000/subjects/${id}`;
      const method = "PUT";
      const data = { description: descriptionValue, name: nameValue };
      const token = localStorage.getItem("accessToken");

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    GetSubjectWithIdFetch(id)
      .then((responseData) => {
        console.log("Response data:", responseData);
        setFetchedSubject(responseData);
        setNameValue(responseData.name);
        setDescriptionValue(responseData.description);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);
  return (
    <div>
      <h4>Editing the item: </h4>
      <form>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="description">Description: </label>
        <br />
        <textarea
          id="description"
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
          rows={7}
          cols={50}
        />
        <br />
      </form>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("ide jön a fetch");
          console.log(`id for fetch ${id}`);
          EditSubjectFetch(id)
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
        Change
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

export default EditSubject;
