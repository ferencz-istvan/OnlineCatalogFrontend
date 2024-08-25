"use client";
import React, { useState, useEffect } from "react";
import TeachersLayout from "../../layouts/teachersLayout";
import CatalogColumn from "@/app/components/CatalogColumn";
import type { Student, Note, Absence } from "@/app/interfaces/baseInterfaces";
import useNotesAndAbsencesOfClassStore from "@/lib/notesAndAbsencesOfClass";
import LoaderComponent from "@/app/components/LoaderComponent";

const CatalogPage = () => {
  const [studentsOfClass, setStudentsOfClass] = useState<Student[]>([]);
  const [isStudentsLoaded, setIsStudentsLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const store = useNotesAndAbsencesOfClassStore();

  const fetchStudentsOfCLass = async () => {
    console.log(`classID: ${store.classId}`);
    const response = await fetch(
      `http://localhost:3000/classes/classmates/${store.classId}`
    );
    const data = await response.json();
    setStudentsOfClass(data);
    setIsStudentsLoaded(true);
  };

  const loadNotesAbsencesFunction = async () => {
    await store.setNotesOfClass(store.classId, store.subjectId);
    await store.setAbsencesOfClass(store.classId, store.subjectId);
  };

  useEffect(() => {
    const classIdFromLS = JSON.parse(
      localStorage.getItem("class_data") as string
    ).id;
    const classNameFromLS = JSON.parse(
      localStorage.getItem("class_data") as string
    ).name;
    const subjectIdFromLS = JSON.parse(
      localStorage.getItem("subject_data") as string
    ).id;
    const subjectNameFromLS = JSON.parse(
      localStorage.getItem("subject_data") as string
    ).name;
    store.setClassId(classIdFromLS);
    store.setClassName(classNameFromLS);
    store.setSubjectId(subjectIdFromLS);
    store.setSubjectName(subjectNameFromLS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (store.classId) {
      fetchStudentsOfCLass();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.classId]);
  useEffect(() => {
    if (store.classId && store.subjectId) {
      loadNotesAbsencesFunction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.subjectId, store.classId]);
  useEffect(() => {
    if (isStudentsLoaded && store.absencesOfClass && store.notesOfClass) {
      setIsLoaded(false);
      setIsLoaded(true);
    }
  }, [isStudentsLoaded, store.absencesOfClass, store.notesOfClass]);
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
        <h3>Class: {store.className}</h3>
        <h3>Subject: {store.subjectName}</h3>
        <h3>
          Teacher:{" "}
          {localStorage.getItem("actual_role")
            ? JSON.parse(getLocalStorage()?.getItem("actual_role") as string)
                .name
            : null}
        </h3>
      </div>
      <br />
      {isLoaded ? (
        <div className="catalog-container">
          {studentsOfClass.map((student, index) => (
            <div key={index}>
              <CatalogColumn
                nameProp={student.name}
                notes={store.notesOfClass.filter(
                  (note) => note.student_id === student.id
                )}
                absences={store.absencesOfClass.filter(
                  (absence) => absence.student_id === student.id
                )}
                student_id={student.id}
                index={index + 1}
              />
            </div>
          ))}
        </div>
      ) : (
        <LoaderComponent></LoaderComponent>
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
