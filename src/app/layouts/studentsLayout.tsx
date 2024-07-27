//import styles from "./studentsLayout.module.css";

import HeaderComponent from "../components/HeaderComponent";
import SideBarComponent from "../components/SideBarComponent";
import { useState, useEffect } from "react";
import StudentSidebar from "../students/StudentSideBar";

interface StudentsLayoutProps {
  children: React.ReactNode;
}

const CustomLayout: React.FC<StudentsLayoutProps> = ({ children }) => {
  const [isNavbar, setIsNavbar] = useState(false);
  useEffect(() => {
    const mainMargins = isNavbar
      ? { marginLeft: "300px" }
      : {
          marginLeft: "auto",
        };
    const mainElement = document.getElementsByClassName(
      "main"
    )[0] as HTMLElement;
    Object.assign(mainElement.style, mainMargins);
  }, [isNavbar]);

  function handleNavbar() {
    setIsNavbar((prev) => !prev);
  }
  return (
    <div>
      <HeaderComponent
        handleNavbar={handleNavbar}
        role="student"
      ></HeaderComponent>
      <SideBarComponent isNavbar={isNavbar} handleNavbar={handleNavbar}>
        <StudentSidebar />
      </SideBarComponent>
      <div className="main">{children}</div>
      <style jsx>{`
        .main {
          padding: 10px 40px;
        }
      `}</style>
    </div>
  );
};

export default CustomLayout;
