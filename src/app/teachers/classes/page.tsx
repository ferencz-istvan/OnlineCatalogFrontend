"use client";

import Modal from "@/app/components/CustomModal";
import TeachersLayout from "../../layouts/teachersLayout";
import { useState, useEffect, useRef } from "react";
import TableComponent from "../../components/TableComponent";
import AddClassRelation from "./AddClassRelation";
import DeleteSubject from "./DeleteClass Relation";

function TeacherAbsences() {
  //const [relationsOfTeacher, setRelationsOfTeacher] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const relationsOfTeacherRef = useRef([]);

  useEffect(() => {
    const teacher_id = JSON.parse(
      localStorage.getItem("actual_role") as string
    ).id;
    const accessToken = localStorage.getItem("accessToken");
    const fetchRelations = async () => {
      const response = await fetch(
        `http://localhost:3000/relations/withTeacher/${teacher_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      //setRelationsOfTeacher(data);
      relationsOfTeacherRef.current = data;
      setIsLoaded(true);
    };
    fetchRelations();
  }, []);
  /*   if (!isLoaded) {
    return (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          fontSize: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  } */
  return (
    <TeachersLayout>
      <div>Hello</div>
      <div>Teachers classes</div>
      <div>Hello</div>
      {isLoaded ? (
        <TableComponent
          data={relationsOfTeacherRef.current}
          tableName="The subjects that I teach:"
          AddItemModal={AddClassRelation}
          DeleteItemModal={DeleteSubject}
          headerList={["class", "subject"]}
        ></TableComponent>
      ) : (
        <div>Loading...</div>
      )}
      <div>
        <Modal buttonName="Modal test" />
      </div>
    </TeachersLayout>
  );
}

export default TeacherAbsences;
