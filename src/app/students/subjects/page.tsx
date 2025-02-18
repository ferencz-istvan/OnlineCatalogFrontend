"use client";

import StudentsLayout from "../../layouts/studentsLayout";
import { useState, useEffect, use } from "react";
import TableComponent from "../../components/TableComponent";

function StudentSubjects() {
  const [fetchedClass, setFetchedClass] = useState([]);
  const [fetchedClassMates, setFetchedClassMates] = useState([]);
  const [fetchedTeachersOfClass, setFetchedTeachersOfClass] = useState([]);

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

    const fetchClassMates = async () => {
      const response = await fetch(
        `http://localhost:3000/classes/classmates/${class_id}`
      );
      const data = await response.json();
      setFetchedClassMates(data);
    };
    fetchClassMates();

    const accessToken = localStorage.getItem("accessToken");
    const fetchTeachersOfClass = async () => {
      const response = await fetch(
        `http://localhost:3000/relations/withClass/${class_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      //console.log(`http://localhost:3000/relations/withClass/${class_id}`);
      const data = await response.json();
      setFetchedTeachersOfClass(data);
    };
    fetchTeachersOfClass();
  }, []);

  return (
    <StudentsLayout>
      <div className="container">
        <br />
        <TableComponent
          data={fetchedClassMates}
          tableName="Classmates table"
          headerList={["name", "address"]}
        ></TableComponent>
        <TableComponent
          data={fetchedTeachersOfClass}
          tableName="Subjects and teachers:"
        ></TableComponent>
        <br />
        <TableComponent
          data={fetchedClass}
          tableName="Classes in school"
          headerList={["name", "grade", "specialty"]}
        ></TableComponent>{" "}
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
    </StudentsLayout>
  );
}

export default StudentSubjects;
