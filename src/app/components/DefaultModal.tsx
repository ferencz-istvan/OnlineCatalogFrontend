import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  buttonName: string;
  children?: React.ReactElement<{
    setIsOpen: (isOpen: boolean) => void;
  }>;
}

const DefaultModal: React.FC<ModalProps> = ({
  buttonName,
  isOpen,
  setIsOpen,
  children = null,
}) => {
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen && (
        <div className={`modal ${isOpen ? "modal-open" : ""}`}>
          <div className="modal-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <h4>{buttonName} modal:</h4>
            {/* {children} */}
            {/* instead of children component we can use the next snipped code */}
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, { setIsOpen: setIsOpen });
              }
              return child;
            })}
          </div>
        </div>
      )}
      <style jsx>{`
        /* The modal */
        .modal {
          position: fixed; /* Stay in place */
          z-index: 1; /* Sit on top */
          left: 0;
          top: 0;
          width: 100%; /* Full width */
          height: 100%; /* Full height */
          overflow: auto; /* Enable scroll if needed */
          background-color: rgb(0, 0, 0); /* Fallback color */
          background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
          display: none; /* Hidden by default */
          backdrop-filter: blur(10px);
        }

        .modal-open {
          display: block; /* Show the modal when open */
        }

        /* Modal Content */
        .modal-content {
          background-color: #fefefe;
          margin: 20% auto; /* 15% from the top and centered */
          padding: 20px;
          border: 1px solid #888;
          width: 80%; /* Could be more or less, depending on screen size */
          max-width: 1200px;
          border-radius: 30px;
        }

        /* The close button */
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .close:hover,
        .close:focus {
          color: #000;
          text-decoration: none;
          cursor: pointer;
        }

        /* Custom button styles */
        .custom-button {
          background-color: #4caf50;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .custom-button:hover {
          background-color: #3e8e41;
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

export default DefaultModal;
