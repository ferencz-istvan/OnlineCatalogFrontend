"use client";
import React, { useState, useEffect } from "react";
import useNotesAndAbsencesOfClassStore from "@/lib/notesAndAbsencesOfClass";

interface AddNoteModalProps {
  setIsOpen: (isOpen: boolean) => void;
  student_id?: number;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({
  setIsOpen,
  student_id = 0,
}) => {
  const store = useNotesAndAbsencesOfClassStore();
  const [dateForNote, setDateForNote] = useState("");
  const [gradeForNote, setGradeForNote] = useState(10);
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth()).padStart(2, "0"); //was +1 after getMounth()
    const day = String(date.getDate()).padStart(2, "0");
    setDateForNote(`${year}-${month}-${day}`);
  }, []);

  async function addNote() {
    try {
      const url = `http://localhost:3000/notes/`;
      const method = "POST";
      const data = {
        value: gradeForNote,
        student_id: student_id,
        subject_id: JSON.parse(localStorage.getItem("subject_data") as string)
          .id,
        date: dateForNote,
      };
      console.log(data);
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

  return (
    <div>
      <div className="centerWithFlex">
        <div>
          <form>
            <label htmlFor="grade">Grade:</label>
            <input
              type="number"
              name="grade"
              min={1}
              max={10}
              value={gradeForNote}
              onChange={(e) => {
                setGradeForNote(+e.target.value);
              }}
            />
            <br />
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
              value={dateForNote}
              onChange={(e) => {
                setDateForNote(e.target.value);
              }}
            />
            <br />
          </form>
        </div>
        <div className="rowWithFlex">
          <button
            onClick={async (e) => {
              await addNote()
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
            Add note
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
      <style jsx>{`
        input {
          padding: 5px;
          font-size: 16px;
          margin: 5px;
        }
        button {
          padding: 5px;
          margin: 25px;
          border-radius: 7px;
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

export default AddNoteModal;
