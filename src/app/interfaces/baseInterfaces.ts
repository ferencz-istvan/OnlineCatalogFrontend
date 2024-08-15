//Define base interfaces:
interface Note {
  id: number;
  value: number;
  student_id: number;
  subject_id: number;
  date: string;
}

interface Absence {
  id: number;
  status: string;
  student_id: number;
  subject_id: number;
  date: string;
}

interface Student {
  id: number;
  name: string;
  class_id: number;
  parent_id: number;
  address: string;
}

interface Subject {
  id: number;
  description: string;
  name: string;
}
interface SchoolClass {
  id: number;
  name: string;
  grade: number;
  specialty: string;
  conductor_id: number;
}
interface Teacher {
  id: number;
  name: string;
  user_id: number;
}

interface Parent {
  id: number;
  name: string;
  phone_number: string;
  user_id: number;
}

/* interface User {
  user_id: number;
  role: string;
  email: string;
  username: string;
  Password: string;
} */

export type { Note, Absence, Student, Subject, SchoolClass, Teacher, Parent };
