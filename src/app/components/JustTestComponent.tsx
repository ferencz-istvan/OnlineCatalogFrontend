import React from "react";

interface TestModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const TestModal: React.FC<TestModalProps> = ({ setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <h1>Text from modals child :D</h1>
      <button onClick={handleClose}>Close from child</button>
    </div>
  );
};

export default TestModal;
