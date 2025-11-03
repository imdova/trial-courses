"use client";

import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Star, Eye, Edit, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/UI/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import { Badge } from "@/components/UI/badge";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { Card } from "@/components/UI/card";
import Image from "next/image";

// Define the Review type
export type Review = {
  id: string;
  course: {
    id: string;
    name: string;
    instructor: string;
  };
  student: {
    id: string;
    name: string;
    email: string;
  };
  rating: number;
  comment: string;
  images: string[];
  status: "published" | "pending" | "rejected";
  createdAt: string;
};

// Static dummy data to prevent hydration errors
const dummyData: Review[] = [
  {
    id: "review-1",
    course: { id: "c1", name: "React Fundamentals", instructor: "John Doe" },
    student: { id: "s1", name: "Alice Johnson", email: "alice@example.com" },
    rating: 5,
    comment: "Great course! Learned a lot about React hooks and context API.",
    images: [
      "https://picsum.photos/id/1/200/200",
      "https://picsum.photos/id/2/200/200",
    ],
    status: "published",
    createdAt: "2023-10-15",
  },
  {
    id: "review-2",
    course: { id: "c2", name: "Advanced TypeScript", instructor: "Jane Smith" },
    student: { id: "s2", name: "Bob Smith", email: "bob@example.com" },
    rating: 4,
    comment:
      "The instructor was very knowledgeable but the pace was a bit fast for beginners.",
    images: [],
    status: "published",
    createdAt: "2023-10-18",
  },
  {
    id: "review-3",
    course: {
      id: "c3",
      name: "Next.js Masterclass",
      instructor: "Mike Johnson",
    },
    student: { id: "s3", name: "Charlie Brown", email: "charlie@example.com" },
    rating: 3,
    comment: "Excellent content and well-structured curriculum.",
    images: ["https://picsum.photos/id/3/200/200"],
    status: "pending",
    createdAt: "2023-10-20",
  },
  {
    id: "review-4",
    course: { id: "c4", name: "Tailwind CSS", instructor: "Sarah Williams" },
    student: { id: "s4", name: "Diana Prince", email: "diana@example.com" },
    rating: 5,
    comment: "Could use more practical examples and exercises.",
    images: [
      "https://picsum.photos/id/4/200/200",
      "https://picsum.photos/id/5/200/200",
      "https://picsum.photos/id/6/200/200",
    ],
    status: "published",
    createdAt: "2023-10-22",
  },
  {
    id: "review-5",
    course: { id: "c5", name: "Node.js Backend", instructor: "David Brown" },
    student: { id: "s5", name: "Edward Davis", email: "edward@example.com" },
    rating: 2,
    comment: "The best course I've taken on this platform. Highly recommended!",
    images: [],
    status: "rejected",
    createdAt: "2023-10-25",
  },
];

// Star rating component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          className={
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ))}
      <span className="ml-1 text-xs text-gray-600">({rating})</span>
    </div>
  );
};

// Status badge component
const StatusBadge = ({ status }: { status: Review["status"] }) => {
  const statusConfig = {
    published: { label: "Published", color: "bg-green-100 text-green-800" },
    pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    rejected: { label: "Rejected", color: "bg-red-100 text-red-800" },
  };

  const config = statusConfig[status];

  return (
    <Badge className={config.color} variant="outline">
      {config.label}
    </Badge>
  );
};

// Action component
const Actions = ({ review }: { review: Review }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(review.id)}
        >
          Copy review ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" /> View details
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" /> Edit review
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" /> Delete review
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Define columns
const columns: ColumnDef<Review>[] = [
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => {
      const course = row.original.course;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{course.name}</span>
          <span className="text-xs text-gray-500">by {course.instructor}</span>
        </div>
      );
    },
    meta: { filterVariant: "select" },
  },
  {
    accessorKey: "student",
    header: "Student",
    cell: ({ row }) => {
      const student = row.original.student;
      return (
        <div className="flex flex-col">
          <span className="font-medium">{student.name}</span>
          <span className="text-xs text-gray-500">{student.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "rating",
    header: "Star",
    cell: ({ row }) => {
      return <StarRating rating={row.original.rating} />;
    },
    meta: { filterVariant: "select" },
  },
  {
    accessorKey: "comment",
    header: "Comment",
    cell: ({ row }) => {
      const comment = row.original.comment;
      return (
        <div className="max-w-[250px] truncate" title={comment}>
          {comment}
        </div>
      );
    },
  },
  {
    accessorKey: "images",
    header: "Images",
    cell: ({ row }) => {
      const images: string[] = row.original.images;

      if (!images || images.length === 0) {
        return <span className="text-gray-400">No images</span>;
      }

      return (
        <div className="flex gap-1">
          {/* Show only first 2 if more than 2 */}
          {images
            .slice(0, images.length > 2 ? 2 : images.length)
            .map((img, i) => (
              <div
                key={i}
                className="relative h-10 w-10 overflow-hidden rounded border"
              >
                <Image
                  src={img}
                  fill
                  alt={`Review image ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}

          {/* If more than 2, show +count */}
          {images.length > 2 && (
            <div className="flex h-10 w-10 items-center justify-center rounded border bg-gray-100 text-xs">
              +{images.length - 2}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <StatusBadge status={row.original.status} />;
    },
    meta: { filterVariant: "select" },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      // Format date string to a more readable format
      const date = new Date(row.original.createdAt);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    meta: { filterVariant: "date-range" },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <Actions review={row.original} />;
    },
  },
];

// Reviews page component
export default function ReviewsPage() {
  const router = useRouter();

  const handleCreateReview = () => {
    router.push("/admin/reviews/create");
  };

  return (
    <div>
      <div className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Reviews</h1>
            <p className="mt-1 text-gray-600">
              Manage and review all course feedback
            </p>
          </div>
          <Button onClick={handleCreateReview} className="bg-primary">
            <Plus className="mr-2 h-4 w-4" /> Add New Review
          </Button>
        </div>

        <Card className="p-3">
          <AdvancedDataTable<Review>
            name="Reviews"
            columns={columns}
            filters={[
              { key: "status", className: "min-w-32" },
              { key: "rating", className: "min-w-32" },
              { key: "createdAt", className: "min-w-52" },
            ]}
            hidePagination={false}
            hideSearch={false}
            hideExport={true}
            hideColumnManager={true}
            initialPagination={{ pageIndex: 0, pageSize: 10 }}
            cellClassName="py-3 text-xs"
            headerClassName="font-semibold"
            filterClassName="pt-2"
            data={dummyData || []}
          />
        </Card>
      </div>
    </div>
  );
}
