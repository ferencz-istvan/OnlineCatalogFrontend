"use client";

import { useState, useEffect, useRef } from "react";
import TeachersLayout from "../layouts/teachersLayout";
import { Student } from "../../lib/loginData";
import UserCard from "../components/UserDataCard";
import { RelationsOfTeacher } from "../interfaces/complexInterfaces";
import Link from "next/link";

function TeacherView() {
  const [actualRole, setActualRole] = useState<Partial<Student> | null>(null);
  const [relationsOfTeacher, setRelationsOfTeacher] = useState<
    RelationsOfTeacher[]
  >([]);
  const [isActualRoleLoaded, setIsActualRoleLoaded] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("actual_role");
    if (storedRole) {
      setActualRole(JSON.parse(storedRole) as Partial<Student> | null);
      setIsActualRoleLoaded(true);
    }
  }, []);
  useEffect(() => {
    //console.log("use effect", actualRole);
    if (isActualRoleLoaded && actualRole) {
      const teacher_id = actualRole.id;
      const accessToken = localStorage.getItem("accessToken");
      const fetchRelations = async () => {
        if (teacher_id) {
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
          setRelationsOfTeacher(data);
          //relationsOfTeacherRef.current = data;
        }
      };
      fetchRelations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActualRoleLoaded, actualRole]);

  return (
    <TeachersLayout>
      <div className="container">
        <div className="moving-link-container">
          <Link href="/teachers/notes&absences">
            <button className="link-button">
              <span className="arrow-symbol">➠</span> Go to notes!
              <img
                src="/icons/catalogColumn.svg"
                alt="image about a column is the catalog"
                height="80px"
              />
            </button>
          </Link>
        </div>
        {/* <span>{relationsOfTeacher.toString()}.......</span> */}
        {/*       <div>
          <Modal buttonName="Testmodal button">
            <TestModal
              setIsOpen={function (isOpen: boolean): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Modal>
        </div> */}
        <UserCard />
        <div className="image-container">
          <img
            id="center-img"
            src="/icons/magnifier.svg"
            alt="user icon in user card"
          />
        </div>
        <div className="role-card">
          <div className="card-left-side">
            <h2>Teacher datas:</h2>
            <h3>Matriculation number: {actualRole?.id} </h3>
            <h3>Full name: {actualRole?.name}</h3>
            <h3>
              Subjects (s)he teaches:{" "}
              {Array.from(
                new Set(relationsOfTeacher.map((relation) => relation.subject))
              )
                .sort((a, b) => a.localeCompare(b)) // sort alphabetically
                .map((subject, index) => (
                  <span key={index}>
                    {subject}
                    {", "}
                  </span>
                ))}
            </h3>
            <h3>
              Classes:{" "}
              {relationsOfTeacher
                .slice() // create a copy of the array to avoid mutating the original
                .sort((a, b) => a.class.localeCompare(b.class)) // sort by class name
                .map((relation, index) => (
                  <span key={index}>
                    {relation.class}
                    {", "}
                  </span>
                ))}
            </h3>
          </div>
          <div className="card-right-side"></div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            padding: 10px;
          }
          .link-button {
          display:flex;
          align-items: center;
          font-size: 18px;    
          padding-left: 30px;
          margin: 10px;
          border-radius: 30% 100% 30% 100%;
          cursor: pointer;
          animation: move-horizontal 3s linear infinite;
       
          }
          .link-button:hover {
            box-shadow: 3px 3px 8px darkslategray;
            animation-play-state: paused;
          }
                @keyframes move-horizontal {
          0% {
            margin-left: 0px;
          }
          50% {
            margin-left: 10px;
          }
          100% {
            margin-left: 0px; 
          }
          .container {
            padding: 70px;
          }}
          .arrow-symbol {
              -webkit-transform: scaleX(-1);
            transform: scaleX(-1);
          }
          .image-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 30vh;
            max-height: 300px;
          }
          #center-img {
            animation: pulse 6s infinite;          
          }
          button {
            margin-right: 20px;
          }
          .role-card {
            background-image: linear-gradient(-70deg, slategray, cadetblue, darkseagreen);
            margin: 20px;
            padding: 30px;
            border: 4px solid darkslategray;
            border-radius: 30px;
            display: flex;
          }
          .card-left-side {
            display: flex;
            flex-direction: column;
            width: 95%;
          }
          .card-right-side {
            display: flex;
            justify-content: flex-end;
            width: 5%;
          }
          @keyframes pulse {
          0% {
            max-height: 80%;
            max-width: 80%;
          }
          50% {
            max-height: 100%;
            max-width: 100%;
          }
          100% {
            max-height: 80%;
            max-width: 80%;
          }
          }
          @media only screen and (max-width: 700px) {
          .role-card {
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
        `}
      </style>
    </TeachersLayout>
  );
}

export default TeacherView;
