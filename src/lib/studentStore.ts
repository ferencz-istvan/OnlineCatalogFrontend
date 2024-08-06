import { headers } from "next/headers";
import { create } from "zustand";

type Student = {
  id: number;
  name: string;
  class_id: number;
  parent_id: number;
  adress: string;
  user_id: number;
};

type StudentStore = {
  students: Student[];
  getSudents: () => Promise<void>;
};

export const useStudentStore = create<StudentStore>((set) => ({
  students: [],
  getSudents: async () => {
    const accessToken = localStorage.getItem("accessToken") as string;
    try {
      const response = await fetch("http://localhost:3000/students", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      set({ students: data });
    } catch (error) {
      console.error(error);
    }
  },
}));
