import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Menu,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";

interface Lesson {
  id: string;
  title: string;
  url: string;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

type CurriculumProps = {
  Chapter: Chapter[];
};

export default function Curriculum({ Chapter }: CurriculumProps) {
  const [chapters, setChapters] = useState(Chapter);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    const sourceChapterIndex = chapters.findIndex((chapter) =>
      chapter.lessons.some((lesson) => lesson.id === result.draggableId)
    );

    const destinationChapterIndex = chapters.findIndex(
      (chapter) => chapter.id === destination.droppableId
    );

    if (sourceChapterIndex === -1 || destinationChapterIndex === -1) return;

    const sourceLessons = [...chapters[sourceChapterIndex].lessons];
    const [movedLesson] = sourceLessons.splice(source.index, 1);
    const destinationLessons = [...chapters[destinationChapterIndex].lessons];
    destinationLessons.splice(destination.index, 0, movedLesson);

    setChapters((prevChapters) =>
      prevChapters.map((chapter, index) =>
        index === sourceChapterIndex
          ? { ...chapter, lessons: sourceLessons }
          : index === destinationChapterIndex
          ? { ...chapter, lessons: destinationLessons }
          : chapter
      )
    );
  };

  const toggleCollapse = (chapterId: string) => {
    setCollapsed((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const addLesson = (chapterId: string) => {
    setChapters((prevChapters) =>
      prevChapters.map((chapter) =>
        chapter.id === chapterId
          ? {
              ...chapter,
              lessons: [
                ...chapter.lessons,
                { id: Date.now().toString(), title: "New Lesson", url: "#" },
              ],
            }
          : chapter
      )
    );
  };

  const addChapter = () => {
    setChapters((prevChapters) => [
      ...prevChapters,
      {
        id: Date.now().toString(),
        title: "New Chapter",
        lessons: [],
      },
    ]);
  };

  const deleteChapter = (chapterId: string) => {
    setChapters((prevChapters) =>
      prevChapters.filter((chapter) => chapter.id !== chapterId)
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Curriculum</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        {chapters.map((chapter) => (
          <div key={chapter.id} className="mb-4 border p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Menu className="text-muted-foreground" size={18} />
                <h3 className="text-sm md:text-lg font-semibold">
                  {chapter.title}
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => toggleCollapse(chapter.id)}>
                  {collapsed[chapter.id] ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronUp size={16} />
                  )}
                </button>
                <button
                  className="hover:text-red-400"
                  onClick={() => deleteChapter(chapter.id)}>
                  <X size={15} />
                </button>
              </div>
            </div>
            {!collapsed[chapter.id] && (
              <>
                <Droppable droppableId={chapter.id} type="LESSON">
                  {(provided) => (
                    <ul
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2 mt-2">
                      {chapter.lessons.map((lesson, index) => (
                        <Draggable
                          key={lesson.id}
                          draggableId={lesson.id}
                          index={index}>
                          {(provided) => (
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className={`bg-gray-100 p-4 rounded-md shadow-sm flex items-center ${
                                selectedLesson === lesson.id
                                  ? "bg-blue-200"
                                  : ""
                              }`}
                              onClick={() => setSelectedLesson(lesson.id)}>
                              <div className="flex gap-3 items-center w-full cursor-move">
                                <GripVertical
                                  className="text-muted-foreground"
                                  size={18}
                                />
                                <h2>{lesson.title}</h2>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
                <button
                  type="button"
                  onClick={() => addLesson(chapter.id)}
                  className="mt-2 bg-gray-100 text-muted-foreground p-4 rounded-md shadow-sm flex items-center cursor-pointer px-4 py-2 w-full">
                  <Plus className="mr-1" size={15} /> Create New Lesson
                </button>
              </>
            )}
          </div>
        ))}
      </DragDropContext>
      <button
        type="button"
        onClick={addChapter}
        className="mb-4 bg-primary text-white px-4 py-2 rounded-md">
        + Add Chapter
      </button>
    </div>
  );
}
