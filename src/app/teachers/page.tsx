"use client";

import { useState, useEffect, useRef } from "react";
import TeachersLayout from "../layouts/teachersLayout";
import { User } from "../../lib/loginData";
import { Student } from "../../lib/loginData";
import Modal from "@/app/components/CustomModal";
import TestModal from "@/app/components/JustTestComponent";
import UserCard from "../components/UserDataCard";

function TeacherView() {
  const [actualUser, setActualUser] = useState<Partial<User> | null>(null);
  const [actualRole, setActualRole] = useState<Partial<Student> | null>(null);
  //const relationsOfTeacherRef = useRef([]);
  const relationsOfTeacherRef = useRef<{ subject: string }[]>([]);
  const [isActualRoleLoaded, setIsActualRoleLoaded] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("actual_user");
    const storedRole = localStorage.getItem("actual_role");

    if (storedUser) {
      setActualUser(JSON.parse(storedUser) as Partial<User> | null);
    }

    if (storedRole) {
      setActualRole(JSON.parse(storedRole) as Partial<Student> | null);
      setIsActualRoleLoaded(true);
    }
  }, []);
  useEffect(() => {
    if (isActualRoleLoaded && actualRole) {
      const teacher_id = actualRole.id;
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
        relationsOfTeacherRef.current = data;
        //setIsLoaded(true);
      };
      fetchRelations();
    }
  }, [isActualRoleLoaded, actualRole]);

  useEffect(() => {
    const storedUser = localStorage.getItem("actual_user");
    const storedRole = localStorage.getItem("actual_role");

    if (storedUser) {
      setActualUser(JSON.parse(storedUser) as Partial<User> | null);
    }

    if (storedRole) {
      setActualRole(JSON.parse(storedRole) as Partial<Student> | null);
    }
  }, []);

  return (
    <TeachersLayout>
      <div className="container">
        <div>
          <Modal buttonName="Testmodal button">
            <TestModal
              setIsOpen={function (isOpen: boolean): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Modal>
        </div>
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
              {relationsOfTeacherRef.current.map((relation, index) => (
                <span key={index}>{relation.subject} </span>
              ))}
            </h3>
            <h3>Classes: {actualRole?.class_name}</h3>
          </div>
          <div className="card-right-side"></div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            padding: 70px;
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
            background-color: DarkSeaGreen;
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
