"use client";
import React, { useState, useEffect } from "react";
import TeachersLayout from "../../layouts/teachersLayout";
import CatalogColumn from "@/app/components/CatalogColumn";
import type { Student, Note, Absence } from "@/app/interfaces/baseInterfaces";

const CatalogPage = () => {
  const [classId, setClassId] = useState(0);
  const [className, setClassName] = useState("");
  const [subjectId, setSubjectId] = useState(0);
  const [subjectName, setSubjectName] = useState("");
  //const [teacherId, setTeacherId] = useState(0);
  const [studentsOfClass, setStudentsOfClass] = useState<Student[]>([]);
  const [notesOfClass, setNotesOfClass] = useState<Note[]>([]);
  const [absencesOfClass, setAbsencesOfClass] = useState<Absence[]>([]);
  const [isStudentsLoaded, setIsStudentsLoaded] = useState(false);
  const [isNotesLoaded, setIsNotesLoaded] = useState(false);
  const [isAbsencesLoaded, setIsAbsencesLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchStudentsOfCLass = async () => {
    console.log(`classID: ${classId}`);
    const response = await fetch(
      `http://localhost:3000/classes/classmates/${classId}`
    );
    const data = await response.json();
    setStudentsOfClass(data);
    setIsStudentsLoaded(true);
    console.log("list of students:");
    console.log(data);
  };
  const fetchNotesOfClass = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
      `http://localhost:3000/notes/ofClass/${classId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    setNotesOfClass(data);
    setIsNotesLoaded(true);
    console.log("list of notes:");
    console.log(data);
  };
  const fetchAbsencesOfClass = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(
      `http://localhost:3000/absences/ofClass/${classId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    setAbsencesOfClass(data);
    setIsAbsencesLoaded(true);
  };

  useEffect(() => {
    setClassId(JSON.parse(localStorage.getItem("class_data") as string).id);
    setClassName(JSON.parse(localStorage.getItem("class_data") as string).name);
    setSubjectId(JSON.parse(localStorage.getItem("subject_data") as string).id);
    setSubjectName(
      JSON.parse(localStorage.getItem("subject_data") as string).name
    );
    //setTeacherId(JSON.parse(localStorage.getItem("actual_role") as string).id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (classId) {
      fetchStudentsOfCLass();
      fetchNotesOfClass();
      fetchAbsencesOfClass();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classId]);
  useEffect(() => {
    if (isStudentsLoaded && isNotesLoaded && isAbsencesLoaded) {
      setIsLoaded(true);
    }
  }, [isStudentsLoaded, isNotesLoaded, isAbsencesLoaded]);

  function getLocalStorage() {
    if (typeof window != "undefined") {
      return window.localStorage;
    }
    return null;
  }

  return (
    <TeachersLayout>
      <h2>Catalog page</h2>
      <div className="header-info">
        <h3>Class: {className}</h3>
        <h3>Subject: {subjectName}</h3>
        <h3>
          Teacher:{" "}
          {
            //JSON.parse(localStorage.getItem("actual_role") as string).name
          }
          {JSON.parse(getLocalStorage()?.getItem("actual_role") as string).name}
        </h3>
      </div>
      <br />
      {isLoaded && (
        <div className="catalog-container">
          {studentsOfClass.map((student, index) => (
            <div key={index}>
              <CatalogColumn
                nameProp={student.name}
                notes={notesOfClass.filter(
                  (note) => note.student_id === student.id
                )}
                absences={absencesOfClass.filter(
                  (absence) => absence.student_id === student.id
                )}
                student_id={student.id}
                index={index + 1}
              />
            </div>
          ))}
        </div>
      )}
      <style jsx>
        {`
          .catalog-container {
            display: flex;
            overflow-x: scroll;
            border: solid 3px black;
            border-radius: 10px;
          }
          .header-info {
            display: flex;
          }
          .header-info > * {
            margin-right: 50px;
            background-color: darkseagreen;
            padding: 8px;
            border-radius: 4px;
             {
              /* box-shadow: 3px 3px 10px darkslategray; */
            }
            border: 3px solid darkslategray;
          }
          @media only screen and (max-width: 700px) {
            h2 {
              margin-left: 20px;
            }
            .header-info {
              flex-direction: column;
              background-color: darkseagreen;
              margin: 20px;
              padding: 10px;
              border-radius: 30px;
            }
            .header-info > * {
              margin: 2px;
              background-color: transparent;
              border: none;
            }
          }
        `}
      </style>
    </TeachersLayout>
  );
};

export default CatalogPage;
