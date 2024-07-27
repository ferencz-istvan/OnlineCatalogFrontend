import { create } from "zustand";
import { useState, useEffect } from "react";
import { headers } from "next/headers";

export interface User {
  user_id: number;
  role: string;
  email: string;
  username: string;
  password: string;
}

export interface Student {
  id: number;
  name: string;
  class_id: number;
  parent_id: number;
  address: string;
  user_id: number;
  class_name: string;
  parent_name: string;
}

export interface Parent {
  id: number;
  name: string;
  user_id: number;
  phone_number: string;
}

export interface Teacher {
  id: number;
  name: string;
  user_id: number;
}

type userPublicData = {
  actual_user: Partial<User> | null;
  actual_role: Teacher | Parent | Student | null;
  logged: boolean;
  getTestFunction: () => Promise<void>;
  clearLocalStorage: () => void;
  setActualRole: () => Promise<void>;
};

const ssrFriendlyStorage = {
  getItem: (key: string) => {
    if (typeof window != "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string) => {
    if (typeof window != "undefined") {
      localStorage.setItem(key, value);
    }
  },
  clear: () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
  },
};

export const useUserPublicData = create<userPublicData>((set) => ({
  //actual_user: localStorage.getItem("actual_user")
  //ssrFriendlyStorage insted localStorage
  actual_user: ssrFriendlyStorage.getItem("actual_user")
    ? (JSON.parse(
        ssrFriendlyStorage.getItem("actual_user") as string
      ) as Partial<User> | null)
    : null,
  actual_role: ssrFriendlyStorage.getItem("actual_role")
    ? (JSON.parse(ssrFriendlyStorage.getItem("actual_role") as string) as
        | Teacher
        | Parent
        | Student
        | null)
    : null,
  logged: false,
  getTestFunction: async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("just an example for an async function");
  },
  clearLocalStorage: () => {
    ssrFriendlyStorage.clear();
  },
  setActualRole: async () => {
    console.log("set actual role");
    if (!localStorage.getItem("actual_user")) {
      return;
    }

    let roleText: string;
    const actualUser = JSON.parse(
      localStorage.getItem("actual_user") as string
    ) as Partial<User> | null;

    const userId = actualUser?.user_id;
    //console.log(userId);
    //console.log(actualUser?.role);
    switch (actualUser?.role) {
      case "Student":
        roleText = "students";
        break;
      case "Parent":
        roleText = "parents";
        break;
      case "Teacher":
        roleText = "teachers";
        break;
      case "Admin":
        console.log("I AM ADMIN");
        return;
      default:
        return;
    }
    //console.log(roleText);

    try {
      const url = `http://localhost:3000/srcbyuser/${roleText}/${userId}`;
      console.log(url);
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      localStorage.setItem("actual_role", JSON.stringify(responseData));
      console.log(responseData);
    } catch (error) {
      console.error(error);
    }
  },
}));
/* 
const usePersistedUser = () => {
  const [user, setUser] = useState<Partial<User> | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return user;
};

const setActualUser = (fetchedUser: Partial<User>) => {
  useUserPublicData.setState({ actual_user: fetchedUser });
  usePersistedUser(fetchedUser);
};

const logActualUser = () => {
  const user = usePersistedUser();
  console.log("Actual user:");
  console.log(user);
};
 */
