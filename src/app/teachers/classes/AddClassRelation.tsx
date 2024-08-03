import React, { useEffect } from "react";
import { useState } from "react";

interface AddProps {
  setIsOpen: (isOpen: boolean) => void;
  dataForFetch?: Record<string, any>;
}

interface Classes {
  id: number;
  name: string;
  grade: number;
  speciality: string;
  conductor_id: number;
}

interface Subjects {
  id: number;
  name: string;
  descriprion: string;
}

const AddClassRelation: React.FC<AddProps> = ({
  setIsOpen,
  dataForFetch = null,
}) => {
  const id = dataForFetch?.id;
  const [classes, setClasses] = useState([] as Classes[]);
  const [subjects, setSubjects] = useState([] as Subjects[]);
  const [classIdValue, setClassIdValue] = useState("");
  const [subjectIdValue, setSubjectIdValue] = useState("");
  const [teacherIdValue, setTeacherIdValue] = useState(0);
  async function getClasses() {
    try {
      const response = await fetch("http://localhost:3000/classes");
      const data = await response.json();
      setClasses(data);
      setClassIdValue(data[0].id);
    } catch (error) {
      console.error(error);
    }
  }
  async function getSubjects() {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch("http://localhost:3000/subjects", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSubjects(data);
      setSubjectIdValue(data[0].id);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("actual_role") as string).id;
    setTeacherIdValue(id);
    getClasses();
    getSubjects();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  async function AddRelationFetch() {
    try {
      const url = "http://localhost:3000/relations";
      const method = "POST";
      const data = {
        class_id: classIdValue,
        subject_id: subjectIdValue,
        teacher_id: teacherIdValue,
      };
      const token = localStorage.getItem("accessToken");

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <form>
        <label htmlFor="class">Class: </label>
        <select
          id="class"
          value={classIdValue}
          onChange={(event) => setClassIdValue(event.target.value)}
        >
          {" "}
          {classes.map((cls) => (
            <option key={cls.id} value={`${cls.id}`}>
              {cls.grade} {cls.name}
            </option>
          ))}
        </select>
        <label htmlFor="subject">Subject: </label>
        <select
          id="subject"
          value={subjectIdValue}
          onChange={(event) => setSubjectIdValue(event.target.value)}
        >
          {subjects.map((subj) => (
            <option key={subj.id} value={`${subj.id}`}>
              {subj.name}
            </option>
          ))}
        </select>
        {/*  <label htmlFor="name">Name of subject:</label>
        <br />
        <input
          type="text"
          id="name"
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
        />
        <br /> */}
        {/* <label htmlFor="description">Description of subject:</label>
        <br />
        <textarea
          id="description"
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
          rows={7}
          cols={50}
        /> */}
        <br />
        <button
          onClick={async (e) => {
            e.preventDefault();
            console.log("ide jön a fetch");
            console.log(`id for fetch ${id}`);
            await AddRelationFetch()
              .then((responseData) => {
                console.log("Response data:", responseData);
              })
              .catch((error) => {
                console.error("Error:", error);
              });

            handleClose();
            location.reload();
          }}
        >
          Add a new subject
        </button>
      </form>
    </div>
  );
};

export default AddClassRelation;
