"use client";

import StudentsLayout from "../../layouts/studentsLayout";
import { useState, useEffect, use } from "react";
import TableComponent from "../../components/TableComponent";

function StudentSubjects() {
  const [fetchedClass, setFetchedClass] = useState([]);
  const [fetchedClassMates, setFetchedClassMates] = useState([]);

  /*   useEffect(() => {
    try {
      const fetchData = async () => {
        const response = fetch("http://localhost:3000/classes", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await response.json();
      };
    } catch (err) {
      console.error(err);
    }
  }); */

  useEffect(() => {
    const fetchClass = async () => {
      const response = await fetch("http://localhost:3000/classes");
      const data = await response.json();
      setFetchedClass(data);
    };
    fetchClass();

    const storageRole = JSON.parse(
      localStorage.getItem("actual_role") as string
    );
    const class_id = storageRole.class_id;

    console.log("haha");
    console.log(class_id);

    const fetchClassMates = async () => {
      const response = await fetch(
        `http://localhost:3000/classes/classmates/${class_id}`
      );
      const data = await response.json();
      setFetchedClassMates(data);
    };
    fetchClassMates();
  }, []);

  return (
    <StudentsLayout>
      <div>Hello</div>
      <div>Student Subjects</div>
      <div>Hello</div>
      <div>
        <TableComponent
          data={fetchedClass}
          tableName="Casses table"
        ></TableComponent>{" "}
        <br />
        <TableComponent
          data={fetchedClassMates}
          tableName="Classmates table"
        ></TableComponent>
      </div>
    </StudentsLayout>
  );
}

export default StudentSubjects;
