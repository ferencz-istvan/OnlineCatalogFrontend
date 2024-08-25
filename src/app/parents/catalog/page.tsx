"use client";

import ParentsLayout from "../../layouts/parentsLayout";
import TableComponent from "../../components/TableComponent";
import { useState, useEffect } from "react";
import CatalogColumn from "@/app/components/CatalogColumn";
import type { Subject, Note, Absence } from "@/app/interfaces/baseInterfaces";

function ChildStudentNotes() {
  const [student_id, setStudent_id] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [notesOfStudent, setNotesOfStudent] = useState<Note[]>([]);
  const [absencesOfStudent, setAbsencesOfStudent] = useState<Absence[]>([]);
  const [isCatalogView, setIsCatalogView] = useState(true);
  const [childOfParent, setChildOfParent] = useState(
    JSON.parse(localStorage.getItem("child_data") as string)
  );

  const fetchSubjectOfClass = async () => {
    const class_id = JSON.parse(
      localStorage.getItem("child_data") as string
    ).class_id;
    const response = await fetch(
      `http://localhost:3000/relations/subjectsOfClass/${class_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    setSubjectList(data);
  };

  const fetchNotesOfStudent = async () => {
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
  const fetchAbsencesOfStudent = async () => {
    const response = await fetch(
      `http://localhost:3000/absences/ofStudent/${student_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    setAbsencesOfStudent(data);
  };

  useEffect(() => {
    const storedStudent = localStorage.getItem("child_data");
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedStudent) {
      setStudent_id(JSON.parse(storedStudent).id);
    }
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);

  useEffect(() => {
    if (student_id && accessToken) {
      fetchSubjectOfClass();
      fetchNotesOfStudent();
      fetchAbsencesOfStudent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student_id, accessToken]);
  return (
    <ParentsLayout>
      <p className="title">
        Notes and absences of <b>{childOfParent.name}</b>
      </p>
      <button
        onClick={() => {
          setIsCatalogView(!isCatalogView);
          //console.log(isCatalogView);
        }}
      >
        {isCatalogView ? "Timeline view" : "Catalog view"}
      </button>

      {isCatalogView ? (
        <>
          <div className="catalog-container">
            {subjectList.map((subject, index) => (
              <div key={index}>
                <CatalogColumn
                  nameProp={subject.name}
                  notes={notesOfStudent.filter(
                    (note) => note.subject_id === subject.id
                  )}
                  absences={absencesOfStudent.filter(
                    (absence) => absence.subject_id === subject.id
                  )}
                  index={index + 1}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="timeline-container">
          <div className="timeline-notes-title">
            <h3>Notes</h3>
          </div>
          <div className="timeline-absences-title">
            <h3>Absences</h3>
          </div>
          <div className="timeline-notes">
            {notesOfStudent
              .slice() // Create a copy of the array to avoid modifying the original
              .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
              .map((note, index) => {
                const subject = subjectList.find(
                  (subject) => subject.id === note.subject_id
                );
                const subjectName = subject ? subject.name : "Unknown subject";
                return (
                  <div key={index}>
                    <p>
                      <span className="note-value">{note.value}</span>:{" "}
                      {subjectName} ({note.date.slice(0, 10)})
                    </p>
                  </div>
                );
              })}
          </div>

          <div className="timeline-absences">
            {absencesOfStudent
              .slice() // Create a copy of the array to avoid modifying the original
              .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
              .map((absence, index) => {
                const subject = subjectList.find(
                  (subject) => subject.id === absence.subject_id
                );
                const subjectName = subject ? subject.name : "Unknown subject";
                return (
                  <div key={index} className={absence.status}>
                    <span>
                      {absence.date.slice(0, 10)}
                      {" - "}
                      {subjectName} {" - "}
                      {absence.status}
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/*
        <TableComponent
          data={notesOfStudent}
          tableName="Notes of student"
          headerList={["value", "date"]}
        ></TableComponent>
      */}
      <style jsx>
        {`
          .title {
            margin: 20px 20px 5px 20px;
            font-size: 18px;
          }
          .verified {
            margin: 5px;
            background-color: darkseagreen;
            color: darkslategray;
            border: 3px solid darkslategray;
            border-radius: 30px;
            cursor: pointer;
            padding: 5px;
          }
          .unverified {
            margin: 5px;
            background-color: pink;
            border: 3px solid red;
            border-radius: 30px;
            cursor: pointer;
            padding: 5px;
          }
          .deleted {
            margin: 5px;
            background-color: lightgray;
            color: darkgray;
            border-radius: 30px;
            padding: 3px;
          }
          .timeline-container {
            margin: 0 auto;
            width: 80%;
            max-width: 900px;
            background-color: slategray;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            padding: 12px;
            max-height: 90vh;
            overflow-y: scroll;
            border: 3px solid darkslategray;
            border-radius: 6px;
          }
          .timeline-container > div {
            background-color: white;
            border-radius: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          button {
            padding: 10px;
            margin: 10px;
            border-radius: 15px;
            cursor: pointer;
          }
          button:hover {
            background-image: linear-gradient(
              to bottom right,
              darkseagreen,
              black
            );
            color: white;
            box-shadow: 2px 2px 5px 1px darkslategray;
          }
          .catalog-container {
            display: flex;
            overflow-x: scroll;
          }
          .header-info {
            display: flex;
          }
          .header-info > * {
            margin-right: 50px;
            background-color: darkseagreen;
            padding: 8px;
            border-radius: 4px;
            box-shadow: 3px 3px 10px darkslategray;
          }
          .note-value {
            font-size: 20px;
            font-weight: 600;
            margin: 0px 5px;
          }
          @media only screen and (max-width: 700px) {
            .header-info {
              flex-direction: column;
            }
            .header-info > * {
              margin: 2px;
            }
          }
        `}
      </style>
    </ParentsLayout>
  );
}

export default ChildStudentNotes;
