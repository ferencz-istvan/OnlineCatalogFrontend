"use client";

import Modal from "@/app/components/CustomModal";
import TeachersLayout from "../../layouts/teachersLayout";
import { useState, useEffect, useRef } from "react";
import TableComponent from "../../components/TableComponent";
import AddClassRelation from "./AddClassRelation";
import DeleteSubject from "./DeleteClass Relation";

function TeacherAbsences() {
  //const [relationsOfTeacher, setRelationsOfTeacher] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const relationsOfTeacherRef = useRef([]);

  useEffect(() => {
    const teacher_id = JSON.parse(
      localStorage.getItem("actual_role") as string
    ).id;
    const accessToken = localStorage.getItem("accessToken");
    const fetchRelations = async () => {
      const response = await fetch(
        `http://localhost:3000/relations/withTeacher/${teacher_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      //setRelationsOfTeacher(data);
      relationsOfTeacherRef.current = data;
      setIsLoaded(true);
    };
    fetchRelations();
  }, []);
  /*   if (!isLoaded) {
    return (
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          fontSize: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    );
  } */
  if (!isLoaded) {
    return (
      <div className="loader">
        <style jsx>
          {`
            .loader {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 100px;
              height: 100px;
              border-radius: 50%;
              border: 10px solid #3498db;
              border-top-color: transparent;
              animation: spin 1s linear infinite;
            }

            @keyframes spin {
              0% {
                transform: translate(-50%, -50%) rotate(0deg);
              }
              100% {
                transform: translate(-50%, -50%) rotate(360deg);
              }
            }
          `}
        </style>
      </div>
    );
  }
  return (
    <TeachersLayout>
      {isLoaded ? (
        <div className="container">
          <div className="table-container">
            <TableComponent
              data={relationsOfTeacherRef.current}
              tableName="The subjects that I teach:"
              AddItemModal={AddClassRelation}
              DeleteItemModal={DeleteSubject}
              headerList={["class", "subject"]}
            ></TableComponent>
          </div>

          <div className="image-block">
            <div className="image-container">
              <img src="/icons/phisicSubject.svg" alt="image 0" />
              <img src="/icons/mathSubject.svg" alt="image 1" />
              <img src="/icons/gymnasticSubject.svg" alt="image 2" />
              <img src="/icons/geographySubject.svg" alt="image 3" />
              <img src="/icons/drawningSubject.svg" alt="4" />
              <img src="/icons/phisicSubject.svg" alt="image 0" />
              <img src="/icons/mathSubject.svg" alt="image 1" />
              <img src="/icons/gymnasticSubject.svg" alt="image 2" />
              <img src="/icons/geographySubject.svg" alt="image 3" />
              <img src="/icons/drawningSubject.svg" alt="4" />
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div>
        <Modal buttonName="Modal test" />
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
          }
          .table-container {
            width: 40%;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .image-block {
            position: relative;
            width: 60%;
            height: 250px;
            overflow: hidden;
            border: 3px solid darkslategray;
            border-radius: 30px;
            margin: auto 5%;
            background-image: linear-gradient(
              -70deg,
              darkseagreen,
              slategray,
              cadetblue
            );
          }

          .image-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 200%; /* double the width to accommodate the duplicated images */
            height: 100%;
            display: flex;
            justify-content: space-between;
            animation: scroll 25s linear infinite;
          }

          .image-container img {
            width: 10%; /* adjust the width to fit your images */
          }

          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(
                -50%
              ); /* move the container by half of its width */
            }
          }
          @media only screen and (max-width: 800px) {
            .container {
              flex-direction: column;
            }
            .image-block {
              width: 100vw;
              border: none;
              margin: -40px;
              background-image: none;
            }
            .table-container {
              width: 100%;
            }
          }
        `}
      </style>
    </TeachersLayout>
  );
}

export default TeacherAbsences;
