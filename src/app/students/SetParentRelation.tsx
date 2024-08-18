import { useState, useEffect } from "react";
import { User } from "../../lib/loginData";
import type { Parent, Student } from "../interfaces/baseInterfaces";

interface ParentRelationProps {
  setIsOpen: (isOpen: boolean) => void;
}

const SetParentRelation: React.FC<ParentRelationProps> = ({ setIsOpen }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fetchedParent, setFetchedParent] = useState<Parent | null>(null);
  const [statusCode, setStatusCode] = useState(0);
  const [studentId, setStudentId] = useState(0);
  const [isSuccessedFetch, setIsSuccessedFetch] = useState(false);

  useEffect(() => {
    const student = localStorage.getItem("actual_role");
    if (student) {
      const student_id = JSON.parse(student).id;
      setStudentId(student_id);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  async function getParent() {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        "http://localhost:3000/parents/byPhoneNumber",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            phone_number: phoneNumber,
          }),
        }
      );
      setStatusCode(response.status);
      const fetchedData = await response.json();
      setFetchedParent(fetchedData);
    } catch (error) {
      console.error("Error in searching parent", error);
    }
  }

  async function patchParentOfStudent() {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:3000/students/parentOfStudent/${studentId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            parent_id: fetchedParent?.id,
          }),
        }
      );
      if (response.status === 200) {
        setIsSuccessedFetch(true);
        const actualRole = JSON.parse(
          localStorage.getItem("actual_role") as string
        );
        actualRole.parent_id = fetchedParent?.id;
        localStorage.setItem("actual_role", JSON.stringify(actualRole));
      }
    } catch (error) {
      console.error("Error in connecting parent");
    }
  }
  return (
    <div>
      {!isSuccessedFetch && (
        <div>
          <form>
            <label htmlFor="parent-tel-number">
              Add telephone number of your parent to make a relation:
            </label>
            <br />
            <input
              type="text"
              id="parent-tel-number"
              name="parent-tel-number"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              //that is good but just after when phone_number values change anywhere
              /* onKeyDown={(event) => {
            const allowedKeys = [
              "0",
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "+",
              "#",
              "*",
              "Backspace",
              "Delete",
            ];
            if (!allowedKeys.includes(event.key)) {
              event.preventDefault();
            }
          }} */
            />
            <br />
            <button
              onClick={(e) => {
                e.preventDefault();
                setFetchedParent(null);
                setIsSuccessedFetch(false);
                getParent();
              }}
            >
              Search parent
            </button>
            {statusCode === 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      )}
      {statusCode === 200 && (
        <div>
          <h4>We find a parent with this phone number!</h4>
          <p>Name: {fetchedParent?.name}</p>
          {!isSuccessedFetch && (
            <div>
              <button
                onClick={() => {
                  patchParentOfStudent();
                }}
              >
                Add this parent
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      )}
      {statusCode === 404 && (
        <div>
          <h4>We did not find any parents registered with this phone number</h4>
          <p>
            <b>Please check the correctness of the phone number</b>
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            Ok
          </button>
        </div>
      )}
      {isSuccessedFetch && (
        <div>
          <h3>You have successfully linked your parent to your account!</h3>
          <button
            onClick={() => {
              handleClose();
              location.reload();
            }}
          >
            Ok
          </button>
        </div>
      )}
      <style jsx>
        {`
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
            margin: 15px 5px 5px 5px;
            padding: 5px;
            font-size: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default SetParentRelation;
// 07parernt5
