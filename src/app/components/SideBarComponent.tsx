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

      <p style={{ cursor: "pointer" }} onClick={handleNavbar}>
        EXIT
      </p>
      <style jsx>
        {`
          .nav-bar {
            display: flex;
            flex-direction: column;
            width: 270px;
            background-color: darkviolet;
            color: white;
            border-radius: 5% 30% 70% 5%;
            font-weight: 700;
            padding: 30px;
            margin: 5px;
            position: fixed;
            top: 20%;
            left: 0;
            filter: drop-shadow(0 0 0.3rem black);
             {
              /*  filter: drop-shadow(0 -6mm 4mm rgb(160, 0, 210)); */
            }
          }
          .nav-bar > * {
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
              background-color: darkviolet;
              color: white;
              font-weight: 700;
              padding: 40px;
              margin: 0;
              position: fixed;
              top: 0;
              left: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SideBarComponent;
