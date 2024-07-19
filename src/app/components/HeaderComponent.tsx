import { useState, useEffect } from "react";
import Link from "next/link";
import { useUserPublicData } from "@/lib/loginData";

interface HeaderComponentProps {
  handleNavbar: () => void;
  role: string;
}

export default function HeaderComponent(props: HeaderComponentProps) {
  const [isTricky, setIsTricky] = useState(false);
  const clearLocalStorage = useUserPublicData(
    (state) => state.clearLocalStorage
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    const scrollTop = window.scrollY;
    setIsTricky(scrollTop > 250);
  }

  const forTextFunction = (role: string) => {
    switch (role) {
      case "student":
        return <span> - for students</span>;
      case "teacher":
        return <span> - for teachers</span>;
      case "parent":
        return <span> - for parents</span>;
      default:
        return;
    }
  };

  return (
    <div>
      <div className="normal-header">
        <div className="grid-item pointer" onClick={props.handleNavbar}>
          NavBar
        </div>
        <div className="grid-item">
          Online Catalog{forTextFunction(props.role)}
        </div>
        <div className="grid-item">
          <Link onClick={clearLocalStorage} href="/login">
            <span className="link-text">Log Out</span>
          </Link>
        </div>
      </div>
      {
        <div className={isTricky ? "tricky-header" : "hidden-header"}>
          <div
            className={isTricky ? "tricky-item pointer" : "hidden-item"}
            onClick={props.handleNavbar}
          >
            NavBar
          </div>
          <div className={isTricky ? "tricky-item" : "hidden-item"}>
            Online Catalog
          </div>
          <div className={isTricky ? "tricky-item" : "hidden-item"}>
            <Link onClick={clearLocalStorage} href="/login">
              Log out
            </Link>
          </div>
        </div>
      }
      <style jsx>
        {`
          .pointer {
            cursor: pointer;
          }
          .normal-header {
            margin: 0;
            padding: 0;
            display: grid;
            width: 100%;
            grid-template-columns: 200px 1fr 200px;
            background-color: darkslategrey;
            place-items: center;
          }
          .grid-item {
            padding: 12px;
            font-size: 1.6em;
            color: white;
            font-weight: 600;
          }
          .tricky-header {
            position: fixed;
            top: 0;
            margin: 0;
            padding: 0;
            display: grid;
            width: 100%;
            grid-template-columns: 200px 1fr 200px;
            background-color: rgba(70, 130, 180, 0.4);
            opacity: 1;
            place-items: center;
            backdrop-filter: blur(15px);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
              0 6px 20px 0 rgba(0, 0, 0, 0.19);
            transition: all 1000ms linear;
          }
          .tricky-item {
            padding: 12px;
            font-size: 1.6em;
            color: black;
            font-weight: 500;
            transition: all 700ms linear 300ms;
          }
          .hidden-header {
            position: fixed;
            top: 0;
            margin: 0;
            padding: 0;
            display: grid;
            width: 100%;
            grid-template-columns: 200px 1fr 200px;
            background-color: rgba(70, 130, 180, 0.4);
            opacity: 0;
            place-items: center;
            backdrop-filter: blur(15px);
            transition: all 500ms linear;
          }
          .hidden-item {
            padding: 0px;
            font-size: 0em;
            color: black;
            font-weight: 500;
            transition: all 300ms linear 200ms;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}
