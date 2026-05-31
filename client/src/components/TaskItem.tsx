import { memo, useState, useCallback } from "react";
import PriorityBadge from "./PriorityBadge";
import { updateTaskStatus } from "../services/api";

function TaskItem({ task, onUpdated }: any) {
  const [loading, setLoading] = useState(false);

  const changeStatus = useCallback(
    async (next: string) => {
      setLoading(true);
      try {
        await updateTaskStatus(task.id, next);
        onUpdated(task.id, next);
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    },
    [onUpdated, task.id],
  );

  return (
    <div className="flex items-start justify-between p-3 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded mb-3 shadow-sm">
      <div className="flex-1 pr-4">
        <div className="font-semibold">
          {task.title}{" "}
          <span className="text-sm text-gray-400 dark:text-gray-400">
            ({task.dueDate})
          </span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-300">
          {task.description}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <PriorityBadge priority={task.priority} />
        <select
          className="border rounded px-2 py-1 text-sm bg-white dark:bg-gray-700 dark:text-gray-100"
          value={task.status}
          onChange={(e) => changeStatus(e.target.value)}
          disabled={loading}
        >
          <option value="todo">To do</option>
          <option value="in_progress">In progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}

export default memo(TaskItem);
