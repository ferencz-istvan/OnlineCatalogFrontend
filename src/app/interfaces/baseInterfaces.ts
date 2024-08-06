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

export type { Note, Absence, Student };
