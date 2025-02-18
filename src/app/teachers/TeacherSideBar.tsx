"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { usePathname } from "next/navigation";

function TeacherSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="sidebar-elements">
      <div
        id={pathname === "/teachers/notes&absences" ? "active-path" : ""}
        onClick={() => {
          router.push("/teachers/notes&absences");
        }}
      >
        Notes and absences
      </div>
      <div
        id={pathname === "/teachers/classes" ? "active-path" : ""}
        onClick={() => {
          router.push("/teachers/classes");
        }}
      >
        My classes
      </div>
      <div
        id={pathname === "/teachers/subjects" ? "active-path" : ""}
        onClick={() => {
          router.push("/teachers/subjects");
        }}
      >
        Subjects of school
      </div>
      <div
        id={pathname === "/teachers" ? "active-path" : ""}
        onClick={() => {
          router.push("/teachers");
        }}
      >
        About me
      </div>
      <style jsx>
        {`
          #active-path {
            color: darkseagreen;
            cursor: initial;
          }
          .sidebar-elements > div {
            margin: 20px 0px;
            cursor: pointer;
            font-size: 20px;
          }
          @media only screen and (max-width: 700px) {
            .sidebar-elements {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            .sidebar-elements > div {
              margin: 20px 0px;
              cursor: pointer;
              font-size: max(8vw, 20px);
            }
          }
        `}
      </style>
    </div>
  );
}

export default TeacherSidebar;
