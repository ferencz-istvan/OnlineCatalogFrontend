"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { usePathname } from "next/navigation";

function StudentSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="sidebar-elements">
      <div
        id={pathname === "/students/notes&absences" ? "active-path" : ""}
        onClick={() => {
          router.push("/students/notes&absences");
        }}
      >
        Notes & absences
      </div>
      <div
        id={pathname === "/students/subjects" ? "active-path" : ""}
        onClick={() => {
          router.push("/students/subjects");
        }}
      >
        Subjects & class list
      </div>
      <div
        id={pathname === "/students" ? "active-path" : ""}
        onClick={() => {
          router.push("/students");
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

export default StudentSidebar;
