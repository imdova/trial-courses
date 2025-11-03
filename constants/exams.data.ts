import { Exams } from "@/types/exams";

export const ExamsData: Exams[] = [
  {
    id: "1",
    images: [
      "https://img.freepik.com/free-photo/serious-student-working-laptop-preparing-exams_1163-3974.jpg?w=996",
      "https://img.freepik.com/free-photo/serious-student-working-laptop-preparing-exams_1163-3974.jpg?w=996",
      "https://img.freepik.com/free-photo/serious-student-working-laptop-preparing-exams_1163-3974.jpg?w=996",
    ],
    title: "Internal Medicine MCQ Prometric Exam",
    category: {
      id: "cat-1",
      title: "Doctors",
      image:
        "https://img.freepik.com/free-photo/medical-stethoscope-with-red-paper-heart-blue-background_23-2147872343.jpg?w=740",
      slug: "doctors",
    },
    authority: {
      name: "SCFHS",
      image:
        "https://img.freepik.com/free-photo/smiling-woman-posing-outdoors_23-2148211695.jpg?w=740",
    },
    qustions: 1800,
    exam_date: "2023 - 2024 - 2025",
    providers: 20,
    price: 1500,
    discountedPrice: 1200,
    stock: 50,
    description:
      "Comprehensive exam covering all aspects of internal medicine.",
    rating: 4.5,
    reviewCount: 120,
    bankOffers: [
      { title: "10% off with Visa", url: "/offers/visa" },
      { title: "5% cashback with MasterCard", url: "/offers/mastercard" },
    ],
    sellers: {
      id: "seller1",
      name: "MediPro Official Store",
      rating: 4.8,
      positiveRatings: "94%",
      partnerSince: "2018",
      returnPolicy: "30 days return policy",
      itemShown: 90,
      status: "active",
      isActive: false,
    },
    highlights: ["1800 MCQs", "Latest guidelines", "Expert-reviewed content"],
    overview_desc:
      "This exam package prepares doctors for the SCFHS Internal Medicine licensing exam.",
    specifications: [
      { label: "Format", content: "Multiple Choice Questions" },
      { label: "Duration", content: "3 hours" },
      { label: "Attempts", content: "Unlimited within subscription" },
    ],
    nudges: [
      "📌 Bestseller among doctors",
      "🔥 Updated for 2025 guidelines",
      "⚡ Includes 3 full-length mock exams",
    ],
  },
  {
    id: "2",
    images: [
      "https://img.freepik.com/free-photo/male-student-writing-desk_23-2148036347.jpg?w=996",
      "https://img.freepik.com/free-photo/male-student-writing-desk_23-2148036347.jpg?w=996",
      "https://img.freepik.com/free-photo/male-student-writing-desk_23-2148036347.jpg?w=996",
    ],
    title: "Dentistry Board Exam",
    category: {
      id: "cat-2",
      title: "Dentists",
      image:
        "https://img.freepik.com/free-photo/dentist-tools_23-2148015632.jpg?w=740",
      slug: "dentists",
    },
    authority: {
      name: "DHA",
      image:
        "https://img.freepik.com/free-photo/young-man-posing-outside_23-2148891732.jpg?w=740",
    },
    qustions: 1500,
    exam_date: "2023 - 2024 - 2025",
    providers: 15,
    price: 1300,
    discountedPrice: 1100,
    stock: 40,
    description: "Covers all dentistry board exam topics.",
    rating: 4.3,
    reviewCount: 95,
    bankOffers: [
      { title: "3 months installments at 0% interest", url: "#" },
      { title: "Free embroidery available", url: "#" },
    ],
    sellers: {
      id: "seller1",
      name: "MediPro Official Store",
      rating: 4.8,
      positiveRatings: "94%",
      partnerSince: "2018",
      returnPolicy: "30 days return policy",
      itemShown: 90,
      status: "active",
      isActive: false,
    },
    highlights: ["1500 MCQs", "Practice & Mock Exams", "Updated for 2025"],
    overview_desc:
      "This board exam prep is tailored for dentists seeking DHA licensing.",
    specifications: [
      { label: "Format", content: "MCQ + Case Studies" },
      { label: "Duration", content: "2.5 hours" },
    ],
    nudges: [
      "📌 Bestseller among doctors",
      "🔥 Updated for 2025 guidelines",
      "⚡ Includes 3 full-length mock exams",
    ],
  },
  {
    id: "3",
    images: [
      "https://img.freepik.com/free-photo/young-woman-studying-library_23-2148890854.jpg?w=996",
      "https://img.freepik.com/free-photo/young-woman-studying-library_23-2148890854.jpg?w=996",
      "https://img.freepik.com/free-photo/young-woman-studying-library_23-2148890854.jpg?w=996",
    ],
    title: "Pharmacy Licensure Exam",
    category: {
      id: "cat-3",
      title: "Pharmacists",
      image:
        "https://img.freepik.com/free-photo/close-up-pills-spoon_23-2148618703.jpg?w=740",
      slug: "pharmacists",
    },
    authority: {
      name: "MOH",
      image:
        "https://img.freepik.com/free-photo/smiling-businesswoman-glasses_23-2148893125.jpg?w=740",
    },
    qustions: 1600,
    exam_date: "2023 - 2024 - 2025",
    providers: 18,
    price: 1400,
    discountedPrice: 1150,
    stock: 60,
    description: "Pharmacy exam covering clinical and pharmaceutical sciences.",
    rating: 4.6,
    reviewCount: 88,
    bankOffers: [
      { title: "3 months installments at 0% interest", url: "#" },
      { title: "Free embroidery available", url: "#" },
    ],
    sellers: {
      id: "seller1",
      name: "MediPro Official Store",
      rating: 4.8,
      positiveRatings: "94%",
      partnerSince: "2018",
      returnPolicy: "30 days return policy",
      itemShown: 90,
      status: "active",
      isActive: false,
    },
    highlights: ["1600 MCQs", "Clinical focus", "Detailed explanations"],
    overview_desc: "Comprehensive pharmacy licensing exam preparation.",
    specifications: [
      { label: "Format", content: "MCQ" },
      { label: "Duration", content: "3 hours" },
    ],
    nudges: [
      "📌 Bestseller among doctors",
      "🔥 Updated for 2025 guidelines",
      "⚡ Includes 3 full-length mock exams",
    ],
  },
  {
    id: "4",
    images: [
      "https://img.freepik.com/free-photo/student-preparing-exam-home_23-2149067175.jpg?w=996",
      "https://img.freepik.com/free-photo/student-preparing-exam-home_23-2149067175.jpg?w=996",
      "https://img.freepik.com/free-photo/student-preparing-exam-home_23-2149067175.jpg?w=996",
    ],
    title: "Nursing Certification Exam",
    category: {
      id: "cat-4",
      title: "Nurses",
      image:
        "https://img.freepik.com/free-photo/portrait-smiling-nurse_23-2147846181.jpg?w=740",
      slug: "nurses",
    },
    authority: {
      name: "NCLEX",
      image:
        "https://img.freepik.com/free-photo/doctor-smiling-camera_23-2149072891.jpg?w=740",
    },
    qustions: 1700,
    exam_date: "2023 - 2024 - 2025",
    providers: 22,
    price: 1450,
    discountedPrice: 1250,
    stock: 30,
    description: "NCLEX-style nursing certification preparation.",
    rating: 4.7,
    reviewCount: 150,
    bankOffers: [
      { title: "3 months installments at 0% interest", url: "#" },
      { title: "Free embroidery available", url: "#" },
    ],
    sellers: {
      id: "seller1",
      name: "MediPro Official Store",
      rating: 4.8,
      positiveRatings: "94%",
      partnerSince: "2018",
      returnPolicy: "30 days return policy",
      itemShown: 90,
      status: "active",
      isActive: false,
    },
    highlights: ["1700 MCQs", "NCLEX-style", "Adaptive testing"],
    overview_desc:
      "Specialized nursing exam prep designed to meet NCLEX standards.",
    specifications: [
      { label: "Format", content: "Adaptive MCQ" },
      { label: "Duration", content: "4 hours" },
    ],
    nudges: [
      "📌 Bestseller among doctors",
      "🔥 Updated for 2025 guidelines",
      "⚡ Includes 3 full-length mock exams",
    ],
  },
];
