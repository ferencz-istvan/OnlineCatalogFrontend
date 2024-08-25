import React from "react";
import { useState, useEffect } from "react";

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const SetUserPassword: React.FC<ModalProps> = ({ setIsOpen }) => {
  const [emailValue, setEmailValue] = useState("email");
  const [passwordValue, setPasswordValue] = useState("password");
  const [isNewPassField, setIsNewPassField] = useState(false);
  const [newPasswordValue, setNewPasswordValue] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [successed, setSuccessed] = useState(false);

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
    if (newPasswordValue != newPasswordConfirm) {
      window.alert(
        "The new password and password verification fields do not match"
      );
      return;
    }
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
    //const data = await response.json();
    const statusCode = response.status;
    if (statusCode === 200) {
      window.alert("Password change successful");
      handleClose();
    }
  }
  return (
    <div className="set-pw-container">
      <div>
        <p>First time give me your email address and password:</p>
        <div className="form-container">
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
            <div className="button-container">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  sendLoginRequest();
                }}
              >
                Send data
              </button>
            </div>
            <br />
            {isNewPassField && (
              <div>
                <label htmlFor="new-password">New password:</label>
                <br />
                <input
                  type="password"
                  id="new-password"
                  name="new-password"
                  value={newPasswordValue}
                  onChange={(event) => setNewPasswordValue(event.target.value)}
                />
                <br />
                <label htmlFor="new-password-confirm">
                  New password confirmation:
                </label>
                <br />
                <input
                  type="password"
                  id="new-password-confirm"
                  name="new-password-confirm"
                  value={newPasswordConfirm}
                  onChange={(event) =>
                    setNewPasswordConfirm(event.target.value)
                  }
                />
                <br />
                <div className="button-container">
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      await putNewPassword();
                    }}
                  >
                    Change password
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      <style jsx>{`
        button {
          padding: 10px;
          margin: 10px;
          border-radius: 15px;
          cursor: pointer;
        }
        button:hover {
          box-shadow: 3px 3px 8px darkslategray;
        }
        input {
          padding: 5px;
          margin: 3px;
          border-radius: 5px;
        }
        .set-pw-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .button-container,
        .form-container {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};

export default SetUserPassword;
