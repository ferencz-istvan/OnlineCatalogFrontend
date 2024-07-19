"use client";

import LoginImage from "./LoginImage";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import { useState } from "react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="container">
      <header>
        <span className="header-title">Online Catalog Login Page</span>
        <img src="/icons/achievement.svg" alt="icon for catalog" height={60} />
      </header>
      <div className="login-window">
        <div className="left">
          {isLogin ? <LoginForm setIsLogin={setIsLogin} /> : <LoginImage />}
        </div>
        <div className="right">
          {isLogin ? (
            <LoginImage />
          ) : (
            <RegistrationForm setIsLogin={setIsLogin} />
          )}
        </div>
      </div>
      <footer>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa veritatis
        voluptas tenetur quia inventore qui ipsam molestias! Sequi reiciendis
        aut vitae recusandae quasi sed soluta quae illo maxime incidunt?
        Adipisci hic veritatis impedit modi voluptatibus ipsum laborum quasi
        consequatur ad.
      </footer>
      <style jsx>{`
        .container {
          background-color: #fff8f8;
          min-height: 100vh;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        header {
          display: flex;
          width: 100%;
          flex-direction: row;
          justify-content: space-between;
          background-color: purple;
          font-size: 28px;
          font-weight: 600;
          color: white;
        }
        header > img {
          padding: 5px;
          margin-right: 30px;
        }
        .header-title {
          margin-left: 20px;
          padding: 20px;
        }
        .login-window {
          width: 70%;
          display: flex;
          flex-wrap: nowrap;

           {
            /* border: 5px solid black; 
            margin: 5vh 0;*/
          }
        }
        .left {
          background-color: blue;
          width: 50%;
          box-shadow: -20px 20px 50px 10px purple inset;
        }
        .right {
          background-color: red;
          box-shadow: 20px 20px 50px 10px purple inset;
          width: 50%;
        }

        footer {
          background-color: #d5d5d5;
          padding: 20px;
        }
        @media only screen and (min-width: 701px) {
          .login-window {
            min-width: 700px;
          }
        }

        @media only screen and (max-width: 700px) {
          header {
            font-size: 22px;
            font-weight: 700;
          }
          .login-window {
            margin: 0;
            flex-direction: column;
            width: 100% !important;
          }
          .left {
            width: 100%;
            height: 50%;
          }
          .right {
            width: 100%;
            height: 50%;
            box-shadow: -20px 20px 50px 10px purple inset;
          }
        }
      `}</style>
    </div>
  );
}
