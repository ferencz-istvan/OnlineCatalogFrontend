import { useState, useEffect } from "react";
import { User } from "../../lib/loginData";

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const SetTeacherDataForm: React.FC<ModalProps> = ({ setIsOpen }) => {
  const [fullName, setFullName] = useState("");
  const [isSuccessfull, setIsSuccessfull] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  function preChange() {
    if (fullName.length < 4) {
      window.alert("The chosen name is too short");
    } else {
      changeFullName();
    }
  }

  async function changeFullName() {
    const token = localStorage.getItem("accessToken");
    const actualRole = JSON.parse(
      localStorage.getItem("actual_role") as string
    );
    if (!actualRole) {
      return null;
    }
    const actualId = actualRole.id;
    const userId = actualRole.user_id;
    try {
      const response = await fetch(
        `http://localhost:3000/teachers/${actualId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: fullName, user_id: userId }),
        }
      );
      const statusCode = response.status;
      if (statusCode === 200) {
        setIsSuccessfull(true);
        localStorage.setItem(
          "actual_role",
          JSON.stringify({ id: actualId, name: fullName, user_id: userId })
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="modal-container">
      {!isSuccessfull ? (
        <div>
          <form className="container-center">
            <label htmlFor="full-name">Full name:</label>
            <br />
            <input
              type="text"
              id="full-nam"
              name="full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <br />
            <button
              onClick={(e) => {
                e.preventDefault();
                preChange();
              }}
            >
              Change
            </button>
          </form>
        </div>
      ) : (
        <div className="container-center">
          <p>Successful name change</p>
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
      <style jsx>
        {`
          .modal-container {
            font-size: 20px;
          }
          .container-center {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          input {
            padding: 5px;
            border-radius: 5px;
            width: 200px;
          }
          button {
            padding: 10px;
            margin: 3px;
            border-radius: 15px;
            cursor: pointer;
          }
          button:hover {
            box-shadow: 3px 3px 8px darkslategray;
          }
        `}
      </style>
    </div>
  );
};
export default SetTeacherDataForm;
