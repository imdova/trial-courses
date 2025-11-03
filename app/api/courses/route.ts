import { courseData } from "@/constants/VideosData.data";
import { CourseType } from "@/types/courses";
import { NextResponse } from "next/server";

// GET endpoint to fetch all courses
export async function GET() {
  return NextResponse.json(courseData);
}

// POST endpoint to create a new course
export async function POST(request: Request) {
  try {
    const newCourse: CourseType = await request.json();

    // Generate a new ID (in a real app, this would come from your database)
    newCourse.id = (courseData.length + 1).toString();

    // Add the new course to our mock database
    courseData.push(newCourse);

    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
