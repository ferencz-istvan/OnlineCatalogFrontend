import React from "react";

interface TestModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const TestModal: React.FC<TestModalProps> = ({ setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className="centered-container">
      <h4>We hope you enjoy using the online diary.</h4>
      <h4>We wish your child the best of luck in the coming school year!</h4>
      <button onClick={handleClose}>Ok</button>
      <style jsx>{`
        .centered-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
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
      `}</style>
    </div>
  );
};

export default TestModal;
