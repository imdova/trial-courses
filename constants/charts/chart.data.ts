export interface SeriesData {
  name: string;
  data: number[];
  color?: string; // Optional property
}

export const seriesTotalStudent: SeriesData[] = [
  {
    name: "Total Students",
    data: [30, 40, 45, 50, 49, 60],
    // color: "#3269D3", // Uncomment if needed
  },
];
export const seriesCourses: SeriesData[] = [
  {
    name: "Total Courses",
    data: [30, 20, 88, 50, 1, 60],
  },
];
export const seriesRevenue: SeriesData[] = [
  {
    name: "Total Revenue",
    data: [40, 90, 30, 50, 1, 100],
  },
];
export const seriesForEarning: SeriesData[] = [
  {
    name: "Earning",
    data: [30, 40, 45, 50, 49, 60, 87, 55, 62, 50, 40, 64],
  },
];
export const seriesForRevenue: SeriesData[] = [
  {
    name: "Revenue",
    data: [30, 40, 45, 50, 49, 60, 87, 55, 62, 50, 40, 64],
  },
];
export const CategoriesForRevenue: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const dummyRevenueData = {
  yearly: {
    revenue: [
      { date: "2025-01-01", value: 20 },
      { date: "2025-02-01", value: 28 },
      { date: "2025-03-01", value: 35 },
      { date: "2025-04-01", value: 40 },
      { date: "2025-05-01", value: 32 },
      { date: "2025-06-01", value: 45 },
      { date: "2025-07-01", value: 55 },
      { date: "2025-08-01", value: 60 },
      { date: "2025-09-01", value: 52 },
      { date: "2025-10-01", value: 65 },
      { date: "2025-11-01", value: 70 },
      { date: "2025-12-01", value: 80 },
    ],
    courses: [
      { date: "2025-01-01", value: 5 },
      { date: "2025-02-01", value: 8 },
      { date: "2025-03-01", value: 6 },
      { date: "2025-04-01", value: 10 },
      { date: "2025-05-01", value: 9 },
      { date: "2025-06-01", value: 7 },
      { date: "2025-07-01", value: 11 },
      { date: "2025-08-01", value: 12 },
      { date: "2025-09-01", value: 9 },
      { date: "2025-10-01", value: 10 },
      { date: "2025-11-01", value: 13 },
      { date: "2025-12-01", value: 14 },
    ],
    students: [
      { date: "2025-01-01", value: 50 },
      { date: "2025-02-01", value: 65 },
      { date: "2025-03-01", value: 70 },
      { date: "2025-04-01", value: 75 },
      { date: "2025-05-01", value: 80 },
      { date: "2025-06-01", value: 90 },
      { date: "2025-07-01", value: 100 },
      { date: "2025-08-01", value: 110 },
      { date: "2025-09-01", value: 120 },
      { date: "2025-10-01", value: 130 },
      { date: "2025-11-01", value: 140 },
      { date: "2025-12-01", value: 150 },
    ],
    instructors: [
      { date: "2025-01-01", value: 5 },
      { date: "2025-02-01", value: 6 },
      { date: "2025-03-01", value: 7 },
      { date: "2025-04-01", value: 8 },
      { date: "2025-05-01", value: 9 },
      { date: "2025-06-01", value: 10 },
      { date: "2025-07-01", value: 11 },
      { date: "2025-08-01", value: 12 },
      { date: "2025-09-01", value: 12 },
      { date: "2025-10-01", value: 12 },
      { date: "2025-11-01", value: 12 },
      { date: "2025-12-01", value: 12 },
    ],
  },

  monthly: {
    revenue: [
      { date: "2025-01-01", value: 12 },
      { date: "2025-01-08", value: 18 },
      { date: "2025-01-15", value: 15 },
      { date: "2025-01-22", value: 22 },
      { date: "2025-01-29", value: 25 },
    ],
    courses: [
      { date: "2025-01-01", value: 2 },
      { date: "2025-01-08", value: 3 },
      { date: "2025-01-15", value: 4 },
      { date: "2025-01-22", value: 5 },
      { date: "2025-01-29", value: 6 },
    ],
    students: [
      { date: "2025-01-01", value: 10 },
      { date: "2025-01-08", value: 15 },
      { date: "2025-01-15", value: 20 },
      { date: "2025-01-22", value: 25 },
      { date: "2025-01-29", value: 30 },
    ],
    instructors: [
      { date: "2025-01-01", value: 1 },
      { date: "2025-01-08", value: 1 },
      { date: "2025-01-15", value: 2 },
      { date: "2025-01-22", value: 2 },
      { date: "2025-01-29", value: 2 },
    ],
  },

  weekly: {
    revenue: [
      { date: "2025-01-02", value: 2 }, // Monday
      { date: "2025-01-03", value: 3 }, // Tuesday
      { date: "2025-01-04", value: 4 }, // Wednesday
      { date: "2025-01-05", value: 6 }, // Thursday
      { date: "2025-01-06", value: 5 }, // Friday
      { date: "2025-01-07", value: 7 }, // Saturday
      { date: "2025-01-08", value: 4 }, // Sunday
    ],
    courses: [
      { date: "2025-01-02", value: 1 }, // Monday
      { date: "2025-01-04", value: 2 }, // Wednesday
      { date: "2025-01-06", value: 2 }, // Friday
    ],
    students: [
      { date: "2025-01-02", value: 5 }, // Monday
      { date: "2025-01-03", value: 7 }, // Tuesday
      { date: "2025-01-04", value: 8 }, // Wednesday
      { date: "2025-01-05", value: 10 }, // Thursday
      { date: "2025-01-06", value: 12 }, // Friday
    ],
    instructors: [
      { date: "2025-01-02", value: 1 }, // Monday
      { date: "2025-01-04", value: 1 }, // Wednesday
      { date: "2025-01-06", value: 1 }, // Friday
    ],
  },

  custom: {
    revenue: [
      { date: "2025-01-01", value: 20 },
      { date: "2025-01-15", value: 35 },
      { date: "2025-02-01", value: 28 },
      { date: "2025-02-15", value: 42 },
      { date: "2025-03-01", value: 35 },
      { date: "2025-03-15", value: 50 },
    ],
    courses: [
      { date: "2025-01-01", value: 5 },
      { date: "2025-01-15", value: 8 },
      { date: "2025-02-01", value: 8 },
      { date: "2025-02-15", value: 12 },
      { date: "2025-03-01", value: 6 },
      { date: "2025-03-15", value: 9 },
    ],
    students: [
      { date: "2025-01-01", value: 50 },
      { date: "2025-01-15", value: 60 },
      { date: "2025-02-01", value: 65 },
      { date: "2025-02-15", value: 75 },
      { date: "2025-03-01", value: 70 },
      { date: "2025-03-15", value: 85 },
    ],
    instructors: [
      { date: "2025-01-01", value: 5 },
      { date: "2025-01-15", value: 6 },
      { date: "2025-02-01", value: 6 },
      { date: "2025-02-15", value: 7 },
      { date: "2025-03-01", value: 7 },
      { date: "2025-03-15", value: 8 },
    ],
  },
};

