"use client";

import { useState, useEffect } from "react";
import { User } from "../../lib/loginData";
import Modal from "@/app/components/CustomModal";
import TestModal from "@/app/components/JustTestComponent";
import UserCard from "../components/UserDataCard";
import ParentsLayout from "../layouts/parentsLayout";
import type { Parent } from "../interfaces/baseInterfaces";
import Link from "next/link";
import SetParentData from "./SetParentData";

function ParentView() {
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
        <div className="button-container">
          <Link href="/parents/children">
            <button className="link-button">
              Go to the child&apos;s notes
            </button>
          </Link>
          <Modal buttonName="Just a button">
            <TestModal
              setIsOpen={function (isOpen: boolean): void {
                throw new Error("Function not implemented.");
              }}
            />
          </Modal>
        </div>
        <UserCard />
        <br />
        <div className="card">
          <div className="card-left-side">
            <h2>Parent data:</h2>
            <h3>Matriculation number: {actualRole?.id} </h3>
            <h3>Full name: {actualRole?.name}</h3>
            <h3>Phone number: {actualRole?.phone_number}</h3>
          </div>
          <div className="card-right-side">
            <Modal buttonName="Edit">
              <SetParentData
                setIsOpen={function (isOpen: boolean): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </Modal>
          </div>
        </div>
        <br />
        <div className="card">
          <h4>
            If you want to connect to the child&apos;s account, you can only do
            so through their account. Please ensure that your phone number is
            entered correctly.
          </h4>
        </div>
      </div>
      <style jsx>
        {`
          .container {
            padding: 10px 70px;
          }
          button {
            margin-right: 20px;
          }
          .button-container {
            display: flex;
          }
          .link-button {
            padding: 10px;
            margin: 10px;
            border-radius: 15px;
            cursor: pointer;
          }
          .link-button:hover {
            box-shadow: 3px 3px 8px darkslategray;
          }
          .card {
            background-color: DarkSeaGreen;
            background-image: linear-gradient(
              -70deg,
              darkseagreen,
              slategray,
              cadetblue
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
            .container {
              padding: 5px;
            }
            .card {
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

export default ParentView;
