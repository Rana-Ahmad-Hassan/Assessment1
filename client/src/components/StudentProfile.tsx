import { memo, useMemo } from "react";

function StudentProfile({ student, unreadCount }: any) {
  const initials = useMemo(() => {
    if (!student?.name) return "--";
    return student.name
      .split(" ")
      .map((n: string) => n[0])
      .join("");
  }, [student?.name]);

  if (!student)
    return <div className="p-4 text-gray-500">No student selected</div>;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 dark:shadow-md rounded-md shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
          {initials}
        </div>
        <div>
          <h3 className="text-lg font-medium">{student.name}</h3>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            {student.email}
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700 dark:text-gray-200 space-y-2">
        <div>
          <span className="font-medium">Grade:</span> {student.grade}
        </div>
        <div>
          <span className="font-medium">GPA:</span> {student.gpa}
        </div>
        <div>
          <span className="font-medium">Status:</span>{" "}
          <span className="text-sm text-gray-500">
            {student.enrollmentStatus}
          </span>
        </div>
        <div>
          <span className="font-medium">Unread messages:</span>{" "}
          <span className="text-indigo-600">{unreadCount}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(StudentProfile);
