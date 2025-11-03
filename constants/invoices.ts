import { Invoice } from "@/types";
import { StudentsData } from "./students.data";

export const invoices: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    student: StudentsData[0],
    subject: "Advanced React Development",
    issueDate: "20-01-2024",
    dueDate: "24-01-2024",
    currency: "EGP",
    description: "Course enrollment fee for Advanced React Development.",
    items: [
      {
        courseId: "react-adv-101",
        quantity: 1,
        price: 1250,
        title: "Advanced React Development Course",
        image: "/courses/react-advanced.jpg",
        taxRate: 10,
      },
    ],
    subtotal: 1250,
    tax: 125, // 10% of subtotal
    discount: 5, // 5%
    total: 1250 + 125 - (1250 * 5) / 100, // 1250 + 125 - 62.5 = 1312.5
    status: "Pending",
  },
  {
    id: "2",
    invoiceNumber: "INV-2024-002",
    student: StudentsData[0],
    subject: "TypeScript Fundamentals",
    issueDate: "15-01-2024",
    dueDate: "30-01-2024",
    currency: "EGP",
    description: "Course registration for TypeScript Fundamentals.",
    items: [
      {
        courseId: "ts-fund-201",
        quantity: 1,
        price: 950,
        title: "TypeScript Fundamentals Course",
        image: "/courses/typescript.jpg",
        taxRate: 10,
      },
    ],
    subtotal: 950,
    tax: 95,
    discount: 10,
    total: 950 + 95 - (950 * 10) / 100, // = 950 + 95 - 95 = 950
    status: "Paid",
  },
  {
    id: "3",
    invoiceNumber: "INV-2024-003",
    student: StudentsData[2],
    subject: "Next.js Masterclass",
    issueDate: "10-01-2024",
    dueDate: "25-01-2024",
    currency: "EGP",
    description: "Advanced web development course: Next.js Masterclass.",
    items: [
      {
        courseId: "nextjs-master-301",
        quantity: 1,
        price: 1500,
        title: "Next.js Masterclass Course",
        image: "/courses/nextjs.jpg",
        taxRate: 10,
      },
    ],
    subtotal: 1500,
    tax: 150,
    discount: 5,
    total: 1500 + 150 - (1500 * 5) / 100, // = 1500 + 150 - 75 = 1575
    status: "Pending",
  },
  {
    id: "4",
    invoiceNumber: "INV-2024-004",
    student: StudentsData[1],
    subject: "Tailwind CSS Workshop",
    issueDate: "05-01-2024",
    dueDate: "20-01-2024",
    currency: "EGP",
    description: "CSS framework training: Tailwind CSS Workshop.",
    items: [
      {
        courseId: "tailwind-401",
        quantity: 1,
        price: 750,
        title: "Tailwind CSS Workshop",
        image: "/courses/tailwind.jpg",
        taxRate: 10,
      },
    ],
    subtotal: 750,
    tax: 75,
    discount: 0,
    total: 750 + 75 - 0,
    status: "Cancelled",
  },
];
