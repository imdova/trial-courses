import { EventType } from "@/types/courses";
import { EventCalendar } from "@/types/schedule";
import { instructors } from "./instructors.data";

export const eventsData: EventType[] = [
  {
    id: "1",
    title: "Echo Beats Festival",
    image:
      "https://img.freepik.com/free-vector/flat-linear-male-hand-with-watch-with-icons-website-vector-illustration_126523-2963.jpg",
    date: "May 20, 2029",
    time: "6:00 PM",
    location: "Sunset Park, Los Angeles, CA",
    ticketsSold: 21000,
    status: "active",
    totalTickets: 30000,
    category: "Music",
    ticketSoldPercentage: 70,
    price: 400,
    description: `The Echo Beats Festival brings together a stellar lineup of artists across EDM, pop, and hip-hop genres. Prepare to experience a night of electrifying music, vibrant light shows, and unforgettable performances under the stars. Explore food trucks, art installations, and VIP lounges for an elevated experience.`,
    terms: [
      {
        title: "Ticket Purchase and Entry",
        items: [
          "All attendees must possess a valid ticket for entry.",
          "Tickets are non-refundable and non-transferable unless specified by the event organizer.",
          "Attendees must present a valid government-issued ID along with their ticket at the gate.",
        ],
      },
      {
        title: "Security and Safety",
        items: [
          "Attendees are subject to security checks, including bag inspections, upon entry.",
          "Prohibited items include weapons, drugs, alcohol, fireworks, and other hazardous materials.",
          "The event organizer reserves the right to deny entry to individuals deemed a security risk.",
        ],
      },
      {
        title: "Code of Conduct",
        items: [
          "Attendees are expected to behave responsibly and respectfully toward others.",
        ],
      },
    ],
    merchandise: [
      {
        name: "Echo Beats Cap",
        price: "USD $20",
        image:
          "https://img.freepik.com/free-vector/linear-flat-line-art-style-time-is-money-business-concept-businessman-hourglass-holding-moneybags-stacks-dollar-coin-notes_126523-2545.jpg",
      },
      {
        name: "Festival T-Shirt",
        price: "USD $25",
        image:
          "https://img.freepik.com/free-vector/linear-flat-line-art-style-time-is-money-business-concept-businessman-hourglass-holding-moneybags-stacks-dollar-coin-notes_126523-2545.jpg",
      },
      {
        name: "Light-Up Wristband",
        price: "USD $15",
        image:
          "https://img.freepik.com/free-vector/linear-flat-line-art-style-time-is-money-business-concept-businessman-hourglass-holding-moneybags-stacks-dollar-coin-notes_126523-2545.jpg",
      },
    ],
    partners: [
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJCNlpsaS3GWGaESf3aX5z4GKWVBl_7QBkQ&s",
        url: "#",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJCNlpsaS3GWGaESf3aX5z4GKWVBl_7QBkQ&s",
        url: "#",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJCNlpsaS3GWGaESf3aX5z4GKWVBl_7QBkQ&s",
        url: "#",
      },
      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBJCNlpsaS3GWGaESf3aX5z4GKWVBl_7QBkQ&s",
        url: "#",
      },
    ],
    seat_plans: [
      {
        name: "Diamond",
        price: 120,
        color: "#FCD3FE",
        status: "Seating",
      },
      {
        name: "Platinum",
        price: 100,
        color: "#FCE2FE",
        status: "Seating",
      },
      {
        name: "Gold",
        price: 85,
        color: "#707DBF",
        status: "Seating",
      },
      {
        name: "Silver",
        price: 70,
        color: "#ABB4DD",
        status: "Seating",
      },
      {
        name: "Bronze",
        price: 60,
        color: "#D3DAF9",
        status: "Seating",
      },
      {
        name: "General Admission",
        price: 50,
        color: "#FFEFC3",
        status: "Seating",
      },
      {
        name: "Backstage Access",
        price: 200,
        color: "#FFCA39",
        status: "Standing",
      },
      {
        name: "VIP Lounge",
        price: 150,
        color: "#2BA149",
        status: "Standing",
      },
    ],
    seatingInfo: [
      "Seating categories include reserved seating with an unobstructed stage view.",
      "Standing categories include access to open floor areas near the stage.",
    ],
    ticketCategories: [
      {
        name: "General Admission Package",
        price: 150,
        description: "Access to Festival Grounds",
        status: "Standing",
      },
      {
        name: "Silver Package",
        price: 200,
        description: "Mid-tier View",
        status: "Seating",
      },
      {
        name: "Gold Package",
        price: 250,
        description: "Prime View",
        status: "Seating",
      },
      {
        name: "Platinum Package",
        price: 300,
        description: "Near Stage",
        status: "Seating",
      },
      {
        name: "Diamond Package",
        price: 350,
        description: "Front-Row View",
        status: "Standing",
      },
      {
        name: "VIP Lounge Package",
        price: 400,
        description: "Exclusive Lounge",
        status: "Standing",
      },
      {
        name: "Artist Meet-and-Greet Package",
        price: 450,
        description: "Backstage Access",
        status: "Standing",
      },
      {
        name: "Ultimate Access Package",
        price: 500,
        description: "All-Inclusive Benefits",
        status: "Standing",
      },
    ],
    ticketBenefits: [
      {
        category: "VIP Lounge",
        benefits: [
          "Premium seating",
          "Complimentary drinks",
          "Fast-track entry",
        ],
        price: 150,
      },
      {
        category: "Backstage Access",
        benefits: [
          "Standing access to the backstage area",
          "Artist meet-and-greet",
          "Exclusive merchandise",
        ],
        price: 200,
      },
    ],
    organizer: {
      name: "Global Tech Corp",
      logo: "https://img.freepik.com/free-photo/woman-holding-blank-copy-space-her-open-palm-standing-full-length-isolated-white-background_231208-9479.jpg?t=st=1758460895~exp=1758464495~hmac=21ddf875e03ef024e32398d4c4b98a48bad0d695b937d5ee72e1bc5fc7139fe2&w=1480",
      email: "contact@globaltech.com",
      phone: "+20 123 456 789",
      website: "https://globaltech.com",
    },
  },
  {
    id: "2",
    title: "Culinary Delights Festival",
    image:
      "https://img.freepik.com/free-vector/food-background-with-vegetables-cutlery_23-2147763410.jpg",
    date: "May 25, 2029",
    time: "11:00 AM",
    location: "The Plaza, San Francisco, CA",
    ticketsSold: 18000,
    status: "active",
    totalTickets: 30000,
    category: "Food & Culinary",
    ticketSoldPercentage: 60,
    price: 120,
    description: `Embark on a culinary adventure! Sample delicious dishes from around the world, watch live chef demonstrations, and participate in interactive cooking workshops. Meet celebrity chefs and discover new flavors.`,
    terms: [
      {
        title: "Ticket Purchase and Entry",
        items: [
          "All attendees must possess a valid ticket for entry.",
          "Children under 12 enter free with paying adult.",
          "Food sampling tickets sold separately.",
        ],
      },
      {
        title: "Food Allergies",
        items: [
          "Please notify staff of any food allergies.",
          "Vegan and gluten-free options available.",
        ],
      },
    ],
    merchandise: [
      {
        name: "Chef's Apron",
        price: "USD $30",
        image:
          "https://img.freepik.com/free-vector/realistic-apron-with-wooden-spoon-fork_107791-1004.jpg",
      },
      {
        name: "Recipe Book",
        price: "USD $35",
        image:
          "https://img.freepik.com/free-vector/hand-drawn-opened-book-illustration_23-2149218519.jpg",
      },
    ],
    partners: [
      {
        image: "https://logo.clearbit.com/foodnetwork.com",
        url: "#",
      },
      {
        image: "https://logo.clearbit.com/kitchenaid.com",
        url: "#",
      },
    ],
    seat_plans: [
      {
        name: "VIP Tasting",
        price: 150,
        color: "#FFD700",
        status: "Seating",
      },
      {
        name: "General Admission",
        price: 75,
        color: "#C0C0C0",
        status: "Standing",
      },
    ],
    seatingInfo: [
      "VIP areas include reserved seating at demonstration stages.",
      "General admission includes access to all food stalls and standing room at demonstrations.",
    ],
    ticketCategories: [
      {
        name: "General Admission",
        price: 75,
        description: "Access to all food stalls",
        status: "Standing",
      },
      {
        name: "VIP Tasting Package",
        price: 150,
        description: "Reserved seating at demonstrations",
        status: "Seating",
      },
    ],
    ticketBenefits: [
      {
        category: "VIP Benefits",
        benefits: [
          "Reserved seating at chef demonstrations",
          "Complimentary tasting portions",
          "Meet-and-greet with chefs",
        ],
        price: 150,
      },
    ],
    organizer: {
      name: "Global Tech Corp",
      logo: "https://img.freepik.com/free-photo/woman-holding-blank-copy-space-her-open-palm-standing-full-length-isolated-white-background_231208-9479.jpg?t=st=1758460895~exp=1758464495~hmac=21ddf875e03ef024e32398d4c4b98a48bad0d695b937d5ee72e1bc5fc7139fe2&w=1480",
      email: "contact@globaltech.com",
      phone: "+20 123 456 789",
      website: "https://globaltech.com",
    },
  },
  {
    id: "3",
    title: "Tech Future Expo",
    image:
      "https://img.freepik.com/free-vector/technology-background-with-circuit-board-elements_23-2147839613.jpg",
    date: "June 1, 2029",
    time: "10:00 AM",
    location: "Silicon Valley, San Jose, CA",
    ticketsSold: 16500,
    status: "active",
    totalTickets: 30000,
    category: "Technology",
    ticketSoldPercentage: 55,
    price: 300,
    description: `Explore the latest tech innovations shaping our future. Experience hands-on demonstrations of cutting-edge technology, attend keynote speeches from industry leaders, and network with tech professionals.`,
    terms: [
      {
        title: "Registration",
        items: [
          "All attendees must register upon arrival.",
          "Business attire recommended for networking events.",
        ],
      },
      {
        title: "Photography",
        items: [
          "No flash photography during presentations.",
          "Some areas may prohibit photography.",
        ],
      },
    ],
    merchandise: [
      {
        name: "Expo T-Shirt",
        price: "USD $25",
        image:
          "https://img.freepik.com/free-vector/realistic-tshirt-template_23-2147571802.jpg",
      },
      {
        name: "Tech Swag Bag",
        price: "USD $40",
        image:
          "https://img.freepik.com/free-vector/realistic-tote-bag-mockup_23-2147571794.jpg",
      },
    ],
    partners: [
      {
        image: "https://logo.clearbit.com/google.com",
        url: "#",
      },
      {
        image: "https://logo.clearbit.com/apple.com",
        url: "#",
      },
      {
        image: "https://logo.clearbit.com/microsoft.com",
        url: "#",
      },
    ],
    seat_plans: [
      {
        name: "Platinum Pass",
        price: 500,
        color: "#E5E4E2",
        status: "Seating",
      },
      {
        name: "Gold Pass",
        price: 300,
        color: "#FFD700",
        status: "Seating",
      },
      {
        name: "Silver Pass",
        price: 200,
        color: "#C0C0C0",
        status: "Seating",
      },
      {
        name: "General Admission",
        price: 100,
        color: "#CD7F32",
        status: "Standing",
      },
    ],
    seatingInfo: [
      "Premium passes include reserved seating at keynote presentations.",
      "General admission includes access to exhibit halls and standing room at presentations.",
    ],
    ticketCategories: [
      {
        name: "General Admission",
        price: 100,
        description: "Access to exhibit halls",
        status: "Standing",
      },
      {
        name: "Conference Pass",
        price: 200,
        description: "Access to all presentations",
        status: "Seating",
      },
      {
        name: "VIP All-Access",
        price: 500,
        description: "Includes networking events",
        status: "Seating",
      },
    ],
    ticketBenefits: [
      {
        category: "VIP Benefits",
        benefits: [
          "Access to exclusive networking events",
          "Reserved seating at keynotes",
          "Private meetups with speakers",
        ],
        price: 500,
      },
    ],
    organizer: {
      name: "Global Tech Corp",
      logo: "https://img.freepik.com/free-photo/woman-holding-blank-copy-space-her-open-palm-standing-full-length-isolated-white-background_231208-9479.jpg?t=st=1758460895~exp=1758464495~hmac=21ddf875e03ef024e32398d4c4b98a48bad0d695b937d5ee72e1bc5fc7139fe2&w=1480",
      email: "contact@globaltech.com",
      phone: "+20 123 456 789",
      website: "https://globaltech.com",
    },
  },
];

