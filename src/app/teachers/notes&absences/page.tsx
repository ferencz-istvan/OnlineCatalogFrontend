"use client";

import TeachersLayout from "../../layouts/teachersLayout";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import useNotesAndAbsencesOfClassStore from "@/lib/notesAndAbsencesOfClass";

interface Relation {
  subject: string;
  subject_id: number;
  class: string;
  class_id: number;
}

function TeacherNotesAndAbsences() {
  const [isLoaded, setIsLoaded] = useState(false);
  const relationsOfTeacherRef = useRef<Relation[]>([]);
  const router = useRouter();
  const setClassId = useNotesAndAbsencesOfClassStore(
    (state) => state.setClassId
  );
  const setClassName = useNotesAndAbsencesOfClassStore(
    (state) => state.setClassName
  );
  const setSubjectId = useNotesAndAbsencesOfClassStore(
    (state) => state.setSubjectId
  );
  const setSubjectName = useNotesAndAbsencesOfClassStore(
    (state) => state.setSubjectName
  );
  useEffect(() => {
    const teacher_id = JSON.parse(
      localStorage.getItem("actual_role") as string
    ).id;
    const accessToken = localStorage.getItem("accessToken");
    const fetchRelations = async () => {
      const response = await fetch(
        `http://localhost:3000/relations/withTeacher/${teacher_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data: Relation[] = await response.json();
      relationsOfTeacherRef.current = data;
      setIsLoaded(true);
    };
    fetchRelations();
  }, []);

  function pushToCatalog(catalogInfo: Relation) {
    const { subject, subject_id, class: className, class_id } = catalogInfo;
    const subjectData = JSON.stringify({ name: subject, id: subject_id });
    const classData = JSON.stringify({ name: className, id: class_id });
    setClassId(class_id);
    setClassName(className);
    setSubjectId(subject_id);
    setSubjectName(subject);
    localStorage.setItem("subject_data", subjectData);
    localStorage.setItem("class_data", classData);

    router.push("/teachers/catalog");
  }

  return (
    <TeachersLayout>
      <p>Choose the class and subject:</p>
      <div className="classContainer">
        {relationsOfTeacherRef.current.map((item, index) => (
          <div
            onClick={() =>
              pushToCatalog({
                subject: item?.subject,
                subject_id: item?.subject_id,
                class: item?.class,
                class_id: item?.class_id,
              })
            }
            key={index}
            className="containerElement"
          >
            <span>{item?.subject.toUpperCase()}</span>
            <span>in {item.class}</span>
          </div>
        ))}
      </div>
      <div className="img-container">
        <img
          src="/icons/catalogColumn.svg"
          alt="image about a column is the catalog"
          width="350px"
        />
      </div>

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
          width: 300px;
          height: 180px;
          background-image: linear-gradient(
            60deg,
            darkseagreen,
            lightgray,
            slategray,
            cadetblue
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
            azure
          );
          border: 4px solid darkslategray;
        }
        .img-container {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </TeachersLayout>
  );
}

export default TeacherNotesAndAbsences;
