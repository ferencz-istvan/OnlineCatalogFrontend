import { useState, useEffect } from "react";
import { User } from "../../lib/loginData";

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const SetStudentDataForm: React.FC<ModalProps> = ({ setIsOpen }) => {
  const [id, setId] = useState(0);
  const [fullName, setFullName] = useState("");
  const [classId, setClassId] = useState(0);
  const [parentId, setParentId] = useState(0);
  const [address, setAddress] = useState("");
  const [userId, setUserId] = useState(0);
  const [isSuccessfull, setIsSuccessfull] = useState(false);
  const [tryOfLoad, setTryOfLoad] = useState(0);
  useEffect(() => {
    const actualRole = JSON.parse(
      localStorage.getItem("actual_role") as string
    );
    if (actualRole) {
      setId(actualRole.id);
      setFullName(actualRole.name);
      setClassId(actualRole.class_id);
      setParentId(actualRole.parent_id);
      setAddress(actualRole.address);
      setUserId(actualRole.user_id);
      //console.log(`Parent id: ${parentId}+${id}+${fullName}`);
    } else {
      setTryOfLoad((prev) => prev + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tryOfLoad]);

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
    try {
      const response = await fetch(`http://localhost:3000/students/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: fullName,
          class_id: classId,
          parent_id: parentId,
          address: address,
          user_id: userId,
        }),
      });
      const statusCode = response.status;
      if (statusCode === 200) {
        setIsSuccessfull(true);
        const stringData = JSON.stringify({
          id: id,
          name: fullName,
          class_id: classId,
          parent_id: parentId,
          address: address,
          user_id: userId,
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
            <label htmlFor="address">Address:</label>
            <br />
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
export default SetStudentDataForm;
