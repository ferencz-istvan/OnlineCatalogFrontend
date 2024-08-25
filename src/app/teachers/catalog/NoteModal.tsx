"use client";
import React, { useState, useEffect } from "react";
import useNotesAndAbsencesOfClassStore from "@/lib/notesAndAbsencesOfClass";

interface AbsenceModalProps {
  setIsOpen: (isOpen: boolean) => void;
  dataForFetch?: Record<string, any>;
}

const NoteModal: React.FC<AbsenceModalProps> = ({
  setIsOpen,
  dataForFetch = null,
}) => {
  const store = useNotesAndAbsencesOfClassStore();
  const [idForFetch, setIdForFetch] = useState(dataForFetch?.id);
  const [noteValue, setNoteValue] = useState(dataForFetch?.value);
  const [dateValue, setDateValue] = useState(dataForFetch?.date.slice(0, 10));
  const [stateOfModal, setStateOfModal] = useState("details"); //alternative values: settings, deletion
  useEffect(() => {
    console.log(dataForFetch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function modifyNote(idForFetch: number) {
    try {
      const url = `http://localhost:3000/notes/${idForFetch}`;
      const method = "PUT";
      const data = {
        id: dataForFetch?.id,
        value: noteValue,
        student_id: dataForFetch?.student_id,
        subject_id: dataForFetch?.subject_id,
        date: dateValue,
      };
      const token = localStorage.getItem("accessToken");

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function deleteNote(idForFetch: number) {
    try {
      const url = `http://localhost:3000/notes/${idForFetch}`;
      const method = "DELETE";
      const token = localStorage.getItem("accessToken");

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <div className="centerWithFlex">
        {stateOfModal === "details" && (
          <div>
            <p>Note: {dataForFetch?.value}</p>
            <p>Date: {dataForFetch?.date.slice(0, 10)}</p>
            <div className="rowWithFlex">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setStateOfModal("settings");
                }}
              >
                Change data
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setStateOfModal("deletion");
                }}
              >
                Delete note
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
              >
                Exit
              </button>
            </div>
          </div>
        )}
        {stateOfModal === "settings" && (
          <div>
            <form>
              <label htmlFor="grade">Grade:</label>
              <input
                type="number"
                name="grade"
                min={1}
                max={10}
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
              />
              <br />
              <label htmlFor="date">Date: {dateValue}</label>
              <input
                type="date"
                name="date"
                value={dateValue}
                onChange={(e) => setDateValue(e.target.value)}
              />
            </form>
            <div className="rowWithFlex">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={async (e) => {
                  await modifyNote(idForFetch)
                    .then((responseData) => {
                      console.log("Response data:", responseData);
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                  setIsOpen(false);
                  await store.setNotesOfClass(store.classId, store.subjectId);
                  //location.reload();
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        )}
        {stateOfModal === "deletion" && (
          <div>
            <p>Are you sure to want delete this note?</p>
            <div className="rowWithFlex">
              <button
                onClick={async () => {
                  await deleteNote(idForFetch)
                    .then((responseData) => {
                      console.log("Response data:", responseData);
                    })
                    .catch((error) => {
                      console.error("Error:", error);
                    });
                  setIsOpen(false);
                  await store.setNotesOfClass(store.classId, store.subjectId);
                  //location.reload();
                }}
              >
                Delete
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        button {
          padding: 5px;
          margin: 25px;
          border-radius: 7px;
        }
        button:hover {
          background-color: darkslategray;
          color: white;
        }
        .centerWithFlex {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 22px;
        }
        .rowWithFlex {
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
      `}</style>
    </div>
  );
};

export default NoteModal;
