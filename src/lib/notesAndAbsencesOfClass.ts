import { create } from "zustand";
import type { Note, Absence, Student } from "@/app/interfaces/baseInterfaces";

const NotesOfClass = async (classId: number, subjectId: number) => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(
    `http://localhost:3000/notes/ofClass/${classId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        subject_id: subjectId,
      }),
    }
  );
  const data = await response.json();
  return data;
};
const AbsencesOfClass = async (classId: number, subjectId: number) => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(
    `http://localhost:3000/absences/ofClass/${classId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        subject_id: subjectId,
      }),
    }
  );
  const data = await response.json();
  return data;
};

interface NotesAndAbsencesOfClass {
  classId: number;
  className: string;
  subjectId: number;
  subjectName: string;
  notesOfClass: Note[];
  studentsOfClass: Student[];
  absencesOfClass: Absence[];
  setClassId: (newValue: number) => void;
  setClassName: (newValue: string) => void;
  setSubjectId: (newValue: number) => void;
  setSubjectName: (newValue: string) => void;
  setNotesOfClass: (classId: number, subjectId: number) => Promise<void>;
  setAbsencesOfClass: (classId: number, subjectId: number) => Promise<void>;
  setStudentsOfClass: (newValue: Student[]) => void;
}

const useNotesAndAbsencesOfClassStore = create<NotesAndAbsencesOfClass>(
  (set) => ({
    classId: 0,
    className: "",
    subjectId: 0,
    subjectName: "",
    notesOfClass: [],
    studentsOfClass: [],
    absencesOfClass: [],
    setClassId: (newValue: number) => set({ classId: newValue }),
    setClassName: (newValue: string) => set({ className: newValue }),
    setSubjectId: (newValue: number) => set({ subjectId: newValue }),
    setSubjectName: (newValue: string) => set({ subjectName: newValue }),
    setNotesOfClass: async (classId: number, subjectId: number) => {
      try {
        const notes = await NotesOfClass(classId, subjectId);
        set({ notesOfClass: notes });
      } catch (error) {
        console.error(error);
        // handle error here
      }
    },
    setAbsencesOfClass: async (classId: number, subjectId: number) => {
      try {
        const absences = await AbsencesOfClass(classId, subjectId);
        set({ absencesOfClass: absences });
      } catch (error) {
        console.error(error);
      }
    },
    setStudentsOfClass: (newValue: Student[]) =>
      set({ studentsOfClass: newValue }),
  })
);

export default useNotesAndAbsencesOfClassStore;
