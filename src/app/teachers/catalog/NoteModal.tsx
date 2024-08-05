"use client";
import React, { useState, useEffect } from "react";

interface AbsenceModalProps {
  setIsOpen: (isOpen: boolean) => void;
  dataForFetch?: Record<string, any>;
}

const NoteModal: React.FC<AbsenceModalProps> = ({
  setIsOpen,
  dataForFetch = null,
}) => {
  const [idForFetch, setIdForFetch] = useState(dataForFetch?.id);
  const [inActiveChange, setInActiveChange] = useState(false);
  const [noteValue, setNoteValue] = useState(dataForFetch?.value);
  const [dateValue, setDateValue] = useState(dataForFetch?.date);
  useEffect(() => {
    console.log(dataForFetch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function modifyNote(idForFetch: number, status: string) {
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

  return (
    <div>
      <div className="centerWithFlex">
        {!inActiveChange ? (
          <div>
            <p>Note: {dataForFetch?.value}</p>
            <p>Date: {dataForFetch?.date.slice(0, 10)}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setInActiveChange(true);
              }}
            >
              Change datas
            </button>
          </div>
        ) : (
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
          </div>
        )}
        <div className="rowWithFlex">
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            Okay
          </button>
          <button
            onClick={(e) => {
              modifyNote(idForFetch, "deleted")
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
            Some
          </button>
        </div>
      </div>

      {dataForFetch?.status === "unverified" && (
        <div className="centerWithFlex">
          <p>This absence is not verified yet</p>
          <span>{dataForFetch?.date.slice(0, 10)}</span>
          <div className="rowWithFlex">
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(false);
              }}
            >
              Remain unverified
            </button>
            <button
              onClick={(e) => {
                modifyNote(idForFetch, "verified")
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
              Verify now
            </button>
            <button
              onClick={(e) => {
                modifyNote(idForFetch, "deleted")
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
              Erase it (only if necessary❗❗)
            </button>
          </div>
        </div>
      )}
      {dataForFetch?.status === "deleted" && (
        <div className="centerWithFlex">
          <p>This absence has already been deleted</p>
          <span>{dataForFetch?.date.slice(0, 10)}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            Okay
          </button>
        </div>
      )}

      <style jsx>{`
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

export default NoteModal;
