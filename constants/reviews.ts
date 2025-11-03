import { Review } from "@/types/exams";

export const reviews: Review[] = [
  {
    id: "1",
    rating: 5,
    content: "Excellent product, very comfortable and stylish!",
    author: {
      id: "1",
      name: "Ahmed M.",
      imgUrl:
        "https://img.freepik.com/free-photo/young-woman-playing-with-her-hair_329181-3522.jpg",
    },
    date: "2025-05-20",
  },
  {
    id: "2",
    rating: 4,
    content: "Good value for the price. Could use some improvements.",
    author: {
      id: "2",
      name: "Sara B.",
      imgUrl:
        "https://img.freepik.com/free-photo/young-woman-playing-with-her-hair_329181-3522.jpg",
    },
    date: "2025-05-22",
  },
  {
    id: "3",
    rating: 3,
    content: "Average experience. The quality was okay, but shipping was slow.",
    author: {
      id: "3",
      name: "John K.",
      imgUrl:
        "https://img.freepik.com/free-photo/young-woman-playing-with-her-hair_329181-3522.jpg",
    },
    date: "2025-05-18",
  },
  {
    id: "4",
    rating: 2,
    content: "Not satisfied with the product. Poor customer service.",
    author: {
      id: "4",
      name: "Fatima S.",
      imgUrl: "",
    },
    date: "2025-05-15",
  },
  {
    id: "5",
    rating: 5,
    content: "Absolutely love it! High quality and very stylish.",
    author: {
      id: "5",
      name: "Omar R.",
      imgUrl:
        "https://img.freepik.com/free-photo/young-woman-playing-with-her-hair_329181-3522.jpg",
    },
    date: "2025-05-12",
  },
];
