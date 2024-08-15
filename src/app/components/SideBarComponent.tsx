import React from "react";
import { ReactNode } from "react";
import StudentSideBar from "../students/StudentSideBar";

interface SideBarProps {
  isNavbar: boolean;
  handleNavbar: () => void;
  children: ReactNode;
}

const SideBarComponent: React.FC<SideBarProps> = ({
  isNavbar,
  handleNavbar,
  children,
}) => {
  if (!isNavbar) {
    return null;
  }
  return (
    <div className="nav-bar">
      <h1>Navigation:</h1>

      {children}

      <div className="exit-button" onClick={handleNavbar}>
        EXIT
      </div>
      <style jsx>
        {`
          .exit-button {
            color: white;
            font-size: 20px;
            font-weight: 600;
            cursor: pointer;
            padding: 10px 0px;
          }
          .nav-bar {
            display: flex;
            flex-direction: column;
            width: 260px;
            background-color: darkslategrey;
            color: white;
            border-radius: 5% 30% 70% 5%;
            font-weight: 700;
            padding: 30px;
            margin: 5px;
            position: fixed;
            top: 20%;
            left: 0;
            filter: drop-shadow(0 0 0.3rem black);
          }
          h1 {
            color: lightgreen;
          }
          @media only screen and (max-width: 700px) {
            .nav-bar {
              z-index: 12;
              display: flex;
              flex-direction: column;
              width: 100vw;
              height: 100vh;
              border-radius: 0;
              background-color: darkslategrey;
              color: white;
              font-weight: 700;
              padding: 40px;
              margin: 0;
              position: fixed;
              top: 0;
              left: 0;
              background-image: linear-gradient(
                -70deg,
                red,
                darkslategray,
                darkslategray
              );
            }
            .exit-button {
              font-size: 7vh;
              display: flex;
              justify-content: center;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SideBarComponent;
