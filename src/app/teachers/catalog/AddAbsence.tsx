"use client";
import React, { useState, useEffect } from "react";

interface AddAbsenceModalProps {
  setIsOpen: (isOpen: boolean) => void;
  student_id?: number;
}

const AddAbsenceModal: React.FC<AddAbsenceModalProps> = ({
  setIsOpen,
  student_id = 0,
}) => {
  const [dateForNote, setDateForNote] = useState("");
  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    setDateForNote(`${year}-${month}-${day}`);
  }, []);

  async function addAbsence() {
    try {
      const url = `http://localhost:3000/absences/`;
      const method = "POST";
      const data = {
        status: "unverified",
        student_id: student_id,
        subject_id: localStorage.getItem("subject_id"),
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
            onClick={(e) => {
              addAbsence()
                .then((responseData) => {
                  console.log("Response data:", responseData);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
              setIsOpen(false);
              location.reload();
            }}
          >
            Add absence
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

export default AddAbsenceModal;
