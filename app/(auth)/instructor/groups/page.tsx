"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Plus, Search, Download } from "lucide-react";
import GroupCard from "./components/GroupCard";
import UserSelect from "./components/UserSelect";
import { instructors } from "@/constants/instructors.data";
import { students } from "@/constants/students.data";
import { courseData } from "@/constants/VideosData.data";
import CourseSelectGroup from "./components/CourseSelectGroup";
import { Dialog, DialogContent } from "@/components/UI/dialog";

interface Group {
  id: string;
  name: string;
  instructorCount: number;
  studentCount: number;
  instructors: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  topStudents: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  course?: {
    id: string;
    title: string;
    image: string;
  };
}

const GroupsContent = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const allInstructors = instructors.map((instructor) => ({
    ...instructor,
    type: "instructor" as const,
  }));

  const allStudents = students.map((student) => ({
    ...student,
    type: "student" as const,
  }));

  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Group One",
      instructorCount: 2,
      studentCount: 3,
      instructors: allInstructors
        .slice(0, 2)
        .map(({ id, name, avatar }) => ({ id, name, avatar })),
      topStudents: allStudents
        .slice(0, 2)
        .map(({ id, name, avatar }) => ({ id, name, avatar })),
      course: {
        id: courseData[0].id,
        title: courseData[0].title,
        image: courseData[0].image,
      },
    },
    {
      id: "2",
      name: "Group Two",
      instructorCount: 1,
      studentCount: 2,
      instructors: allInstructors
        .slice(2, 3)
        .map(({ id, name, avatar }) => ({ id, name, avatar })),
      topStudents: allStudents
        .slice(2, 4)
        .map(({ id, name, avatar }) => ({ id, name, avatar })),
      course: {
        id: courseData[1].id,
        title: courseData[1].title,
        image: courseData[1].image,
      },
    },
  ]);

  const [newGroup, setNewGroup] = useState<{
    name: string;
    selectedinstructors: string[];
    selectedStudents: string[];
    selectedCourse?: string;
  }>({
    name: "",
    selectedinstructors: [],
    selectedStudents: [],
    selectedCourse: undefined,
  });

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddGroup = () => {
    const selectedinstructorsData = allInstructors
      .filter((instructor) =>
        newGroup.selectedinstructors.includes(instructor.id)
      )
      .map(({ id, name, avatar }) => ({ id, name, avatar }));

    const selectedStudentsData = allStudents
      .filter((student) => newGroup.selectedStudents.includes(student.id))
      .map(({ id, name, avatar }) => ({ id, name, avatar }));

    const selectedCourseData = courseData.find(
      (course) => course.id === newGroup.selectedCourse
    );

    const newId = (groups.length + 1).toString();

    setGroups([
      ...groups,
      {
        id: newId,
        name: newGroup.name,
        instructorCount: selectedinstructorsData.length,
        studentCount: selectedStudentsData.length,
        instructors: selectedinstructorsData,
        topStudents: selectedStudentsData,
        course: selectedCourseData
          ? {
              id: selectedCourseData.id,
              title: selectedCourseData.title,
              image: selectedCourseData.image,
            }
          : undefined,
      },
    ]);

    setNewGroup({
      name: "",
      selectedinstructors: [],
      selectedStudents: [],
      selectedCourse: undefined,
    });

    setIsDialogOpen(false);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(groups, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;
    const exportName = `groups-${new Date().toISOString()}.json`;

    const link = document.createElement("a");
    link.setAttribute("href", dataUri);
    link.setAttribute("download", exportName);
    link.click();
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Groups Management
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search groups..."
                className="pl-10 pr-4 py-2 border text-sm rounded-lg w-full focus:outline-none"
                defaultValue={searchQuery}
                onChange={(e) => {
                  const params = new URLSearchParams(window.location.search);
                  if (e.target.value) {
                    params.set("search", e.target.value);
                  } else {
                    params.delete("search");
                  }
                  window.history.pushState({}, "", `?${params.toString()}`);
                }}
              />
            </div>

            <button
              onClick={() => setIsDialogOpen(true)}
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Group</span>
            </button>

            <button
              onClick={handleExport}
              className="flex items-center justify-center gap-2 bg-white  text-primary border border-primary px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="h-5 w-5" />
              <span>Export</span>
            </button>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>

        <DialogContent>
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Create New Group</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Group Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border text-sm rounded-md focus:outline-none"
                  value={newGroup.name}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, name: e.target.value })
                  }
                  placeholder="Enter group name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UserSelect
                  users={allInstructors}
                  selected={newGroup.selectedinstructors}
                  onChange={(selected) =>
                    setNewGroup({ ...newGroup, selectedinstructors: selected })
                  }
                  userType="instructors"
                />

                <UserSelect
                  users={allStudents}
                  selected={newGroup.selectedStudents}
                  onChange={(selected) =>
                    setNewGroup({ ...newGroup, selectedStudents: selected })
                  }
                  userType="students"
                />
              </div>

              <CourseSelectGroup
                selected={
                  newGroup.selectedCourse ? [newGroup.selectedCourse] : []
                }
                onChange={(selected) =>
                  setNewGroup({
                    ...newGroup,
                    selectedCourse:
                      selected.length > 0 ? selected[0] : undefined,
                  })
                }
              />
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setIsDialogOpen(false)}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddGroup}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                disabled={
                  !newGroup.name.trim() ||
                  newGroup.selectedinstructors.length === 0 ||
                  newGroup.selectedStudents.length === 0 ||
                  !newGroup.selectedCourse
                }
              >
                Create Group
              </button>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

const GroupsPage = () => {
  return (
    <Suspense>
      <GroupsContent />
    </Suspense>
  );
};

export default GroupsPage;
