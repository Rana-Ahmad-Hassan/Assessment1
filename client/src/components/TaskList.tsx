import { memo } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onTaskUpdated }: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium">Tasks</h3>
        <div className="text-sm text-gray-500">{tasks.length} total</div>
      </div>
      {tasks.length === 0 ? (
        <div className="text-gray-500">No tasks</div>
      ) : (
        <div>
          {tasks.map((t: any) => (
            <TaskItem key={t.id} task={t} onUpdated={onTaskUpdated} />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(TaskList);
