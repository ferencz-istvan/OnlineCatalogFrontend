import { useEffect, useState } from "react";
import { userRegistration } from "./registrationFunctions";

interface RegistrationProps {
  setIsLogin: (isLogin: boolean) => void;
}

interface Classes {
  id: number;
  name: string;
  grade: number;
  speciality: string;
  conductor_id: number;
}

export default function RegistrationForm(props: RegistrationProps) {
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regRole, setRegRole] = useState("Student");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmation, setRegConfirmation] = useState("");
  const [regTelNum, setRegTelNum] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regClass, setRegClass] = useState("");
  const [regParentId, setRegParentId] = useState(0);

  const [classes, setClasses] = useState([] as Classes[]);

  async function getClasses() {
    try {
      const response = await fetch("http://localhost:3000/classes");
      const data = await response.json();
      setClasses(data);
      setRegClass(data[0].id);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getClasses();
  }, []);

  async function sendRegistration() {
    if (!regEmail) {
      window.alert("Missing email adress!");
      return;
    }
    if (!regUsername) {
      window.alert("Missing username!");
      return;
    }
    if (regPassword != regConfirmation) {
      window.alert("The two passwords entered do not match");
      return;
    }
    if (regRole === "Parent" && !regTelNum) {
      window.alert("Missing telephone number!");
      return;
    }
    const newUser = {
      role: regRole,
      email: regEmail,
      username: regUsername,
      password: regPassword,
      class_id: regClass,
      parent_id: regParentId,
      address: regAddress,
      phone_number: regTelNum,
    };
    /*  userRegistration(newUser).then((data) => {
      setUserId(data.user_id);
      console.log(`User ID: ${userId}`);
    }); */
    try {
      await userRegistration(newUser);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="registration-form">
      <h2>Registration:</h2>
      <form>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          id="email"
          type="email"
          value={regEmail}
          onChange={(event) => setRegEmail(event.target.value)}
        />
        <br />
        <label htmlFor="username">Username:</label>
        <br />
        <input
          id="username"
          type="text"
          value={regUsername}
          onChange={(event) => setRegUsername(event.target.value)}
        />
        <br />
        <p>Select your role:</p>
        <input
          id="teacher_role"
          type="radio"
          name="role_radio"
          value="Teacher"
          checked={regRole === "Teacher"}
          onChange={(event) => setRegRole(event.target.value)}
        />
        <label htmlFor="role">Teacher</label>
        <input
          id="student_role"
          type="radio"
          name="role_radio"
          value="Student"
          checked={regRole === "Student"}
          onChange={(event) => setRegRole(event.target.value)}
        />
        <label htmlFor="role">Student</label>
        <input
          id="parent_role"
          type="radio"
          name="role_radio"
          value="Parent"
          checked={regRole === "Parent"}
          onChange={(event) => setRegRole(event.target.value)}
        />
        <label htmlFor="role">Parent</label>
        <br />
        {regRole === "Student" && (
          <div>
            <label htmlFor="class">Class: </label>
            <select
              id="class"
              value={regClass}
              onChange={(event) => setRegClass(event.target.value)}
            >
              {" "}
              {classes.map((cls) => (
                <option key={cls.id} value={`${cls.id}`}>
                  {cls.grade} {cls.name}
                </option>
              ))}
            </select>
            <br />
            <label htmlFor="address">Address: </label>
            <input
              id="address"
              type="text"
              value={regAddress}
              onChange={(event) => setRegAddress(event.target.value)}
            />
            <br />
            <label htmlFor="phone">
              Phone number of parent{" "}
              <abbr title="If your parent already has account, (s)he can connect automatically with your account">
                (info)
              </abbr>
            </label>
            <br />
            <input
              id="phone"
              type="text"
              value={regTelNum}
              onChange={(event) => setRegTelNum(event.target.value)}
            />
          </div>
        )}
        {regRole === "Parent" && (
          <div>
            <label htmlFor="phone">Phone number:</label>
            <br />
            <input
              id="phone"
              type="text"
              value={regTelNum}
              onChange={(event) => setRegTelNum(event.target.value)}
            />
          </div>
        )}
        <label htmlFor="password">Password:</label> <br />
        <input
          id="password"
          type="password"
          value={regPassword}
          onChange={(event) => setRegPassword(event.target.value)}
        />
        <br />
        <label htmlFor="password-confirm">Password confirmation:</label> <br />
        <input
          id="password-confirm"
          type="password"
          value={regConfirmation}
          onChange={(event) => setRegConfirmation(event.target.value)}
        />
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(
              `Email: ${regEmail}; \nUsername: ${regUsername} \nRole: ${regRole}`
            );
            sendRegistration();
          }}
        >
          Register
        </button>
      </form>

      <div>If you already have an account, then use:</div>
      <button onClick={() => props.setIsLogin(true)}>Log in</button>

      <style jsx>
        {`
          .registration-form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            padding: 10px;
            margin: 1 0px;
          }
          label {
            padding: 10px;
          }
          input {
            padding: 15px;
            margin: 10px;
            border-radius: 30px;
            border: 0;
          }

          input:focus-visible {
            outline: none;
            border: 2px dashed orange;
          }
          button {
            padding: 15px;
            margin: 15px;
            border-radius: 25px;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}
