//import styles from "./studentsLayout.module.css";

import HeaderComponent from "../components/HeaderComponent";
import SideBarComponent from "../components/SideBarComponent";
import { useState, useEffect } from "react";
import ParentSidebar from "../parents/ParentSideBar";

interface ParentsLayoutProps {
  children: React.ReactNode;
}

const ParentsLayout: React.FC<ParentsLayoutProps> = ({ children }) => {
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
        role="parent"
      ></HeaderComponent>
      <SideBarComponent isNavbar={isNavbar} handleNavbar={handleNavbar}>
        <ParentSidebar />
      </SideBarComponent>
      <div className="main">{children}</div>
      <style jsx>{`
        .main {
          padding: 30px;
        }
      `}</style>
    </div>
  );
};

export default ParentsLayout;
