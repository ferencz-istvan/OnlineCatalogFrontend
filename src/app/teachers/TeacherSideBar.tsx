import { useRouter } from "next/navigation";
import React from "react";

function TeacherSidebar() {
  const router = useRouter();
  return (
    <div>
      <div
        onClick={() => {
          router.push("/teachers/notesandabsences");
        }}
      >
        Notes and absences
      </div>
      <div
        onClick={() => {
          router.push("/teachers/classes");
        }}
      >
        Classes
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
    </div>
  );
}

export default TeacherSidebar;
