import { memo } from "react";

const priorityClasses: Record<string, string> = {
  urgent: "bg-red-600",
  high: "bg-orange-400",
  medium: "bg-sky-400",
  low: "bg-green-500",
};

function PriorityBadge({ priority }: { priority: string }) {
  const cls = priorityClasses[priority] || "bg-gray-400";
  return (
    <span className={`${cls} text-white text-xs px-2 py-1 rounded-full`}>
      {priority}
    </span>
  );
}

export default memo(PriorityBadge);
