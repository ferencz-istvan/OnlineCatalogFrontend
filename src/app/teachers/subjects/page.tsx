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
      <div className="table-container">
        <TableComponent
          data={allSubject}
          tableName="Subjects of school"
          AddItemModal={AddSubject}
          EditItemModal={EditSubject}
          DeleteItemModal={DeleteSubject}
          headerList={["name", "description"]}
        ></TableComponent>
      </div>
      <div>
        <Modal buttonName="Modal test" />
      </div>
      <style jsx>
        {`
          .table-container {
            display: flex;
            justify-content: center;
          }
        `}
      </style>
    </TeachersLayout>
  );
}

export default TeacherSubjects;
