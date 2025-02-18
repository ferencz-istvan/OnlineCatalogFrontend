//import styles from "./studentsLayout.module.css";

import HeaderComponent from "../components/HeaderComponent";
import SideBarComponent from "../components/SideBarComponent";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ParentSidebar from "../parents/ParentSideBar";
import useSidebarStore from "@/lib/sidebarStore";

interface ParentsLayoutProps {
  children: React.ReactNode;
}

const ParentsLayout: React.FC<ParentsLayoutProps> = ({ children }) => {
  const isNavbar = useSidebarStore((state) => state.isOpen);
  const changeIsNavbar = useSidebarStore((state) => state.changeSidebarState);
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
    changeIsNavbar();
  }
  if (actualUser && JSON.parse(actualUser).role === "Parent") {
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
            padding: 10px 30px;
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
              padding: 0;
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

export default ParentsLayout;
