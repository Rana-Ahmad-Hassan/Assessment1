import { memo, useMemo } from "react";

function MessageSummary({ messages }: any) {
  const unread = useMemo(
    () => messages.filter((m: any) => !m.read).length,
    [messages],
  );

  const displayMessages = useMemo(() => messages.slice(0, 6), [messages]);

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">Messages</h3>
        <div className="text-sm text-gray-400">Unread: {unread}</div>
      </div>
      <ul className="space-y-3">
        {displayMessages.map((m: any) => (
          <li key={m.id} className="">
            <div className="font-semibold">{m.subject}</div>
            <div className="text-sm text-gray-400">
              {m.from} · {new Date(m.receivedAt).toLocaleString()}
            </div>
            <div className="text-sm text-gray-300">{m.preview}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(MessageSummary);
