import { InstructorType, StudentProfile } from "./../types/courses";

export const StudentsData: StudentProfile[] = [
  {
    id: "1",
    studentId: "EG-001",
    name: "Ahmed Mohamed",
    email: "ahmed.m@student.edu",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    phone: "+201234567891",
    country: "Cairo, Egypt",
    state: "Cairo, Egypt",
    joinDate: "15-03-2022",
    type: "Medical",
    enrolledCourses: 5,
    revenue: 2000,
    completedCourses: 3,
    gradeAverage: "A",
    accountManager: "Dr. Sarah Johnson",
    isActive: true,
    isTopPerformer: true,
    info: "Medical Student | Aspiring Cardiologist",
    education: "MBBS, Cairo University",
    age: 24,
    status: "active",
    certificates: [
      {
        title: "Basic Life Support Certification",
        source: "Egyptian Medical Association",
      },
      {
        title: "Medical Terminology Certificate",
        source: "MedAcademy Online",
      },
    ],
    specializations: ["Cardiology", "Internal Medicine"],
    languages: ["Arabic", "English"],
    yearOfStudy: 3,
    details:
      "Dedicated medical student with particular interest in cardiovascular health. Active participant in university research projects.",
    performanceReviews: [
      {
        instructor: {
          name: "Dr. Sarah Johnson",
          image: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        content:
          "Ahmed shows exceptional promise in clinical reasoning and patient care skills.",
        rating: 5,
      },
      {
        instructor: {
          name: "Prof. Ali Hassan",
          image: "https://randomuser.me/api/portraits/men/45.jpg",
        },
        content:
          "Consistently delivers high-quality work and demonstrates deep understanding of complex concepts.",
        rating: 4,
      },
    ],
    gender: "male",
    speciality: "Cybersecurity",
    category: "category E",
    amount: 40,
  },
  {
    id: "2",
    studentId: "EG-002",
    name: "Yuki Tanaka",
    email: "y.tanaka@techstudent.jp",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    phone: "+819012345678",
    country: "Tokyo, Japan",
    state: "Tokyo, Japan",
    joinDate: "22-09-2021",
    type: "Technology",
    enrolledCourses: 8,
    revenue: 6000,
    completedCourses: 6,
    gradeAverage: "A+",
    accountManager: "Prof. David Chen",
    isActive: true,
    isTopPerformer: true,
    info: "Computer Science Student | AI Enthusiast",
    education: "BSc Computer Science, University of Tokyo",
    age: 21,
    status: "active",
    certificates: [
      {
        title: "Machine Learning Fundamentals",
        source: "DeepLearning.AI",
      },
      {
        title: "Cloud Computing Basics",
        source: "Google Cloud",
      },
    ],
    specializations: ["Artificial Intelligence", "Data Science"],
    languages: ["Japanese", "English"],
    yearOfStudy: 2,
    details:
      "Passionate about applying machine learning to solve real-world problems. Developed several award-winning projects in natural language processing.",
    performanceReviews: [
      {
        instructor: {
          name: "Prof. David Chen",
          image: "https://randomuser.me/api/portraits/men/75.jpg",
        },
        content:
          "Yuki's projects demonstrate creativity and technical excellence beyond her years.",
        rating: 5,
      },
      {
        instructor: {
          name: "Dr. Emily Wong",
          image: "https://randomuser.me/api/portraits/women/33.jpg",
        },
        content:
          "Exceptional problem-solving skills and always willing to help classmates.",
        rating: 5,
      },
    ],
    gender: "female",
    speciality: "Cybersecurity",
    category: "category E",
    amount: 40,
  },
  {
    id: "3",
    studentId: "EG-003",
    name: "Carlos Mendez",
    email: "c.mendez@langstudent.mx",
    avatar: "https://randomuser.me/api/portraits/men/68.jpg",
    phone: "+525512345679",
    country: "Mexico City, Mexico",
    state: "Mexico City, Mexico",
    joinDate: "05-11-2020",
    type: "Language",
    enrolledCourses: 4,
    revenue: 4000,
    completedCourses: 4,
    gradeAverage: "B+",
    accountManager: "Maria Gonzalez",
    isActive: true,
    isTopPerformer: false,
    info: "Linguistics Student | Polyglot",
    education: "BA Linguistics, UNAM",
    age: 23,
    status: "active",
    certificates: [
      {
        title: "DELE B2 Spanish Certification",
        source: "Instituto Cervantes",
      },
      {
        title: "TESOL Foundation Certificate",
        source: "Arizona State University",
      },
    ],
    specializations: ["Spanish Instruction", "Translation"],
    languages: ["Spanish", "English", "French", "German"],
    yearOfStudy: 4,
    details:
      "Specializing in second language acquisition with focus on teaching methodologies. Fluent in four languages.",
    performanceReviews: [
      {
        instructor: {
          name: "Maria Gonzalez",
          image: "https://randomuser.me/api/portraits/women/28.jpg",
        },
        content:
          "Carlos has an exceptional ear for language nuances and shows great teaching potential.",
        rating: 4,
      },
      {
        instructor: {
          name: "Prof. Jean Dupont",
          image: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        content:
          "Strong analytical skills when comparing language structures across different systems.",
        rating: 4,
      },
    ],
    gender: "male",
    speciality: "Cybersecurity",
    category: "category E",
    amount: 40,
  },
  {
    id: "4",
    studentId: "EG-004",
    name: "Amina Diallo",
    email: "a.diallo@healthstudent.sn",
    avatar: "https://randomuser.me/api/portraits/women/87.jpg",
    phone: "+221701234567",
    country: "Dakar, Senegal",
    state: "Dakar, Senegal",
    joinDate: "18-06-2023",
    type: "Public Health",
    enrolledCourses: 3,
    revenue: 1500,
    completedCourses: 1,
    gradeAverage: "B",
    accountManager: "Dr. Kwame Nkrumah",
    isActive: false,
    isTopPerformer: false,
    info: "Public Health Student | Community Volunteer",
    education: "BSc Public Health, Cheikh Anta Diop University",
    age: 25,
    status: "onLeave",
    certificates: [
      {
        title: "Community Health Worker Certification",
        source: "Ministry of Health, Senegal",
      },
    ],
    specializations: ["Community Health", "Disease Prevention"],
    languages: ["French", "Wolof", "English"],
    yearOfStudy: 2,
    details:
      "Passionate about improving health outcomes in rural communities. Currently on leave for field work in southern Senegal.",
    performanceReviews: [
      {
        instructor: {
          name: "Dr. Kwame Nkrumah",
          image: "https://randomuser.me/api/portraits/men/82.jpg",
        },
        content:
          "Amina demonstrates deep commitment to applying classroom knowledge to real community challenges.",
        rating: 4,
      },
    ],
    gender: "female",
    speciality: "Cybersecurity",
    category: "category E",
    amount: 40,
  },
  {
    id: "5",
    studentId: "EG10005",
    name: "Elena Petrov",
    email: "e.petrov@lawstudent.bg",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    phone: "+359881234567",
    country: "Sofia, Bulgaria",
    state: "Sofia, Bulgaria",
    joinDate: "30-01-2021",
    type: "Law",
    enrolledCourses: 6,
    revenue: 2000,
    completedCourses: 5,
    gradeAverage: "A-",
    accountManager: "Anna Kowalski",
    isActive: true,
    isTopPerformer: true,
    info: "Law Student | EU Policy Specialist",
    education: "LLB European Law, Sofia University",
    age: 22,
    status: "active",
    certificates: [
      {
        title: "EU Law Fundamentals",
        source: "College of Europe",
      },
      {
        title: "Legal Research Certification",
        source: "Sofia Bar Association",
      },
    ],
    specializations: ["EU Legislation", "Human Rights Law"],
    languages: ["Bulgarian", "English", "German"],
    yearOfStudy: 3,
    details:
      "Focusing on the intersection of EU law and human rights. Published two papers in student law journals.",
    performanceReviews: [
      {
        instructor: {
          name: "Anna Kowalski",
          image: "https://randomuser.me/api/portraits/women/53.jpg",
        },
        content:
          "Elena's analysis of recent CJEU rulings shows remarkable depth of understanding.",
        rating: 5,
      },
      {
        instructor: {
          name: "Prof. Hans Mueller",
          image: "https://randomuser.me/api/portraits/men/55.jpg",
        },
        content:
          "Exceptional ability to compare legal systems across different EU member states.",
        rating: 4,
      },
    ],
    gender: "female",
    speciality: "Cybersecurity",
    category: "category E",
    amount: 40,
  },
];

export const students = [
  {
    id: "1",
    name: "Laila Hassan",
    studentId: "8",
    pricePerLesson: "$18",
    joinDate: "March 15, 2021",
    prepaidBalance: "Prepaid",
    avatar:
      "https://img.freepik.com/free-photo/young-woman-smiling-outdoor_144627-31088.jpg",
    status: "Approved",
    info: "Pharmacist | Health Educator | 10+ Years Teaching",
    country: "cairo , egypt",
    age: 23,
    education: "Masters of Dentistry",
  },
  {
    id: "2",
    name: "Omar Khaled",
    studentId: "9",
    pricePerLesson: "$22",
    joinDate: "July 22, 2022",
    prepaidBalance: "No Prepaid",
    avatar:
      "https://img.freepik.com/free-photo/handsome-man-smiling-outdoor_144627-30455.jpg",
    status: "Approved",
    info: "Pharmacist | Health Educator | 10+ Years Teaching",
    country: "cairo , egypt",
    age: 23,
    education: "Masters of Dentistry",
  },
  {
    id: "3",
    name: "Sarah Mostafa",
    studentId: "10",
    pricePerLesson: "$16",
    joinDate: "January 5, 2020",
    prepaidBalance: "Prepaid",
    avatar:
      "https://img.freepik.com/free-photo/beautiful-woman-smiling-nature_144627-30144.jpg",
    status: "Approved",
    info: "Pharmacist | Health Educator | 10+ Years Teaching",
    country: "cairo , egypt",
    age: 23,
    education: "Masters of Dentistry",
  },
  {
    id: "4",
    name: "Tarek Mahmoud",
    studentId: "11",
    pricePerLesson: "$19",
    joinDate: "October 10, 2023",
    prepaidBalance: "No Prepaid",
    avatar:
      "https://img.freepik.com/free-photo/smiling-man-sitting-park_144627-30288.jpg",
    status: "Approved",
    info: "Pharmacist | Health Educator | 10+ Years Teaching",
    age: 23,
    education: "Masters of Dentistry",
  },
  {
    id: "5",
    name: "Nadine Adel",
    studentId: "12",
    pricePerLesson: "$14",
    joinDate: "May 30, 2021",
    prepaidBalance: "Prepaid",
    avatar:
      "https://img.freepik.com/free-photo/happy-woman-smiling-sunny-day_144627-30622.jpg",
    status: "Approved",
    info: "Pharmacist | Health Educator | 10+ Years Teaching",
    country: "cairo , egypt",
    age: 23,
    education: "Masters of Dentistry",
  },
  {
    id: "6",
    name: "Hassan Youssef",
    studentId: "13",
    pricePerLesson: "$25",
    joinDate: "August 14, 2019",
    prepaidBalance: "No Prepaid",
    avatar:
      "https://img.freepik.com/free-photo/man-glasses-smiling-outdoor_144627-30912.jpg",
    status: "Approved",
    info: "Pharmacist | Health Educator | 10+ Years Teaching",
    country: "cairo , egypt",
    age: 23,
    education: "Masters of Dentistry",
  },
  {
    id: "7",
    name: "Rana Saeed",
    studentId: "14",
    pricePerLesson: "$17",
    joinDate: "December 1, 2022",
    prepaidBalance: "Prepaid",
    avatar:
      "https://img.freepik.com/free-photo/young-woman-smiling-park_144627-30460.jpg",
    status: "Approved",
    info: "Pharmacist | Health Educator | 10+ Years Teaching",
    country: "cairo , egypt",
    age: 23,
    education: "Masters of Dentistry",
  },
];

// live Courses student data
export const LiveStudents = [
  {
    name: "Heba Ahmed",
    studentId: "1",
    courseName: "Biology Basics",
    joinDate: "March 15, 2021",
    prepaidBalance: "Prepaid",
    category: "Biological Sciences",
    imageUrl:
      "https://img.freepik.com/free-photo/portrait-young-woman-smiling_144627-30107.jpg",
  },
  {
    name: "Ahmed Ali",
    studentId: "2",
    courseName: "Physics 101",
    joinDate: "May 10, 2022",
    prepaidBalance: "Prepaid",
    category: "Physical Sciences",
    imageUrl:
      "https://img.freepik.com/free-photo/portrait-young-smiling-man_144627-30501.jpg",
  },
  {
    name: "Eslam Mohamed",
    studentId: "3",
    courseName: "Advanced Mathematics",
    joinDate: "July 7, 2023",
    prepaidBalance: "No Prepaid",
    category: "Mathematics",
    imageUrl:
      "https://img.freepik.com/free-photo/cheerful-young-man-looking-camera_144627-29213.jpg",
  },
  {
    name: "Sarah Khaled",
    studentId: "4",
    courseName: "Computer Science Fundamentals",
    joinDate: "April 20, 2020",
    prepaidBalance: "Prepaid",
    category: "Technology",
    imageUrl:
      "https://img.freepik.com/free-photo/young-woman-smiling-happy-expression_144627-25475.jpg",
  },
  {
    name: "Omar Youssef",
    studentId: "5",
    courseName: "Business Management",
    joinDate: "September 1, 2019",
    prepaidBalance: "No Prepaid",
    category: "Business",
    imageUrl:
      "https://img.freepik.com/free-photo/young-businessman-smiling-office_144627-28880.jpg",
  },
  {
    name: "Layla Hassan",
    studentId: "6",
    courseName: "Psychology of Learning",
    joinDate: "November 25, 2021",
    prepaidBalance: "Prepaid",
    category: "Psychology",
    imageUrl:
      "https://img.freepik.com/free-photo/portrait-happy-young-woman-smiling_144627-30300.jpg",
  },
  {
    name: "Kareem Nassar",
    studentId: "7",
    courseName: "Medical Ethics",
    joinDate: "February 14, 2023",
    prepaidBalance: "No Prepaid",
    category: "Medical Studies",
    imageUrl:
      "https://img.freepik.com/free-photo/confident-young-man-posing_144627-31205.jpg",
  },
];

export const RecourdedStudents = [
  {
    name: "Mariam Adel",
    studentId: "8",
    courseName: "Artificial Intelligence",
    joinDate: "June 12, 2021",
    prepaidBalance: "Prepaid",
    category: "Computer Science",
    imageUrl:
      "https://img.freepik.com/free-photo/portrait-beautiful-young-woman_144627-33498.jpg",
  },
  {
    name: "Mohamed Tarek",
    studentId: "9",
    courseName: "Marketing Strategies",
    joinDate: "October 5, 2022",
    prepaidBalance: "No Prepaid",
    category: "Business & Marketing",
    imageUrl:
      "https://img.freepik.com/free-photo/smiling-man-posing-studio_144627-29211.jpg",
  },
  {
    name: "Yasmin Khalil",
    studentId: "10",
    courseName: "Nutrition & Dietetics",
    joinDate: "January 8, 2020",
    prepaidBalance: "Prepaid",
    category: "Health & Wellness",
    imageUrl:
      "https://img.freepik.com/free-photo/beautiful-woman-smiling-outdoor_144627-29888.jpg",
  },
  {
    name: "Hassan Mostafa",
    studentId: "11",
    courseName: "Data Science",
    joinDate: "April 18, 2023",
    prepaidBalance: "No Prepaid",
    category: "Technology",
    imageUrl:
      "https://img.freepik.com/free-photo/young-man-smiling-studio_144627-29220.jpg",
  },
  {
    name: "Rana Sameh",
    studentId: "12",
    courseName: "Philosophy of Mind",
    joinDate: "August 23, 2021",
    prepaidBalance: "Prepaid",
    category: "Philosophy",
    imageUrl:
      "https://img.freepik.com/free-photo/young-woman-casual-clothing-smiling_144627-30302.jpg",
  },
  {
    name: "Nour El-Din",
    studentId: "13",
    courseName: "Astronomy & Space Science",
    joinDate: "March 10, 2019",
    prepaidBalance: "No Prepaid",
    category: "Astronomy",
    imageUrl:
      "https://img.freepik.com/free-photo/young-man-posing-outdoor_144627-31050.jpg",
  },
  {
    name: "Lina Saeed",
    studentId: "14",
    courseName: "Creative Writing",
    joinDate: "May 29, 2022",
    prepaidBalance: "Prepaid",
    category: "Literature",
    imageUrl:
      "https://img.freepik.com/free-photo/happy-woman-smiling-studio_144627-30099.jpg",
  },
];

// instructors data
export const instructorsData: InstructorType[] = [
  {
    name: "Ahmed Hamed",
    image:
      "https://img.freepik.com/free-photo/happy-woman-smiling-studio_144627-30099.jpg",
    rating: 4.5,
    coursesType: ["Live", "Recorded", "Offline"],
    achievement: 120,
    certificate: 55,
  },
  {
    name: "Sara Youssef",
    image:
      "https://img.freepik.com/free-photo/young-woman-smiling-park_144627-30460.jpg",
    rating: 5,
    coursesType: ["Live", "Offline"],
    achievement: 200,
    certificate: 80,
  },
  {
    name: "Omar Khaled",
    image:
      "https://img.freepik.com/free-photo/smiling-man-sitting-park_144627-30288.jpg",
    rating: 4.2,
    coursesType: ["Live", "Recorded"],
    achievement: 90,
    certificate: 40,
  },
  {
    name: "Nadine Adel",
    image:
      "https://img.freepik.com/free-photo/happy-woman-smiling-sunny-day_144627-30622.jpg",
    rating: 4.8,
    coursesType: ["Recorded", "Offline"],
    achievement: 150,
    certificate: 60,
  },
  {
    name: "Mohamed Tarek",
    image:
      "https://img.freepik.com/free-photo/man-glasses-smiling-outdoor_144627-30912.jpg",
    rating: 4.6,
    coursesType: ["Live"],
    achievement: 130,
    certificate: 75,
  },
  {
    name: "Laila Hassan",
    image:
      "https://img.freepik.com/free-photo/young-woman-smiling-outdoor_144627-31088.jpg",
    rating: 4.9,
    coursesType: ["Live", "Recorded"],
    achievement: 180,
    certificate: 90,
  },
  {
    name: "Hassan Youssef",
    image:
      "https://img.freepik.com/free-photo/man-smiling-outdoor_144627-30455.jpg",
    rating: 4.3,
    coursesType: ["Offline"],
    achievement: 85,
    certificate: 30,
  },
  {
    name: "Rana Saeed",
    image:
      "https://img.freepik.com/free-photo/beautiful-woman-smiling-nature_144627-30144.jpg",
    rating: 5,
    coursesType: ["Live", "Recorded", "Offline"],
    achievement: 210,
    certificate: 100,
  },
];
