"use client";
import React, { useEffect, useState } from "react";
import DefaultModal from "./DefaultModal";
import AbsenceModal from "../teachers/catalog/AbsenceModal";
import AddNoteModal from "../teachers/catalog/AddNote";
import AddAbsenceModal from "../teachers/catalog/AddAbsence";
import NoteModal from "../teachers/catalog/NoteModal";
import type { Note, Absence } from "../interfaces/baseInterfaces";

interface CatalogColumnProps {
  nameProp?: string;
  notes?: Note[];
  absences?: Absence[];
  student_id?: number;
  index?: number;
}

const CatalogColumn: React.FC<CatalogColumnProps> = ({
  nameProp = "",
  notes = null,
  absences = null,
  student_id = 0,
  index = 0,
}) => {
  /*  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem("actual_user") as string).role
  ); */
  const [role, setRole] = useState("");
  const [isOpenNote, setIsOpenNote] = useState(false);
  const [isOpenAbsence, setIsOpenAbsence] = useState(false);
  const [isOpenAddNote, setIsOpenAddNote] = useState(false);
  const [isOpenAddAbsence, setIsOpenAddAbsence] = useState(false);
  const [actualAbsence, setActualAbsence] = useState<Absence>({
    id: 0,
    status: "",
    student_id: 0,
    subject_id: 0,
    date: "",
  });
  const [actualNote, setActualNote] = useState<Note>({
    id: 0,
    value: 0,
    student_id: 0,
    subject_id: 0,
    date: "",
  });

  useEffect(() => {
    const actualUser = localStorage.getItem("actual_user");
    //stateRole = JSON.parse(
    //localStorage.getItem("actual_user") as string
    //).role;
    if (actualUser) {
      setRole(JSON.parse(actualUser).role);
    }
  }, []);
  return (
    <div>
      <div className="subject-column">
        <div className="header">
          {nameProp ? `${index}. ${nameProp}` : "Subject name"}
        </div>
        {notes ? (
          <div className="notes">
            {role === "Teacher" && (
              <div className="addAbs" onClick={() => setIsOpenAddNote(true)}>
                ✎ note{" "}
              </div>
            )}
            {notes.map((oneNote, index) => (
              <div
                className="oneNote"
                key={index}
                onClick={() => {
                  setActualNote(oneNote);
                  setIsOpenNote(true);
                }}
              >
                <abbr title={oneNote.date.slice(0, 10)}>{oneNote.value}</abbr>
              </div>
            ))}
          </div>
        ) : (
          <div>Space for notes</div>
        )}
        {absences ? (
          <div className="absences">
            {role === "Teacher" && (
              <div className="addAbs" onClick={() => setIsOpenAddAbsence(true)}>
                ✒ abs.
              </div>
            )}
            {absences.map((oneAbsence, index) => (
              <div
                className={oneAbsence.status}
                key={index}
                onClick={() => {
                  setActualAbsence(oneAbsence);
                  setIsOpenAbsence(true);
                }}
              >
                <abbr title={oneAbsence.status}>
                  {oneAbsence.date.slice(2, 10).replaceAll("-", ".")}
                </abbr>
              </div>
            ))}
          </div>
        ) : (
          <div>Space for absences</div>
        )}
        <div className="mean">
          {(notes ?? []).length > 0
            ? (
                (notes ?? []).reduce((acc, current) => acc + current.value, 0) /
                (notes ?? []).length
              ).toFixed(2)
            : "mean"}
        </div>
      </div>
      <DefaultModal
        isOpen={isOpenAbsence}
        setIsOpen={setIsOpenAbsence}
        buttonName="Setting absence like a teaher:"
      >
        {actualAbsence.id != 0 ? (
          <AbsenceModal
            setIsOpen={setIsOpenAbsence}
            dataForFetch={actualAbsence}
          />
        ) : (
          <React.Fragment />
        )}
      </DefaultModal>
      <DefaultModal
        isOpen={isOpenNote}
        setIsOpen={setIsOpenNote}
        buttonName="Note details:"
      >
        {actualNote.id != 0 ? (
          <NoteModal setIsOpen={setIsOpenAbsence} dataForFetch={actualNote} />
        ) : (
          <React.Fragment />
        )}
      </DefaultModal>
      <DefaultModal
        isOpen={isOpenAddNote}
        setIsOpen={setIsOpenAddNote}
        buttonName="Add a new note:"
      >
        <AddNoteModal setIsOpen={setIsOpenAddNote} student_id={student_id} />
      </DefaultModal>
      <DefaultModal
        isOpen={isOpenAddAbsence}
        setIsOpen={setIsOpenAddAbsence}
        buttonName="Add a new absence:"
      >
        <AddAbsenceModal
          setIsOpen={setIsOpenAddAbsence}
          student_id={student_id}
        />
      </DefaultModal>
      <style jsx>{`
        .subject-column {
          display: grid;
          grid-template-areas:
            "header header"
            "notes absences"
            "mean absences";
          grid-template-rows: 50px 1fr 45px;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
          background-color: darkslategray;
          padding: 10px 5px;
          min-width: 200px;
          min-height: 500px;
        }
        .subject-column > div {
          text-align: center;
          padding: 10px 0px;
          font-size: 24px;
          background-color: white;
        }
        .header {
          grid-area: header;
          border-radius: 10px;
        }
        .addAbs {
          color: white;
          background-color: darkslategray;
          border-radius: 10px;
          font-size: 22px;
          cursor: pointer;
          padding: 2px 5px;
        }
        .addAbs:hover {
          background-color: black;
        }
        .notes {
          grid-area: notes;
          border-radius: 10px;
        }
        .oneNote {
          padding: 5px;
          margin: 5px;
          font-weight: 600;
          cursor: pointer;
        }
        .absences {
          grid-area: absences;
          border-radius: 10px;
        }
        .absence {
          margin: 10px;
          background-color: lightgreen;
          border: 3px solid green;
          border-radius: 15px;
        }
        .verified {
          margin: 10px;
          background-color: darkseagreen;
          color: darkslategray;
          border: 3px solid darkslategray;
          border-radius: 12px;
          cursor: pointer;
          padding: 3px;
        }
        .unverified {
          margin: 10px;
          background-color: pink;
          border: 3px solid red;
          border-radius: 12px;
          cursor: pointer;
          padding: 3px;
        }
        .deleted {
          margin: 10px;
          background-color: lightgray;
          color: darkgray;
          border-radius: 12px;
          padding: 3px;
        }
        .mean {
          grid-area: mean;
          font-weight: 600;
        }
        abbr {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default CatalogColumn;
