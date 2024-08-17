import Modal from "./CustomModal";
import SetParentRelation from "@/app/students/SetParentRelation";
import { useState, useEffect } from "react";
import type { Parent } from "../interfaces/baseInterfaces";

function ParentRelation() {
  const [parentOfStudent, setParentOfStudent] = useState<Parent>();

  async function getParent() {
    const token = localStorage.getItem("accessToken");
    const parentId = JSON.parse(
      localStorage.getItem("actual_role") as string
    ).parent_id;
    try {
      const response = await fetch(
        `http://localhost:3000/parents/${parentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setParentOfStudent(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getParent();
  }, []);
  return (
    <>
      <div className="parent-relation-card">
        <div className="card-left-side">
          <h2>Parent relation:</h2>
          <h3>Parent name: {parentOfStudent?.name}</h3>
          <h3>Phone number of parent: {parentOfStudent?.phone_number}</h3>
          <button
            onClick={(e) => {
              e.preventDefault;
              console.log(parentOfStudent);
            }}
          >
            Console.log parent data
          </button>
        </div>
        <div className="card-right-side">
          <Modal buttonName="Edit">
            <SetParentRelation />
          </Modal>
        </div>
      </div>
      <style jsx>{`
        .parent-relation-card {
          background-image: linear-gradient(
            -70deg,
            cadetblue,
            darkseagreen,
            slategray
          );
          margin: 20px;
          padding: 30px;
          border: 4px solid darkslategray;
          border-radius: 30px;
          display: flex;
        }
        .card-left-side {
          display: flex;
          flex-direction: column;
          width: 60%;
        }
        .card-right-side {
          display: flex;
          justify-content: flex-end;
          width: 40%;
        }
        @media only screen and (max-width: 700px) {
          .parent-relation-card {
            flex-direction: column;
            align-items: center;
            margin: 5px;
          }
          .card-right-side {
            width: 100%;
            justify-content: center;
          }
          .card-left-side {
            width: 100%;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}

export default ParentRelation;
