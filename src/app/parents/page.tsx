"use client";

import { useState, useEffect } from "react";
import { User } from "../../lib/loginData";
import Modal from "@/app/components/CustomModal";
import TestModal from "@/app/components/JustTestComponent";
import UserCard from "../components/UserDataCard";
import ParentsLayout from "../layouts/parentsLayout";
import type { Parent } from "../interfaces/baseInterfaces";

function TeacherView() {
  const [actualUser, setActualUser] = useState<Partial<User> | null>(null);
  const [actualRole, setActualRole] = useState<Partial<Parent> | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("actual_user");
    const storedRole = localStorage.getItem("actual_role");

    if (storedUser) {
      setActualUser(JSON.parse(storedUser) as Partial<User> | null);
    }

    if (storedRole) {
      setActualRole(JSON.parse(storedRole) as Partial<Parent> | null);
    }
  }, []);

  return (
    <ParentsLayout>
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
        <br />
        <div className="student-card">
          <div className="card-left-side">
            <h2>Parent data:</h2>
            <h3>Matriculation number: {actualRole?.id} </h3>
            <h3>Full name: {actualRole?.name}</h3>
            <h3>Phone number: {actualRole?.phone_number}</h3>
          </div>
          <div className="card-right-side">
            {/*   <Modal buttonName="Edit">
              <SetStudentDataForm />
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
          }
        `}
      </style>
    </ParentsLayout>
  );
}

export default TeacherView;

/* "use client";

function ParentPage() {
  return (
    <div className="container">
      <h1>Parent page</h1>
      <h2>Under construction ...</h2>
      <style jsx>{`
        .container {
          background-color: DarkSlateGrey;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default ParentPage;
 */
