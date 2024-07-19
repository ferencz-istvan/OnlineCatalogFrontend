"use client";

import { useState } from "react";
import StudentsLayout from "../layouts/studentsLayout";
import { useUserPublicData } from "@/lib/loginData";
import { User } from "../../lib/loginData";

function StudentView() {
  const [actualUser, setActualUser] = useState(
    JSON.parse(
      localStorage.getItem("actual_user") as string
    ) as Partial<User> | null
  );

  /*    JSON.parse(
    useState(localStorage.getItem("actual_user"))
  ); */
  return (
    <StudentsLayout>
      <div style={{ padding: "50px" }}>
        <div>Hello</div>
        <div>Hello</div>
        <div>Hello</div>
        <h1>User datas:</h1>
        <h3>Username: {actualUser?.username}</h3>
        <h3>Email: {actualUser?.email}</h3>
        <h3>Role: {actualUser?.role}</h3>
      </div>
    </StudentsLayout>
  );
}

export default StudentView;
