import { useState, useEffect } from "react";
import type { Parent } from "@/app/interfaces/baseInterfaces";

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const SetParentData: React.FC<ModalProps> = ({ setIsOpen }) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [actualParent, setActualParent] = useState<Parent | null>(null);

  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [tryOfLoad, setTryOfLoad] = useState(0);
  const [className, setClassName] = useState("");
  const [parentName, setParentName] = useState("");
  useEffect(() => {
    const actualRole = JSON.parse(
      localStorage.getItem("actual_role") as string
    );
    if (actualRole) {
      setActualParent(actualRole);
      setPhoneNumber(actualRole?.phone_number as string);
      setFullName(actualRole?.name as string);
    } else {
      setTryOfLoad((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tryOfLoad]);

  const handleClose = () => {
    setIsOpen(false);
  };

  function preChange() {
    if (fullName.length < 4 || phoneNumber.length < 6) {
      window.alert("The chosen name or phone  number is too short");
    } else {
      changeParentData();
    }
  }

  async function changeParentData() {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:3000/parents/${actualParent?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: fullName,
            user_id: actualParent?.user_id,
            phone_number: phoneNumber,
          }),
        }
      );
      const statusCode = response.status;
      if (statusCode === 200) {
        setIsSuccessfull(true);
        const stringData = JSON.stringify({
          id: actualParent?.id,
          name: fullName,
          user_id: actualParent?.user_id,
          phone_number: phoneNumber,
        });
        localStorage.setItem("actual_role", stringData);
        console.log(stringData);
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
              id="full-name"
              name="full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <br />
            <label htmlFor="address">Phone number:</label>
            <br />
            <input
              type="text"
              id="address"
              name="address"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              onKeyDown={(event) => {
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
              }}
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
          <p>Successful change</p>
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
export default SetParentData;