export const dummyExamData = {
  yearly: {
    activeExams: [
      { date: "2025-01-01", value: 15 },
      { date: "2025-02-01", value: 18 },
      { date: "2025-03-01", value: 20 },
      { date: "2025-04-01", value: 22 },
      { date: "2025-05-01", value: 25 },
      { date: "2025-06-01", value: 28 },
      { date: "2025-07-01", value: 30 },
      { date: "2025-08-01", value: 32 },
      { date: "2025-09-01", value: 35 },
      { date: "2025-10-01", value: 38 },
      { date: "2025-11-01", value: 40 },
      { date: "2025-12-01", value: 42 },
    ],
    examTakers: [
      { date: "2025-01-01", value: 150 },
      { date: "2025-02-01", value: 180 },
      { date: "2025-03-01", value: 200 },
      { date: "2025-04-01", value: 220 },
      { date: "2025-05-01", value: 250 },
      { date: "2025-06-01", value: 280 },
      { date: "2025-07-01", value: 300 },
      { date: "2025-08-01", value: 320 },
      { date: "2025-09-01", value: 350 },
      { date: "2025-10-01", value: 380 },
      { date: "2025-11-01", value: 400 },
      { date: "2025-12-01", value: 420 },
    ],
  },

  monthly: {
    activeExams: [
      { date: "2025-01-01", value: 20 },
      { date: "2025-01-08", value: 22 },
      { date: "2025-01-15", value: 25 },
      { date: "2025-01-22", value: 28 },
      { date: "2025-01-29", value: 30 },
    ],
    examTakers: [
      { date: "2025-01-01", value: 200 },
      { date: "2025-01-08", value: 220 },
      { date: "2025-01-15", value: 250 },
      { date: "2025-01-22", value: 280 },
      { date: "2025-01-29", value: 300 },
    ],
  },

  weekly: {
    activeExams: [
      { date: "2025-01-02", value: 5 }, // Monday
      { date: "2025-01-03", value: 6 }, // Tuesday
      { date: "2025-01-04", value: 7 }, // Wednesday
      { date: "2025-01-05", value: 8 }, // Thursday
      { date: "2025-01-06", value: 9 }, // Friday
      { date: "2025-01-07", value: 7 }, // Saturday
      { date: "2025-01-08", value: 5 }, // Sunday
    ],
    examTakers: [
      { date: "2025-01-02", value: 50 }, // Monday
      { date: "2025-01-03", value: 60 }, // Tuesday
      { date: "2025-01-04", value: 70 }, // Wednesday
      { date: "2025-01-05", value: 80 }, // Thursday
      { date: "2025-01-06", value: 90 }, // Friday
      { date: "2025-01-07", value: 70 }, // Saturday
      { date: "2025-01-08", value: 50 }, // Sunday
    ],
  },

  custom: {
    activeExams: [
      { date: "2025-01-01", value: 15 },
      { date: "2025-01-15", value: 18 },
      { date: "2025-02-01", value: 20 },
      { date: "2025-02-15", value: 22 },
      { date: "2025-03-01", value: 25 },
      { date: "2025-03-15", value: 28 },
    ],
    examTakers: [
      { date: "2025-01-01", value: 150 },
      { date: "2025-01-15", value: 180 },
      { date: "2025-02-01", value: 200 },
      { date: "2025-02-15", value: 220 },
      { date: "2025-03-01", value: 250 },
      { date: "2025-03-15", value: 280 },
    ],
  },
};
