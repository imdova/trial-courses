export interface Assignment {
  id: string;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  dueDate: string;
  dueTime: string;
  submissions: number;
  totalStudents: number;
  points: number;
  questions: number;
  status: 'active' | 'overdue' | 'upcoming' | 'completed';
  instructor: {
    id: string;
    name: string;
    email: string;
  };
  course: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: '1',
    title: 'fasfsaf',
    description: 'Assignment description',
    startDate: '10/10/2025',
    startTime: '12:00 AM',
    dueDate: '10/9/2025',
    dueTime: '11:59 PM',
    submissions: 0,
    totalStudents: 25,
    points: 10,
    questions: 10,
    status: 'overdue',
    instructor: {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@example.com'
    },
    course: {
      id: '1',
      name: 'Advanced Medical Course'
    },
    createdAt: '2025-01-15',
    updatedAt: '2025-01-15'
  },
  {
    id: '2',
    title: 'Research Methodology',
    description: 'Research methods and statistical analysis',
    startDate: '01/20/2025',
    startTime: '9:00 AM',
    dueDate: '01/25/2025',
    dueTime: '11:59 PM',
    submissions: 15,
    totalStudents: 30,
    points: 50,
    questions: 5,
    status: 'active',
    instructor: {
      id: '2',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@example.com'
    },
    course: {
      id: '2',
      name: 'Research Methods'
    },
    createdAt: '2025-01-10',
    updatedAt: '2025-01-15'
  },
  {
    id: '3',
    title: 'Clinical Case Study',
    description: 'Analyze and present clinical case studies',
    startDate: '02/01/2025',
    startTime: '8:00 AM',
    dueDate: '02/15/2025',
    dueTime: '11:59 PM',
    submissions: 0,
    totalStudents: 20,
    points: 75,
    questions: 3,
    status: 'upcoming',
    instructor: {
      id: '3',
      name: 'Dr. Emily Rodriguez',
      email: 'emily.rodriguez@example.com'
    },
    course: {
      id: '3',
      name: 'Clinical Medicine'
    },
    createdAt: '2025-01-20',
    updatedAt: '2025-01-20'
  }
];
