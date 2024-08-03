"use client";
import { useRouter } from "next/navigation";
import React from "react";

function TeacherSidebar() {
  const router = useRouter();
  return (
    <div className="sideBarElements">
      <div
        onClick={() => {
          router.push("/teachers/notes&absences");
        }}
      >
        Notes and absences
      </div>
      <div
        onClick={() => {
          router.push("/teachers/classes");
        }}
      >
        My classes
      </div>
      <div
        onClick={() => {
          router.push("/teachers/subjects");
        }}
      >
        Subjects description
      </div>
      <div
        onClick={() => {
          router.push("/teachers");
        }}
      >
        About me
      </div>
      <style jsx>
        {`
          .sideBarElements > div {
            margin: 20px 0px;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}

export default TeacherSidebar;
