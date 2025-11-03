export interface Enrollment {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentPhotoUrl?: string;
  courseName: string;
  courseId: string;
  enrollmentDate: string;
  status: 'Active' | 'Completed' | 'Cancelled' | 'Pending';
  progress: number;
  completionDate?: string;
  grade?: number;
  instructor: string;
  category: string;
  duration: string;
  price: number;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
}

export const EnrollmentsData: Enrollment[] = [
  {
    id: "1",
    studentId: "STU001",
    studentName: "Ahmed Hassan",
    studentEmail: "ahmed.hassan@email.com",
    courseName: "Advanced Medical Procedures",
    courseId: "MED-101",
    enrollmentDate: "2024-01-15",
    status: "Active",
    progress: 75,
    instructor: "Dr. Sarah Johnson",
    category: "Medical",
    duration: "12 weeks",
    price: 299,
    paymentStatus: "Paid",
  },
  {
    id: "2",
    studentId: "STU002",
    studentName: "Fatima Al-Zahra",
    studentEmail: "fatima.alzahra@email.com",
    courseName: "Emergency Medicine Fundamentals",
    courseId: "MED-102",
    enrollmentDate: "2024-01-20",
    status: "Completed",
    progress: 100,
    completionDate: "2024-03-15",
    grade: 95,
    instructor: "Dr. Michael Chen",
    category: "Emergency Medicine",
    duration: "8 weeks",
    price: 199,
    paymentStatus: "Paid",
  },
  {
    id: "3",
    studentId: "STU003",
    studentName: "Omar Khalil",
    studentEmail: "omar.khalil@email.com",
    courseName: "Surgical Techniques",
    courseId: "SUR-201",
    enrollmentDate: "2024-02-01",
    status: "Active",
    progress: 45,
    instructor: "Dr. Emily Rodriguez",
    category: "Surgery",
    duration: "16 weeks",
    price: 599,
    paymentStatus: "Paid",
  },
  {
    id: "4",
    studentId: "STU004",
    studentName: "Layla Mahmoud",
    studentEmail: "layla.mahmoud@email.com",
    courseName: "Pediatric Care",
    courseId: "PED-301",
    enrollmentDate: "2024-02-10",
    status: "Pending",
    progress: 0,
    instructor: "Dr. James Wilson",
    category: "Pediatrics",
    duration: "10 weeks",
    price: 249,
    paymentStatus: "Pending",
  },
  {
    id: "5",
    studentId: "STU005",
    studentName: "Youssef Ibrahim",
    studentEmail: "youssef.ibrahim@email.com",
    courseName: "Cardiology Basics",
    courseId: "CAR-401",
    enrollmentDate: "2024-01-25",
    status: "Cancelled",
    progress: 20,
    instructor: "Dr. Lisa Anderson",
    category: "Cardiology",
    duration: "14 weeks",
    price: 399,
    paymentStatus: "Refunded",
  },
  {
    id: "6",
    studentId: "STU006",
    studentName: "Nour El-Din",
    studentEmail: "nour.eldin@email.com",
    courseName: "Nursing Fundamentals",
    courseId: "NUR-101",
    enrollmentDate: "2024-02-05",
    status: "Active",
    progress: 60,
    instructor: "Dr. Patricia Brown",
    category: "Nursing",
    duration: "6 weeks",
    price: 149,
    paymentStatus: "Paid",
  },
  {
    id: "7",
    studentId: "STU007",
    studentName: "Karim Abdel-Rahman",
    studentEmail: "karim.abdelrahman@email.com",
    courseName: "Radiology Interpretation",
    courseId: "RAD-201",
    enrollmentDate: "2024-01-30",
    status: "Completed",
    progress: 100,
    completionDate: "2024-04-15",
    grade: 88,
    instructor: "Dr. Robert Taylor",
    category: "Radiology",
    duration: "10 weeks",
    price: 349,
    paymentStatus: "Paid",
  },
  {
    id: "8",
    studentId: "STU008",
    studentName: "Mariam Hassan",
    studentEmail: "mariam.hassan@email.com",
    courseName: "Pharmacology Advanced",
    courseId: "PHA-301",
    enrollmentDate: "2024-02-15",
    status: "Active",
    progress: 30,
    instructor: "Dr. Jennifer Lee",
    category: "Pharmacology",
    duration: "12 weeks",
    price: 449,
    paymentStatus: "Paid",
  },
];
