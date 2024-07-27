import React from "react";
import { useState, useEffect } from "react";

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const SetUserPassword: React.FC<ModalProps> = ({ setIsOpen }) => {
  const [emailValue, setEmailValue] = useState("email");
  const [passwordValue, setPasswordValue] = useState("password");
  const [isNewPassField, setIsNewPassField] = useState(false);
  const [newPasswordValue, setNewPasswordValue] = useState("newPassword");

  const handleClose = () => {
    setIsOpen(false);
  };

  async function sendLoginRequest() {
    if (!emailValue || !passwordValue) {
      window.alert("Missing email or password!");
      return;
    }
    const userParams = {
      email: emailValue,
      password: passwordValue,
    };
    try {
      const loginResponse = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userParams),
      });
      const data = await loginResponse.json();
      const statusCode = loginResponse.status;
      if (data) {
        if (data.message === "Invalid email or password") {
          window.alert(data.message);
          return;
        }
        if (statusCode === 200) {
          setIsNewPassField(true);
        }
      }
    } catch (error) {
      console.error("Error in logging in", error);
    }
  }

  async function putNewPassword() {
    if (newPasswordValue.length < 4) {
      window.alert("The new password is too short!");
      return;
    }
    const actualUser = JSON.parse(
      localStorage.getItem("actual_user") as string
    );
    const user_id = actualUser.user_id;
    const role = actualUser.role;
    const email = actualUser.email;
    const username = actualUser.username;
    const password = newPasswordValue;
    const accessToken = localStorage.getItem("accessToken");
    console.log(
      `role: ${role}\n email: ${email}\n username: ${username}\n passwrd: ${password}`
    );
    const response = await fetch(`http://localhost:3000/users/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        role: role,
        email: email,
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    //console.log(data);
  }
  return (
    <div className="set-pw-container">
      <div>
        <p>First time give me your email address and password:</p>
        <form>
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            value={emailValue}
            onChange={(event) => setEmailValue(event.target.value)}
          />{" "}
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            value={passwordValue}
            onChange={(event) => setPasswordValue(event.target.value)}
          />
          <br />
          <button
            onClick={(e) => {
              e.preventDefault();
              sendLoginRequest();
            }}
          >
            Send datas
          </button>
          <br />
          {isNewPassField && (
            <div>
              <label htmlFor="new-password">New password:</label>
              <br />
              <input
                type="text"
                id="new-password"
                name="new-password"
                value={newPasswordValue}
                onChange={(event) => setNewPasswordValue(event.target.value)}
              />
              <br />
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await putNewPassword();
                  handleClose();
                }}
              >
                Change password
              </button>
            </div>
          )}
        </form>
      </div>
      <div></div>
    </div>
  );
};

export default SetUserPassword;
