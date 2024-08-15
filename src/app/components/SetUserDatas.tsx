import { useState, useEffect } from "react";
import { User } from "../../lib/loginData";

interface ModalProps {
  setIsOpen: (isOpen: boolean) => void;
}

const SetUserDatasForm: React.FC<ModalProps> = ({ setIsOpen }) => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [isCorrectPw, setIsCorrectPw] = useState(false);
  const [userId, setUserId] = useState(0);
  const [accessToken, setAccessToken] = useState("");
  const [roleValue, setRoleValue] = useState("");
  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const actualUser = JSON.parse(
      localStorage.getItem("actual_user") as string
    );
    const email = actualUser?.email;
    const username = actualUser?.username;
    const user_id = actualUser?.user_id;
    const role = actualUser?.role;
    setEmailValue(email);
    setUsernameValue(username);
    setUserId(user_id);
    setRoleValue(role);
    setAccessToken(localStorage.getItem("accessToken") as string);
  }, []);

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
          setIsCorrectPw(true);
        }
      }
    } catch (error) {
      console.error("Error in logging in", error);
    }
  }

  async function putNewDatas() {
    if (emailValue.length < 2 || usernameValue.length < 2) {
      window.alert("Values have to be longer!");
      return;
    }
    const response = await fetch(`http://localhost:3000/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        role: roleValue,
        email: emailValue,
        username: usernameValue,
        password: passwordValue,
      }),
    });
    const data = await response.json();
    //console.log(data);
  }

  return (
    <div>
      <p>To change your data, first time you have to type your password!</p>
      <form>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        ></input>
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            sendLoginRequest();
          }}
        >
          Check
        </button>
      </form>
      {isCorrectPw && (
        <div>
          <p>Now you can change the following datas:</p>
          <form>
            <label htmlFor="username">Username:</label>
            <br />
            <input
              type="text"
              id="username"
              name="username"
              value={usernameValue}
              onChange={(e) => setUsernameValue(e.target.value)}
            />
            <br />
            <label htmlFor="email">Email:</label>
            <br />
            <input
              type="text"
              id="email"
              name="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <br />
            <button
              onClick={async (e) => {
                e.preventDefault();
                await putNewDatas();
                handleClose();
              }}
            >
              Change values
            </button>
          </form>
        </div>
      )}
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
      `}</style>
    </div>
  );
};

export default SetUserDatasForm;
