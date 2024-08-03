import React, { useEffect } from "react";
import { useState } from "react";

interface DeleteSubjectProps {
  setIsOpen: (isOpen: boolean) => void;
  dataForFetch?: Record<string, any>;
}

const DeleteSubject: React.FC<DeleteSubjectProps> = ({
  setIsOpen,
  dataForFetch = null,
}) => {
  const [subjectIdForDelete, setSubjectIdForDelete] = useState(0);
  const [classIdForDelete, setClassIdForDelete] = useState(0);
  const [teacherIdForDelete, setTeacherIdForDelete] = useState(0);
  const handleClose = () => {
    setIsOpen(false);
  };

  const setAllState = () => {
    setTeacherIdForDelete(
      JSON.parse(localStorage.getItem("actual_role") as string).id
    );
    if (dataForFetch) {
      setClassIdForDelete(dataForFetch.class_id as number);
      setSubjectIdForDelete(dataForFetch.subject_id as number);
    }
  };

  useEffect(() => {
    setAllState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function DeleteSubjectFetch() {
    try {
      const url = `http://localhost:3000/relations/`;
      const method = "DELETE";
      const data = {
        class_id: classIdForDelete,
        subject_id: subjectIdForDelete,
        teacher_id: teacherIdForDelete,
      };
      console.log("data for delete:");
      console.log(data);
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
      <p>Are you sure to delete this element?</p>
      {dataForFetch &&
        Object.entries(dataForFetch).map(([key, value]: [string, any]) => {
          return (
            <div key={key}>
              {key}: {typeof value}
            </div>
          );
        })}
      <div>teacher_id: {typeof teacherIdForDelete}</div>
      <button
        onClick={(e) => {
          e.preventDefault();
          DeleteSubjectFetch()
            .then((responseData) => {
              console.log("Response delete data:", responseData);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          handleClose();
          /* location.reload(); */
        }}
      >
        Delete this relation
      </button>
    </div>
  );
};

export default DeleteSubject;
