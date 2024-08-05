"use client";
import React from "react";
import { useState, useEffect } from "react";
import { User } from "../../lib/loginData";
import Modal from "@/app/components/CustomModal";
import TestModal from "./JustTestComponent";
import SetUserDatasForm from "./SetUserDatas";
import SetUserPassword from "./SetUserPassword";

export default function UserCard() {
  const [actualUser, setActualUser] = useState<Partial<User> | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("actual_user");

    if (storedUser) {
      setActualUser(JSON.parse(storedUser) as Partial<User> | null);
    }
  }, []);
  return (
    <div className="user-card">
      <div className="card-left-side">
        <h1>User datas:</h1>
        <h3>Username: {actualUser?.username}</h3>
        <h3>Email: {actualUser?.email}</h3>
        <h3>Role: {actualUser?.role}</h3>
      </div>
      <div className="card-right-side">
        <img src="/icons/user.svg" alt="user icon in user card" height={60} />
        <Modal buttonName="Edit datas">
          <SetUserDatasForm
            setIsOpen={function (isOpen: boolean): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Modal>
        <Modal buttonName="Change password">
          <SetUserPassword
            setIsOpen={function (isOpen: boolean): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Modal>
      </div>
      <style jsx>{`
        .user-card {
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
          .user-card {
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
      `}</style>
    </div>
  );
}