export const events: EventCalendar[] = [
  {
    id: "1",
    title: "Political Economy",
    date: new Date(2025, 8, 20),
    startTime: "12:00",
    endTime: "15:00",
    progress: 6,
    total: 20,
    lecturer: "Prof. Smith",
    courseName: "Political Economy 101",
    instructor: instructors[1],
    students: [
      {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      },
      {
        name: "Bob Johnson",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      },
    ],
  },
  {
    id: "2",
    title: "Modern Societies",
    date: new Date(2025, 7, 9),
    startTime: "16:00",
    endTime: "17:00",
    progress: 18,
    total: 20,
    courseName: "Sociology 205",
    instructor: instructors[0],
    students: [
      {
        name: "Alice Brown",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      },
      {
        name: "Charlie Davis",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      },
    ],
  },
  {
    id: "3",
    title: "Behavioral Economics",
    date: new Date(2025, 7, 6),
    startTime: "08:00",
    endTime: "10:20",
    lecturer: "Cognitive Illness and Decision Making",
    link: "https://meet.google.com/ksr02-er/g",
    owner: "Aide Dawson",
    courseName: "Economics 301",
    instructor: instructors[3],
    students: [
      {
        name: "Eve Wilson",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      },
      {
        name: "Frank Miller",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      },
      {
        name: "Grace Lee",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      },
      {
        name: "Henry Clark",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      },
      {
        name: "Henry Clark",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      },
      {
        name: "Henry Clark",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      },
    ],
  },
  {
    id: "4",
    title: "Introduction to Philosophy",
    date: new Date(2025, 7, 7),
    startTime: "09:30",
    endTime: "11:00",
    progress: 10,
    total: 15,
    courseName: "Philosophy 101",
    instructor: instructors[2],
    students: [
      {
        name: "Ivy Nguyen",
        avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      },
      {
        name: "Jack White",
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      },
    ],
  },
  {
    id: "5",
    title: "Advanced Statistics",
    date: new Date(2025, 7, 12),
    startTime: "14:00",
    endTime: "16:30",
    progress: 12,
    total: 20,
    courseName: "Statistics 401",
    instructor: instructors[4],
    students: [
      {
        name: "Karen Hill",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      },
      {
        name: "Leo Grant",
        avatar: "https://randomuser.me/api/portraits/men/7.jpg",
      },
      {
        name: "Mona Taylor",
        avatar: "https://randomuser.me/api/portraits/women/7.jpg",
      },
    ],
  },
];
