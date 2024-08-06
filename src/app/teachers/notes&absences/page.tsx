"use client";

import Modal from "@/app/components/CustomModal";
import TeachersLayout from "../../layouts/teachersLayout";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

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
    /* setTimeout(() => {
      console.log(relationsOfTeacherRef.current);
    }, 1000); */
  }, []);

  /*   function pushToCatalog(catalogInfo: Relation) {
    const { subject, subject_id, class:className, class_id } = catalogInfo;
    //const stringClassId = catalogInfo.class_id.toString();
    const stringSubjectDatas = JSON.stringify{ name: subject, id: subject_id }
        const stringSubjectDatas = JSON.stringify{name: class, id: class_id}
    localStorage.setItem("subject_data", stringSubjectDatas);
    localStorage.setItem("class_data", stringClassDatas);

    router.push("/teachers/catalog");
  } */
  function pushToCatalog(catalogInfo: Relation) {
    const { subject, subject_id, class: className, class_id } = catalogInfo;
    const subjectData = JSON.stringify({ name: subject, id: subject_id });
    const classData = JSON.stringify({ name: className, id: class_id });

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
          width: 300px;
          height: 180px;
          background-color: darkseagreen;
          border-radius: 30px;
          cursor: pointer;
          margin: 20px;
          font-size: 26px;
          font-weight: 600;
        }
        .containerElement:hover {
          box-shadow: 10px 10px 5px lightblue;
        }
      `}</style>
    </TeachersLayout>
  );
}

export default TeacherNotesAndAbsences;
