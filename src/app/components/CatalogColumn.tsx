"use client";
import React, { useEffect, useState } from "react";
import DefaultModal from "./DefaultModal";

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

interface CatalogColumnProps {
  nameProp?: string;
  notes?: Note[];
  absences?: Absence[];
}

const CatalogColumn: React.FC<CatalogColumnProps> = ({
  nameProp = "",
  notes = null,
  absences = null,
}) => {
  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem("actual_role") as string).role
  );
  const [isOpen, setIsOpen] = useState(false);
  /*  useEffect(() => {
    console.log("NOTES OF COLUMN" + nameProp);
    console.log(notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 */
  return (
    <div>
      <div className="subject-column">
        <div className="header">{nameProp ? nameProp : "Subject name"}</div>
        {notes ? (
          <div className="notes">
            {notes.map((oneNote, index) => (
              <p key={index}>{oneNote.value}</p>
            ))}
          </div>
        ) : (
          <div className="notes">
            <p>testnote</p>
            <p>testnote</p>
          </div>
        )}
        {absences ? (
          <div className="absences">
            {absences.map((oneAbsence, index) => (
              <div className={oneAbsence.status} key={index}>
                <abbr title={oneAbsence.status}>
                  {oneAbsence.date.slice(2, 10).replaceAll("-", ".")}
                </abbr>
              </div>
            ))}
          </div>
        ) : (
          <div className="absences">
            <p>test.abs</p>
            <p>test.abs</p>
          </div>
        )}
        <div className="mean">mean</div>
      </div>
      <DefaultModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        buttonName="Set this absence"
      >
        {/*  {EditItemModal && (
          <EditItemModal
            setIsOpen={setIsOpenEditModal}
            dataForFetch={dataForFetch}
          />
        )} */}
      </DefaultModal>
      <style jsx>{`
        .subject-column {
          display: grid;
          grid-template-areas:
            "header header"
            "notes absences"
            "mean absences";
          gap: 5px;
          background-color: darkslategray;
          padding: 10px 5px;
          min-width: 200px;
        }
        .subject-column > div {
          text-align: center;
          padding: 10px 0px;
          font-size: 26px;
          background-color: white;
        }
        .header {
          grid-area: header;
        }
        .notes {
          grid-area: notes;
        }
        .absences {
          grid-area: absences;
        }
        .absence {
          margin: 10px;
          background-color: lightgreen;
          border: 3px solid green;
          border-radius: 15px;
        }
        .verified {
          margin: 10px;
          background-color: lightgreen;
          border: 3px solid green;
          border-radius: 15px;
          cursor: pointer;
        }
        .unverified {
          margin: 10px;
          background-color: pink;
          border: 3px solid red;
          border-radius: 15px;
          cursor: pointer;
        }
        .mean {
          grid-area: mean;
        }
        abbr {
          text-decoration: none;
        }
      `}</style>
    </div>
  );
};

export default CatalogColumn;
