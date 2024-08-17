//import styles from "./studentsLayout.module.css";

import HeaderComponent from "../components/HeaderComponent";
import SideBarComponent from "../components/SideBarComponent";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StudentSidebar from "../students/StudentSideBar";

interface StudentsLayoutProps {
  children: React.ReactNode;
}

const CustomLayout: React.FC<StudentsLayoutProps> = ({ children }) => {
  const [isNavbar, setIsNavbar] = useState(false);
  const router = useRouter();
  const actualUser = localStorage.getItem("actual_user");

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
  if (actualUser && JSON.parse(actualUser).role === "Student") {
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
          @media only screen and (max-width: 700px) {
            .main {
              padding: 0;
            }
          }
        `}</style>
      </div>
    );
  } else {
    router.push("/login");
    return null;
  }
};

export default CustomLayout;
