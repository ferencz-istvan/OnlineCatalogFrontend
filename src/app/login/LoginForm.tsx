import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUserPublicData } from "@/lib/loginData";
import { User } from "../../lib/loginData";
import { getUsers } from "./registrationFunctions";

interface LoginProps {
  setIsLogin: (isLogin: boolean) => void;
}

export default function LoginForm(props: LoginProps) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const routeToRole = (role: string) => {
    //const role = JSON.parse(localStorage.getItem("actual_user") as string).role;
    switch (role) {
      case "Student":
        router.push("/students");
        break;
      case "Teacher":
        router.push("/teachers");
        break;
      case "Parent":
        router.push("/parents");
        break;
      case "Admin":
        router.push("/admin");
        break;
    }
  };

  const clearLocalStorages = useUserPublicData(
    (state) => state.clearLocalStorage
  );
  const setActualRole = useUserPublicData((state) => state.setActualRole);

  const setActualUser = (fetchedUser: Partial<User>) => {
    useUserPublicData.setState({ actual_user: fetchedUser });
  };

  const logActualUser = () => {
    const user = useUserPublicData.getState().actual_user;
    console.log("Actual user:");
    console.log(user);
  };

  async function sendLoginRequest() {
    if (!loginEmail || !loginPassword) {
      window.alert("Missing email or password!");
      return;
    }
    const userParams = {
      email: loginEmail,
      password: loginPassword,
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
      if (data) {
        if (data.message === "Invalid email or password") {
          window.alert(data.message);
          return;
        }
        const { accessToken, refreshToken, user_id, role, email, username } =
          data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        const fetchedUser = {
          user_id,
          role,
          email,
          username,
        };
        localStorage.setItem("actual_user", JSON.stringify(fetchedUser));
        setActualUser(fetchedUser);
        logActualUser();
        setActualRole();
        routeToRole(role); //instead of router.push("/about");
      }
    } catch (error) {
      console.error("Error in logging in", error);
    }
  }

  return (
    <div className="login-form">
      <h2>Logging in</h2>
      <form>
        <label htmlFor="username">Email address:</label>
        <br />
        <input
          id="username"
          type="text"
          value={loginEmail}
          onChange={(event) => setLoginEmail(event.target.value)}
        />
        <br />
        <label htmlFor="password">Password:</label> <br />
        <input
          id="password"
          type="password"
          value={loginPassword}
          onChange={(event) => setLoginPassword(event.target.value)}
        />
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(`Email: ${loginEmail}\nPassword: ${loginPassword}`);
            sendLoginRequest();
            setActualRole();
            //routeToRole();
          }}
        >
          Login
        </button>
      </form>

      <button onClick={clearLocalStorages}>Clear storage</button>

      <style jsx>
        {`
          .login-form {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            padding: 10px;
            margin: 20px;
          }
          label {
            padding: 10px;
          }
          input {
            padding: 15px;
            margin: 10px;
            border-radius: 30px;
            border: 2px solid transparent;
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

/* i need someting like this, but in next, not in vue */
/* 
onMounted(() => {
  const email = sessionStorage.getItem('email')
  const password = sessionStorage.getItem('password')

  if (email === 'admin' && password === 'admin') {
    router.push('/')
  } else {
    router.push('/login')
  }
})
*/
