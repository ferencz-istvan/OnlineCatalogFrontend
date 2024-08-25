//import styles from "./studentsLayout.module.css";

import HeaderComponent from "../components/HeaderComponent";
import SideBarComponent from "../components/SideBarComponent";
import { useEffect } from "react";
import TeacherSidebar from "../teachers/TeacherSideBar";
import { useRouter } from "next/navigation";
import useSidebarStore from "@/lib/sidebarStore";

interface StudentsLayoutProps {
  children: React.ReactNode;
}

const CustomLayout: React.FC<StudentsLayoutProps> = ({ children }) => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const changeIsOpen = useSidebarStore((state) => state.changeSidebarState);
  const router = useRouter();
  const actualUser = localStorage.getItem("actual_user");

  useEffect(() => {
    const mainMargins = isOpen
      ? { marginLeft: "300px" }
      : {
          marginLeft: "auto",
        };
    const mainElement = document.getElementsByClassName(
      "main"
    )[0] as HTMLElement;
    Object.assign(mainElement.style, mainMargins);
  }, [isOpen]);

  function handleNavbar() {
    changeIsOpen();
  }
  if (actualUser && JSON.parse(actualUser).role === "Teacher") {
    return (
      <div>
        <HeaderComponent
          handleNavbar={handleNavbar}
          role="teacher"
        ></HeaderComponent>
        <SideBarComponent isNavbar={isOpen} handleNavbar={handleNavbar}>
          <TeacherSidebar />
        </SideBarComponent>
        <div className="main">{children}</div>
        <div className="footer">
          <div className="footer-text">
            <p>
              Icons for this web app was used from next webpage:{" "}
              <a
                href="https://www.svgrepo.com/svg/520501/schedule"
                target="_blank"
              >
                link
              </a>
            </p>
            <p>
              If you want to contact us, you can do so at
              example@examplemail.com
            </p>
          </div>
          <div className="footer-image">
            <img
              id="footer-img"
              src="/icons/learning.svg"
              alt="footer img"
              height={80}
            />
          </div>
        </div>
        <style jsx>{`
          .main {
            padding: 10px 40px;
            min-height: calc(100vh - 215px);
          }
          .footer {
            background-color: slategray;
            padding: 20px;
            display: flex;
          }
          .footer-text {
            width: 60%;
            margin-left: 4vw;
          }
          .footer-image {
            width: 40%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          @media only screen and (max-width: 700px) {
            .main {
              padding: 5px;
            }
            .footer {
              background-color: darkslategray;
              color: white;
              font-weight: 600;
              padding: 10px;
              flex-direction: column;
            }
            .footer-text {
              width: 100%;
            }
            .footer-image {
              width: 100%;
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
