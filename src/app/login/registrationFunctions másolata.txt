interface userParams {
  role: string;
  email: string;
  username: string;
  password: string;
  class_id?: string;
  parent_id?: number;
  address?: string;
  phone_number?: string;
}

export async function userRegistration(userParams: userParams) {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch("http://localhost:3000/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(userParams),
    });

    const data = await response.json();
    /*  if (data) {
      window.alert("Account created!");
    } */
  } catch (error) {
    console.error("Error creating user", error);
  }
}

export async function getUsers() {
  console.log("get users function called");
  const accessToken = localStorage.getItem("accessToken");
  try {
    const response = await fetch("http://localhost:3000/teachers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status:${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error creating user", error);
  }
}
