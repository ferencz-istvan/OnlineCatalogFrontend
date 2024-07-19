import { useRouter } from "next/navigation";
import React from "react";

function StudentSidebar() {
  const router = useRouter();
  return (
    <div>
      <div
        onClick={() => {
          router.push("/students/notes");
        }}
      >
        Notes
      </div>
      <div
        onClick={() => {
          router.push("/students/absences");
        }}
      >
        Absences
      </div>
      <div
        onClick={() => {
          router.push("/students/subjects");
        }}
      >
        Subjects & class list
      </div>
      <div
        onClick={() => {
          router.push("/students");
        }}
      >
        About me
      </div>
    </div>
  );
}

export default StudentSidebar;
