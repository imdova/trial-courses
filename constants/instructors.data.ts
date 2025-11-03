/* eslint-disable @typescript-eslint/no-explicit-any */
import { Instructor } from "@/types/courses";

export const instructors: Instructor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "s.johnson@medacademy.edu",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    phone: "+201234567890",
    country: "Cairo, Egypt",
    joinDate: "15-03-2018",
    type: "Academy",
    courses: 18,
    students: 950,
    revenu: "85000 EGP",
    accountManager: "Ahmed Mohamed",
    isActive: true,
    isTop: true,
    info: "Cardiologist | Medical Educator | 15+ Years Experience",
    education: "MD Cardiology, Cairo University",
    age: 42,
    status: "approved",
    reviews: 428,
    sales: 315,
    certificates: [
      {
        title: "Fellowship in Interventional Cardiology",
        source: "European Society of Cardiology",
      },
      {
        title: "Medical Education Leadership Certificate",
        source: "Stanford University",
      },
    ],
    qualifications: ["Cardiology", "Internal Medicine", "Echocardiography"],
    languages: ["Arabic", "English", "French"],
    experience: 15,
    details:
      "Senior cardiologist and medical educator with extensive experience in both clinical practice and academic teaching. Specializes in developing curriculum for medical students and residents.",
    reviews_content: [
      {
        user: {
          name: "Dr. Mahmoud Ali",
          image: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        content:
          "Dr. Johnson's courses transformed my approach to cardiac cases. The practical insights are invaluable.",
        rating: 5,
      },
      {
        user: {
          name: "Nurse Fatima Hassan",
          image: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        content:
          "Clear explanations and excellent case studies. Highly recommended for any medical professional.",
        rating: 5,
      },
    ],
    amount: 40,
  },
  {
    id: "2",
    name: "Prof. David Chen",
    email: "d.chen@techinstitute.com",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    phone: "+8613812345678",
    country: "Beijing, China",
    joinDate: "22-09-2020",
    type: "Corporate",
    courses: 9,
    students: 3200,
    revenu: "120000 EGP",
    accountManager: "Li Wei",
    isActive: true,
    isTop: true,
    info: "AI Researcher | Computer Science Professor",
    education: "PhD Computer Science, Tsinghua University",
    age: 38,
    status: "approved",
    reviews: 892,
    sales: 647,
    certificates: [
      {
        title: "Deep Learning Specialization",
        source: "DeepLearning.AI",
      },
      {
        title: "Cloud Architecture Professional",
        source: "Google Cloud",
      },
    ],
    qualifications: ["Machine Learning", "Neural Networks", "Data Science"],
    languages: ["Mandarin", "English"],
    experience: 12,
    details:
      "Leading researcher in artificial intelligence with multiple published papers. Focuses on making complex technical concepts accessible to professionals at all levels.",
    reviews_content: [
      {
        user: {
          name: "Software Engineer Raj Patel",
          image: "https://randomuser.me/api/portraits/men/68.jpg",
        },
        content:
          "Changed my entire approach to machine learning. The real-world project examples are gold.",
        rating: 5,
      },
      {
        user: {
          name: "Data Scientist Elena Petrova",
          image: "https://randomuser.me/api/portraits/women/33.jpg",
        },
        content:
          "Exceptional depth of knowledge combined with practical teaching methods.",
        rating: 4,
      },
    ],
    amount: 40,
  },
  {
    id: "3",
    name: "Maria Gonzalez",
    email: "m.gonzalez@languagehub.org",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    phone: "+525512345678",
    country: "Mexico City, Mexico",
    joinDate: "05-11-2019",
    type: "Freelance",
    courses: 6,
    students: 780,
    revenu: "45000 EGP",
    accountManager: "Carlos Ruiz",
    isActive: true,
    isTop: false,
    info: "Linguist | Language Coach | DELE Examiner",
    education: "MA Linguistics, UNAM",
    age: 34,
    status: "approved",
    reviews: 376,
    sales: 289,
    certificates: [
      {
        title: "DELE Superior Certification",
        source: "Instituto Cervantes",
      },
      {
        title: "TESOL Certification",
        source: "Arizona State University",
      },
    ],
    qualifications: [
      "Spanish Instruction",
      "Curriculum Development",
      "Bilingual Education",
    ],
    languages: ["Spanish", "English", "French", "Portuguese"],
    experience: 8,
    details:
      "Specializes in Spanish language instruction for professionals, with a focus on medical and business Spanish. Creates immersive learning experiences.",
    reviews_content: [
      {
        user: {
          name: "Dr. James Wilson",
          image: "https://randomuser.me/api/portraits/men/45.jpg",
        },
        content:
          "Perfect for medical professionals needing Spanish. The medical terminology focus is exactly what I needed.",
        rating: 5,
      },
      {
        user: {
          name: "Business Analyst Sofia Kim",
          image: "https://randomuser.me/api/portraits/women/12.jpg",
        },
        content:
          "Maria makes learning Spanish enjoyable and practical for business contexts.",
        rating: 4,
      },
    ],
    amount: 40,
  },
  {
    id: "4",
    name: "Dr. Kwame Nkrumah",
    email: "k.nkrumah@africahealth.edu",
    avatar: "https://randomuser.me/api/portraits/men/82.jpg",
    phone: "+233201234567",
    country: "Accra, Ghana",
    joinDate: "18-06-2021",
    type: "Academy",
    courses: 4,
    students: 210,
    revenu: "28000 EGP",
    accountManager: "Ama Boateng",
    isActive: false,
    isTop: false,
    info: "Public Health Specialist | Epidemiologist",
    education: "PhD Public Health, University of Ghana",
    age: 47,
    status: "pending",
    reviews: 132,
    sales: 98,
    certificates: [
      {
        title: "Global Health Certificate",
        source: "Harvard School of Public Health",
      },
      {
        title: "Infectious Disease Epidemiology",
        source: "Johns Hopkins University",
      },
    ],
    qualifications: ["Public Health", "Disease Prevention", "Health Policy"],
    languages: ["English", "French", "Twi"],
    experience: 14,
    details:
      "Focuses on public health education for African contexts, with special expertise in tropical diseases and community health strategies.",
    reviews_content: [
      {
        user: {
          name: "Community Health Worker Fatou Diallo",
          image: "https://randomuser.me/api/portraits/women/87.jpg",
        },
        content:
          "Dr. Nkrumah's approach to community health is transformative for African healthcare workers.",
        rating: 5,
      },
      {
        user: {
          name: "Medical Student Yusuf Bello",
          image: "https://randomuser.me/api/portraits/men/91.jpg",
        },
        content:
          "The most relevant public health course I've taken for our regional context.",
        rating: 4,
      },
    ],
    amount: 40,
  },
  {
    id: "5",
    name: "Anna Kowalski",
    email: "a.kowalski@europeanlaw.edu",
    avatar: "https://randomuser.me/api/portraits/women/53.jpg",
    phone: "+48123456789",
    country: "Warsaw, Poland",
    joinDate: "30-01-2022",
    type: "Corporate",
    courses: 7,
    students: 450,
    revenu: "52000 EGP",
    accountManager: "Piotr Nowak",
    isActive: true,
    isTop: true,
    info: "EU Law Expert | Legal Educator",
    education: "LLM European Law, University of Warsaw",
    age: 39,
    status: "approved",
    reviews: 287,
    sales: 210,
    certificates: [
      {
        title: "EU Competition Law Specialist",
        source: "College of Europe",
      },
      {
        title: "Data Protection Officer Certification",
        source: "IAPP",
      },
    ],
    qualifications: ["EU Legislation", "GDPR Compliance", "Legal Training"],
    languages: ["Polish", "English", "German", "French"],
    experience: 11,
    details:
      "Provides comprehensive training on European Union legislation with practical applications for businesses and legal professionals across member states.",
    reviews_content: [
      {
        user: {
          name: "Corporate Lawyer Henrik Johansson",
          image: "https://randomuser.me/api/portraits/men/23.jpg",
        },
        content:
          "Anna's GDPR course saved our company from potential compliance issues. Extremely practical.",
        rating: 5,
      },
      {
        user: {
          name: "Compliance Officer Sofia Papadopoulos",
          image: "https://randomuser.me/api/portraits/women/67.jpg",
        },
        content:
          "The clearest explanation of EU directives I've encountered in 10 years of practice.",
        rating: 5,
      },
    ],
    amount: 40,
  },
];

export const dummyInstructor: any = {
  "id": "c47b5ec4-c198-4c39-9fab-eb79234cd50a",
  "created_at": "2025-09-17T11:52:58.779Z",
  "updated_at": "2025-09-17T11:52:59.248Z",
  "deleted_at": null,
  "firstName": "mohamedd",
  "lastName": "araba",
  "userName": "mohamedd.araba-a94a8e82",
  "photoUrl": null,
  "phoneNumber": null,
  "hasWhatsapp": false,
  "phoneNumbertForWhatsapp": null,
  "dateOfBirth": null,
  "gender": null,
  "nationality": null,
  "maritalStatus": null,
  "hasDrivingLicense": false,
  "resumePath": null,
  "contactEmail": null,
  "linkedinUrl": null,
  "languages": null,
  "metadata": null,
  "isPublic": false,
  "user": {
    "id": "7ffb71c7-2a8a-48b9-b195-3efc82e97692",
    "created_at": "2025-09-17T11:52:58.281Z",
    "updated_at": "2025-09-17T12:56:25.409Z",
    "deleted_at": null,
    "email": "mad2@gmail.com",
    "role": "instructor"
  },
  "category": null,
  "speciality": null
}
