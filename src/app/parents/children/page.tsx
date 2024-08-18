"use client";

import Modal from "@/app/components/CustomModal";
import ParentsLayout from "../../layouts/parentsLayout";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Student } from "@/app/interfaces/baseInterfaces";

interface Relation {
  subject: string;
  subject_id: number;
  class: string;
  class_id: number;
}

function TeacherNotesAndAbsences() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [studentsOfParent, setStudentOfParent] = useState<Student[]>([]);
  const router = useRouter();

  useEffect(() => {
    const parent_id = JSON.parse(
      localStorage.getItem("actual_role") as string
    ).id;
    const accessToken = localStorage.getItem("accessToken");
    const fetchRelations = async () => {
      const response = await fetch(
        `http://localhost:3000/students/ofParent/${parent_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data: Student[] = await response.json();
      setStudentOfParent(data);
    };
    fetchRelations();
  }, []);
  useEffect(() => {
    setIsLoaded(true);
  }, [studentsOfParent]);

  function pushToCatalog(child: Student) {
    /* const {
      id: childId,
      name: childName,
      class_id: classId,
      address,
      user_id: userIdOfChild,
    } = child; */
    //const subjectData = JSON.stringify({ name: subject, id: subject_id });
    const childOfParent = JSON.stringify(child);

    localStorage.setItem("child_data", childOfParent);

    router.push("/parents/catalog");
  }

  return (
    <ParentsLayout>
      <p>Select the child whose grades you are interested in:</p>
      <div className="classContainer">
        {studentsOfParent.map((student, index) => (
          <div
            onClick={() => {
              pushToCatalog(student);
            }}
            key={index}
            className="containerElement"
          >
            <span>{student?.name.toUpperCase()}</span>
            {/* <span>in {student.address}</span> */}
          </div>
        ))}
      </div>
      <div>
        <Modal buttonName="Modal test" />
      </div>
      <img
        src="/icons/catalogColumn.svg"
        alt="image about a column is the catalog"
        width="300px"
      />

      <style jsx>{`
        .classContainer {
          display: flex;
          flex-wrap: wrap;
        }
        .containerElement {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 20px;
          height: 120px;
          background-image: linear-gradient(
            60deg,
            darkseagreen,
            lightgray,
            lightgray,
            azure
          );
          border-radius: 40px;
          cursor: pointer;
          margin: 20px;
          font-size: 26px;
          font-weight: 600;
          transition: background-image 3s;
          border: 4px solid white;
        }
        .containerElement:hover {
          box-shadow: 10px 10px 5px lightblue;
          background-image: linear-gradient(
            60deg,
            darkseagreen,
            lightgray,
            lightgray,
            cadetblue
          );
          border: 4px solid darkslategray;
        }
      `}</style>
    </ParentsLayout>
  );
}

export default TeacherNotesAndAbsences;
