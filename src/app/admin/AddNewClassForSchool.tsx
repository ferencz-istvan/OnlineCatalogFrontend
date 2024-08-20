import React, { useEffect } from "react";
import { useState } from "react";
import type { Teacher } from "@/app/interfaces/baseInterfaces";
import { useRouter } from "next/navigation";

interface AddProps {
  setIsOpen: (isOpen: boolean) => void;
  dataForFetch?: Record<string, any>;
}

interface Classes {
  id: number;
  name: string;
  grade: number;
  specialty: string;
  conductor_id: number;
}

const AddNewClassForSchool: React.FC<AddProps> = ({
  setIsOpen,
  dataForFetch = null,
}) => {
  const id = dataForFetch?.id;
  const [allTeacher, setAllTeacher] = useState([] as Teacher[]);
  //const [classes, setClasses] = useState([] as Classes[]);
  const [isSuccessed, setIsSuccessed] = useState(false);
  const router = useRouter();

  const [classNameValue, setClassNameValue] = useState("");
  const [classGradeValue, setClassGradeValue] = useState(0);
  const [classSpecialty, setclassSpecialty] = useState("");
  const [conductorId, setConductorId] = useState(0);
  const handleClose = () => {
    setIsOpen(false);
  };

  async function getTeachers() {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch("http://localhost:3000/teachers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAllTeacher(data);
      setConductorId(data[0].id);
    } catch (error) {
      console.error(error);
    }
  }

  async function AddClassForSchool() {
    try {
      const url = "http://localhost:3000/classes";
      const method = "POST";
      const data = {
        name: classNameValue,
        grade: classGradeValue,
        specialty: classSpecialty,
        conductor_id: conductorId,
      };
      /* console.log("DATADATADATADATADATA:");
      console.log(data); */
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

  useEffect(() => {
    getTeachers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="modal-container">
      {!isSuccessed && (
        <form>
          <label htmlFor="classGrade">Grade of class:</label>
          <br />
          <input
            id="classGrade"
            type="number"
            value={classGradeValue}
            onChange={(event) =>
              setClassGradeValue(parseInt(event.target.value))
            }
          />{" "}
          <br />
          <label htmlFor="className">
            Name of class (just a letter like: A, B, C ...):
          </label>
          <br />
          <input
            id="className"
            value={classNameValue}
            onChange={(event) => setClassNameValue(event.target.value)}
            type="text"
          />
          <br />
          <label htmlFor="specialty">Specialty of class:</label>
          <br />
          <input
            id="specialty"
            type="text"
            value={classSpecialty}
            onChange={(event) => setclassSpecialty(event.target.value)}
          />
          <br />
          <label htmlFor="classConductor">Conductor of class</label>
          <br />
          <select
            id="classConductor"
            value={conductorId}
            onChange={(event) => setConductorId(parseInt(event.target.value))}
          >
            {" "}
            {allTeacher.map((teacher) => (
              <option key={teacher.id} value={`${teacher.id}`}>
                {teacher.name}
              </option>
            ))}
          </select>{" "}
          <br />
          <button
            onClick={async (e) => {
              e.preventDefault();
              await AddClassForSchool()
                .then((responseData) => {
                  console.log("Response data:", responseData);
                  setIsSuccessed(true);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
          >
            Add a new class for school
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            Cancel
          </button>
        </form>
      )}
      {isSuccessed && (
        <div>
          <h3>Successfully added</h3>
          <button
            onClick={() => {
              handleClose();
              location.reload();
            }}
          >
            Okay
          </button>
        </div>
      )}
      <style jsx>{`
        .modal-container {
          color: black;
        }
        button {
          padding: 10px;
          margin: 10px;
          border-radius: 15px;
          cursor: pointer;
        }
        button:hover {
          box-shadow: 3px 3px 8px darkslategray;
        }
        input {
          padding: 5px;
          margin: 3px;
          border-radius: 5px;
        }
        select {
          margin: 3px;
          padding: 5px;
          border-radius: 5px;
        }
        @media only screen and (max-width: 800px) {
          .modal-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 10px;
          }
          button {
            margin: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default AddNewClassForSchool;
