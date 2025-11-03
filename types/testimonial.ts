export interface Testimonial {
  id: string;
  name: string;
  shortName: string;
  content: string;
  rating: number;
  status: 'Published' | 'Draft';
  createdAt: string;
  updatedAt?: string;
  avatar?: string;
}

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'John Smith',
    shortName: 'John',
    content: 'This course was absolutely amazing! The instructor was knowledgeable and the content was well-structured.',
    rating: 5,
    status: 'Published',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    shortName: 'Sarah',
    content: 'Great learning experience. I would definitely recommend this to others.',
    rating: 4,
    status: 'Draft',
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    name: 'Michael Brown',
    shortName: 'Micha',
    content: 'Excellent course material and very helpful instructor. Learned a lot!',
    rating: 5,
    status: 'Published',
    createdAt: '2024-01-13',
  },
  {
    id: '4',
    name: 'Emily Davis',
    shortName: 'Emily',
    content: 'The course exceeded my expectations. Highly recommended!',
    rating: 5,
    status: 'Draft',
    createdAt: '2024-01-12',
  },
  {
    id: '5',
    name: 'Robert Wilson',
    shortName: 'Robert',
    content: 'Very informative and well-organized course. Great value for money.',
    rating: 4,
    status: 'Published',
    createdAt: '2024-01-11',
  },
  {
    id: '6',
    name: 'Lisa Anderson',
    shortName: 'Lisa',
    content: 'Amazing course! The instructor was very patient and explained everything clearly.',
    rating: 5,
    status: 'Draft',
    createdAt: '2024-01-10',
  },
  {
    id: '7',
    name: 'David Miller',
    shortName: 'David',
    content: 'Great course with practical examples. Very satisfied with the content.',
    rating: 4,
    status: 'Published',
    createdAt: '2024-01-09',
  },
  {
    id: '8',
    name: 'Jennifer Taylor',
    shortName: 'Jennifer',
    content: 'Excellent course! The instructor was very knowledgeable and helpful.',
    rating: 5,
    status: 'Draft',
    createdAt: '2024-01-08',
  },
];
