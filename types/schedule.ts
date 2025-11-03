import { Instructor } from "./courses";

export type EventCalendar = {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  lecturer?: string;
  link?: string;
  owner?: string;
  progress?: number;
  total?: number;
  students?: { name: string; avatar: string }[];
  courseName?: string;
  instructor?: Instructor;
};
