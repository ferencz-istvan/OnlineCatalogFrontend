"use client";

import { useState, useEffect } from "react";
import StudentsLayout from "../layouts/studentsLayout";
import { User } from "../../lib/loginData";
import { Student } from "../../lib/loginData";
import Modal from "@/app/components/CustomModal";
import TestModal from "@/app/components/JustTestComponent";

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
        <div>
          <Modal buttonName="Edit">
            <TestModal />
          </Modal>
        </div>
        <h1>User datas:</h1>
        <h3>Username: {actualUser?.username}</h3>
        <h3>Email: {actualUser?.email}</h3>
        <h3>Role: {actualUser?.role}</h3>
        <br />
        <h2>Student datas:</h2>
        <h3>Matriculation number: {actualRole?.id} </h3>
        <h3>Full name: {actualRole?.name}</h3>
        <h3>Class: {actualRole?.class_name}</h3>
        <h3>Parent: {actualRole?.parent_name}</h3>
        <h3>Address: {actualRole?.address}</h3>
      </div>
      <style jsx>
        {`
          .container {
            padding: 70px;
            background-color: pink;
          }
          button {
            margin-right: 20px;
          }
        `}
      </style>
    </StudentsLayout>
  );
}

export default StudentView;
