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
        <img src="/icons/user.svg" alt="user icon in user card" />
      </div>
      <div className="card-center">
        <h1>User datas:</h1>
        <h3>Username: {actualUser?.username}</h3>
        <h3>Email: {actualUser?.email}</h3>
        <h3>Role: {actualUser?.role}</h3>
      </div>

      <div className="card-right-side">
        <Modal buttonName="Change password">
          <SetUserPassword
            setIsOpen={function (isOpen: boolean): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Modal>
        <Modal buttonName="Edit datas">
          <SetUserDatasForm
            setIsOpen={function (isOpen: boolean): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Modal>
      </div>
      <style jsx>{`
        img {
          max-width: 60%;
          max-height: 60%;
        }
        .user-card {
          background-color: DarkSeaGreen;
          margin: 20px;
          padding: 30px;
          border: 4px solid darkslategray;
          border-radius: 30px;
          display: flex;
        }
        .card-center {
          display: flex;
          flex-direction: column;
          width: calc(55% - 55px);
          padding: 5px 5px 5px 20px;
        }
        .card-right-side {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          width: 25%;
        }
        .card-left-side {
          display: flex;
          width: calc(20% + 55px);
          justify-content: center;
          align-items: center;
        }

        @media only screen and (max-width: 700px) {
          .user-card {
            flex-direction: column;
            align-items: center;
            margin: 0px;
            padding: 0px;
          }
          .card-right-side {
            width: 100%;
            justify-content: center;
          }
          .card-left-side {
            width: 100%;
           align-items: center;
        }
        .card-center {
          padding: 5px;
        }
      `}</style>
    </div>
  );
}
