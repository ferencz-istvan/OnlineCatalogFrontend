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
        <div className="grid-item-menu pointer" onClick={props.handleNavbar}>
          <img
            id="menu-img"
            src="/icons/hamburgerMenuWhite.svg"
            alt="white hamburger menu"
            height={50}
          />
        </div>
        <div className="grid-title">
          Online Catalog{forTextFunction(props.role)}
        </div>
        <div className="grid-item">
          <Link onClick={clearLocalStorage} href="/login">
            <div className="log-out">
              <span className="link-text">Log Out </span>{" "}
              <img
                src="/icons/logOutWhite.svg"
                alt="logout image"
                height={45}
              />
            </div>
          </Link>
        </div>
      </div>
      {
        <div className={isTricky ? "tricky-header" : "hidden-header"}>
          <div
            className={isTricky ? "tricky-item-navbar pointer" : "hidden-item"}
            onClick={props.handleNavbar}
          >
            <img
              src="/icons/hamburgerMenu.svg"
              alt="black hamburger menu"
              height={50}
            />
          </div>
          <div className={isTricky ? "tricky-item-title" : "hidden-item"}>
            Online Catalog
          </div>
          <div className={isTricky ? "tricky-item-logout" : "hidden-item"}>
            <Link onClick={clearLocalStorage} href="/login">
              <div className="log-out">
                <span className="link-text">Log Out </span>{" "}
                <img
                  id="logout-img"
                  src="/icons/logOut.svg"
                  alt="logout image"
                  height={45}
                />
              </div>
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
          .grid-item,
          .grid-title {
            padding: 12px;
            font-size: 1.6em;
            color: white;
            font-weight: 600;
          }
          .grid-item-menu {
            font-size: 1.6em;
            color: white;
            font-weight: 700;
            display: flex;
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
            transition: all 300ms linear;
            z-index: 1;
          }
          .tricky-header > #logout-img {
            height: 45px;
          }
          .tricky-item-navbar,
          .tricky-item-title,
          .tricky-item-logout {
            padding: 12px;
            font-size: 1.6em;
            color: black;
            font-weight: 500;
            transition: all 300ms linear 200ms;
          }
          .hidden-header {
            position: fixed;
            top: 0;
            margin: -40px 0 0 0;
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
          .hidden-header > #logout-img {
            display: none;
          }
          .hidden-item {
            padding: 0px;
            font-size: 0em;
            color: black;
            font-weight: 500;
            transition: all 300ms linear 200ms;
            cursor: pointer;
          }
          .log-out {
            display: flex;
            align-items: center;
          }
          @media only screen and (max-width: 800px) {
            .link-text {
              display: none;
            }
            .normal-header {
              grid-template-areas:
                "title title"
                "navbar logout";
              grid-template-rows: 1fr 1fr;
              grid-template-columns: 1fr 1fr;
            }
            .grid-title {
              grid-area: title;
              font-size: calc(3vw + 10px);
            }
            .grid-item-menu {
              grid-area: navbar;
            }
            .grid-item {
              grid-area: logout;
            }
            .tricky-header {
              grid-template-areas:
                "title title"
                "navbar logout";
              grid-template-rows: 1fr 1fr;
              grid-template-columns: 1fr 1fr;
            }
            .tricky-item-navbar {
              grid-area: navbar;
            }
            .tricky-item-title {
              grid-area: title;
              font-size: calc(3vw + 10px);
            }
            .tricky-item-logout {
              grid-area: logout;
            }
          }
        `}
      </style>
    </div>
  );
}
