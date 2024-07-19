"use client";

import StudentsLayout from "../../layouts/studentsLayout";
import TableComponent from "../../components/TableComponent";
import { useState, useEffect } from "react";

function StudentNotes() {
  const [notesOfStudent, setNotesOfStudent] = useState([]);

  useEffect(() => {
    const student_id = JSON.parse(
      localStorage.getItem("actual_role") as string
    ).id;
    const accessToken = localStorage.getItem("accessToken");
    const fetchClass = async () => {
      const response = await fetch(
        `http://localhost:3000/notes/ofStudent/${student_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setNotesOfStudent(data);
    };
    fetchClass();
  }, []);
  return (
    <StudentsLayout>
      <div>Hello</div>
      <div>Student Notes</div>
      <div>Hello</div>
      <TableComponent
        data={notesOfStudent}
        tableName="Notes of student"
      ></TableComponent>
    </StudentsLayout>
  );
}

export default StudentNotes;
