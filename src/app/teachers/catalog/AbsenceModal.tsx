"use client";
import React, { useState, useEffect } from "react";

interface AbsenceModalProps {
  setIsOpen: (isOpen: boolean) => void;
  dataForFetch?: Record<string, any>;
}

const AbsenceModal: React.FC<AbsenceModalProps> = ({
  setIsOpen,
  dataForFetch = null,
}) => {
  const [idForFetch, setIdForFetch] = useState(dataForFetch?.id);
  const [isDeleteQuestion, setIsDeleteQuestion] = useState(false);

  async function modifyAbsence(idForFetch: number, status: string) {
    try {
      const url = `http://localhost:3000/absences/${idForFetch}`;
      const method = "PUT";
      const data = {
        id: dataForFetch?.id,
        status: status,
        student_id: dataForFetch?.student_id,
        subject_id: dataForFetch?.subject_id,
        date: dataForFetch?.date,
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
      {!isDeleteQuestion ? (
        <div>
          {dataForFetch?.status === "verified" && (
            <div className="centerWithFlex">
              <p>This absence is already verified</p>
              <span>{dataForFetch?.date.slice(0, 10)}</span>
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
                    /*    modifyAbsence(idForFetch, "deleted")
                      .then((responseData) => {
                        console.log("Response data:", responseData);
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                      });
                    setIsOpen(false);
                    location.reload(); */
                    setIsDeleteQuestion(true);
                  }}
                >
                  Erase it
                </button>
              </div>
            </div>
          )}
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
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    modifyAbsence(idForFetch, "verified")
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
                    setIsDeleteQuestion(true);
                  }}
                >
                  Erase it
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
        </div>
      ) : (
        <div>
          <div className="centerWithFlex">
            Are you sure you want to delete this absence?
          </div>
          <div className="rowWithFlex">
            <button
              onClick={(e) => {
                e.preventDefault();
                modifyAbsence(idForFetch, "deleted")
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

export default AbsenceModal;
