"use client";

import Modal from "@/app/components/CustomModal";
import TeachersLayout from "../../layouts/teachersLayout";
import { useState, useEffect } from "react";
import TableComponent from "../../components/TableComponent";
import AddSubject from "./AddSubject";
import DeleteSubject from "./DeleteSubject";
import EditSubject from "./EditSubject";

function TeacherSubjects() {
  const [allSubject, setAllSubject] = useState([]);

  function addNewElement() {
    console.log("kocsog");
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const fetchSubjects = async () => {
      const response = await fetch(`http://localhost:3000/subjects/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setAllSubject(data);
    };
    fetchSubjects();
  }, []);
  return (
    <TeachersLayout>
      <h3>Adding and removing subjects for whole school:</h3>
      <br />
      <div>Teachers classes</div>
      <TableComponent
        data={allSubject}
        tableName="Subjects of school"
        AddItemModal={AddSubject}
        EditItemModal={EditSubject}
        DeleteItemModal={DeleteSubject}
      ></TableComponent>
      <div>
        <Modal buttonName="Modal test" />
      </div>
    </TeachersLayout>
  );
}

export default TeacherSubjects;
