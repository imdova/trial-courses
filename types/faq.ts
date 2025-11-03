export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  status: 'Published' | 'Draft';
  createdAt: string;
  updatedAt?: string;
}

export interface FAQCategory {
  id: string;
  name: string;
  description?: string;
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  { id: '1', name: 'Account' },
  { id: '2', name: 'Payments' },
  { id: '3', name: 'Shipping' },
  { id: '4', name: 'Orders' },
  { id: '5', name: 'Returns' },
  { id: '6', name: 'General' },
];

export const MOCK_FAQS: FAQ[] = [
  {
    id: '1',
    question: 'How do I reset my password?',
    answer: 'To reset your password, click on the "Forgot Password" link on the login page and follow the instructions sent to your email.',
    category: 'Account',
    status: 'Published',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers.',
    category: 'Payments',
    status: 'Published',
    createdAt: '2024-01-20',
  },
  {
    id: '3',
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days, while express shipping takes 1-2 business days.',
    category: 'Shipping',
    status: 'Draft',
    createdAt: '2024-02-01',
  },
  {
    id: '4',
    question: 'Can I change my order after placing it?',
    answer: 'You can modify your order within 24 hours of placing it by contacting our customer service team.',
    category: 'Orders',
    status: 'Published',
    createdAt: '2024-02-05',
  },
  {
    id: '5',
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 50 countries worldwide. International shipping typically takes 7-14 business days.',
    category: 'Shipping',
    status: 'Draft',
    createdAt: '2024-02-10',
  },
  {
    id: '6',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for unused items in their original packaging.',
    category: 'Returns',
    status: 'Published',
    createdAt: '2024-02-12',
  },
  {
    id: '7',
    question: 'How can I track my order?',
    answer: 'You will receive a tracking number via email once your order ships. You can also track it in your account dashboard.',
    category: 'Orders',
    status: 'Published',
    createdAt: '2024-02-15',
  },
  {
    id: '8',
    question: 'Do you offer customer support?',
    answer: 'Yes, our customer support team is available 24/7 via email, chat, and phone.',
    category: 'General',
    status: 'Draft',
    createdAt: '2024-02-18',
  },
];
