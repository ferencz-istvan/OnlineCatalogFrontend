import React from "react";
import { useState } from "react";

interface AddSubjectProps {
  setIsOpen: (isOpen: boolean) => void;
  data?: Record<string, any>;
}

const AddSubject: React.FC<AddSubjectProps> = ({ setIsOpen, data = null }) => {
  const id = data?.id;
  const [nameValue, setNameValue] = useState("name");
  const [descriptionValue, setDescriptionValue] = useState("description");
  const handleClose = () => {
    setIsOpen(false);
  };

  async function AddSubjectFetch() {
    try {
      const url = "http://localhost:3000/subjects";
      const method = "POST";
      const data = { name: nameValue, description: descriptionValue };
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
      <form>
        <label htmlFor="name">Name of subject:</label>
        <br />
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        <br />
        <label htmlFor="description">Description of subject:</label>
        <br />
        <textarea
          id="description"
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
          rows={7}
          cols={50}
        />
        <br />
        <button
          onClick={async (e) => {
            e.preventDefault();
            await AddSubjectFetch()
              .then((responseData) => {
                console.log("Response data:", responseData);
                //setNameValue(responseData.name);
                //setDescriptionValue(responseData.description);
              })
              .catch((error) => {
                console.error("Error:", error);
              });

            handleClose();
            location.reload();
          }}
        >
          Add a new subject
        </button>
      </form>
    </div>
  );
};

export default AddSubject;
