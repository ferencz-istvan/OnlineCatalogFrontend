"use client";
import React, { useState, useEffect } from "react";
import TeachersLayout from "../../layouts/teachersLayout";
import CatalogColumn from "@/app/components/CatalogColumn";

interface Student {
  id: number;
  name: string;
  class_id: number;
  parent_id: number;
  address: string;
}

interface Note {
  id: number;
  value: number;
  student_id: number;
  subject_id: number;
  date: string;
}

interface Absence {
  id: number;
  status: string;
  student_id: number;
  subject_id: number;
  date: string;
}

const CatalogPage = () => {
  const [classId, setClassId] = useState(0);
  const [subjectId, setSubjectId] = useState(0);
  const [teacherId, setTeacherId] = useState(0);
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
    console.log("list of absences:");
    console.log(data);
  };

  useEffect(() => {
    setClassId(parseInt(localStorage.getItem("class_id") as string));
    setSubjectId(parseInt(localStorage.getItem("subject_id") as string));
    setTeacherId(JSON.parse(localStorage.getItem("actual_role") as string).id);
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

  return (
    <TeachersLayout>
      <h2>Catalog page</h2>
      <p>Class_id: {classId}</p>
      <p>Subject_id: {subjectId}</p>
      <p>Teacher_id: {teacherId}</p>
      <br />
      {isLoaded && (
        <div className="catalogContainer">
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
              />
            </div>
          ))}
        </div>
      )}
      <style jsx>
        {`
          .catalogContainer {
            display: flex;
            overflow-x: scroll;
          }
        `}
      </style>
    </TeachersLayout>
  );
};

export default CatalogPage;
