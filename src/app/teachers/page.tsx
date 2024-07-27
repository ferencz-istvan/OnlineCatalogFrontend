"use client";

import { useState, useEffect } from "react";
import TeachersLayout from "../layouts/teachersLayout";
import { User } from "../../lib/loginData";
import { Student } from "../../lib/loginData";
import Modal from "@/app/components/CustomModal";
import TestModal from "@/app/components/JustTestComponent";
import UserCard from "../components/UserDataCard";

function TeacherView() {
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
        <h1>User datas:</h1>
        <h3>Username: {actualUser?.username}</h3>
        <h3>Email: {actualUser?.email}</h3>
        <h3>Role: {actualUser?.role}</h3>
        <br />
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
            {/*   <Modal buttonName="Edit">
              <SetStudentDatasForm />
            </Modal> */}
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            padding: 70px;
          }
          button {
            margin-right: 20px;
          }
          .student-card {
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
            width: 60%;
          }
          .card-right-side {
            display: flex;
            justify-content: flex-end;
            width: 40%;
          }
          @media only screen and (max-width: 700px) {
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
        `}
      </style>
    </TeachersLayout>
  );
}

export default TeacherView;
