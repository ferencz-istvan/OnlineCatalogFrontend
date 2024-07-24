"use client";

import Modal from "@/app/components/CustomModal";
import StudentsLayout from "../../layouts/studentsLayout";

function StudentAbsences() {
  return (
    <StudentsLayout>
      <div>Hello</div>
      <div>Student Absences</div>
      <div>Hello</div>
      <div>
        <Modal buttonName="Modal test" />
      </div>
    </StudentsLayout>
  );
}

export default StudentAbsences;
