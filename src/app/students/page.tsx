"use client";

import { useState, useEffect } from "react";
import StudentsLayout from "../layouts/studentsLayout";
import { User } from "../../lib/loginData";
import { Student } from "../../lib/loginData";
import Modal from "@/app/components/CustomModal";
import UserCard from "../components/UserDataCard";
import SetStudentDatasForm from "./SetStudentDatas";
import Link from "next/link";
import ParentRelation from "./ParentRelation";

function StudentView() {
  const [actualUser, setActualUser] = useState<Partial<User> | null>(null);
  const [actualRole, setActualRole] = useState<Partial<Student> | null>(null);

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
    <StudentsLayout>
      <div className="container">
        {/* <div>
          <Modal buttonName="Testmodal button">
            <TestModal
              setIsOpen={function (isOpen: boolean): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Modal>
        </div> */}
        <Link href="/students/notes&absences">
          <button>Go to my notes</button>
        </Link>
        <UserCard />
        <div className="image-container">
          <img
            id="center-img"
            src="/icons/magnifier.svg"
            alt="user icon in user card"
          />
        </div>
        <div className="student-card">
          <div className="card-left-side">
            <h2>Student datas:</h2>
            <h3>Matriculation number: {actualRole?.id} </h3>
            <h3>Full name: {actualRole?.name}</h3>
            <h3>Class: {actualRole?.class_name}</h3>
            <h3>Parent: {actualRole?.parent_name}</h3>
            <h3>Address: {actualRole?.address}</h3>
          </div>
          <div className="card-right-side">
            <Modal buttonName="Edit">
              <SetStudentDatasForm />
            </Modal>
          </div>
        </div>
        <br />
        <ParentRelation />
      </div>
      <style jsx>
        {`
          button {
            padding: 10px;
            margin: 10px;
            border-radius: 15px;
            cursor: pointer;
            animation: move-horizontal 3s linear infinite;
          }
          button:hover {
            box-shadow: 3px 3px 8px darkslategray;
            animation-play-state: paused;
          }
          @keyframes move-horizontal {
            0% {
              margin-left: 10px;
            }
            40% {
              margin-left: 20px;
            }
            100% {
              margin-left: 10px;
            }
          }
          .container {
            padding: 0px 70px;
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
          .student-card {
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
            .container {
              padding: 0 10px;
            }
            .student-card {
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
        `}
      </style>
    </StudentsLayout>
  );
}

export default StudentView;
