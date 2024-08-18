import Modal from "./CustomModal";
import DefaultModal from "./DefaultModal";
import SetParentRelation from "@/app/students/SetParentRelation";
import { useState, useEffect } from "react";
import type { Parent } from "../interfaces/baseInterfaces";

const ParentRelation = () => {
  const [parentId, setParentId] = useState(0);
  const [parentOfStudent, setParentOfStudent] = useState<Parent>();

  useEffect(() => {
    const studentOfParent = JSON.parse(
      localStorage.getItem("actual_role") as string
    );
    if (studentOfParent) {
      const parentId = studentOfParent.parent_id;
      setParentId(parentId);
    }
  }, []);

  async function getParent() {
    const token = localStorage.getItem("accessToken");
    /* const parentId = JSON.parse(
      localStorage.getItem("actual_role") as string
    ).parent_id; */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId]);
  return (
    <>
      <div className="parent-relation-card">
        <div className="card-left-side">
          <h2>Parent relation:</h2>
          <h3>Parent name: {parentOfStudent?.name}</h3>
          <h3>Phone number of parent: {parentOfStudent?.phone_number}</h3>
        </div>
        <div className="card-right-side">
          <Modal buttonName="Edit parent relation">
            <SetParentRelation
              setIsOpen={function (isOpen: boolean): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Modal>
        </div>
      </div>
      {/*  <DefaultModal
        isOpen={isOpenRelationModal}
        setIsOpen={setIsOpenRelationModal}
        buttonName="Parent relation:"
      >
        {SetParentRelation && (
          <SetParentRelation
            setIsOpen={setIsOpenRelationModal}
            dataForFetch={}
          />
        )}
      </DefaultModal> */}
      <style jsx>{`
        button {
          display: flex;
          align-items: center;
          padding: 10px;
          margin: 10px;
          border-radius: 15px;
          cursor: pointer;
        }
        button:hover {
          box-shadow: 3px 3px 8px darkslategray;
        }
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
};

export default ParentRelation;
