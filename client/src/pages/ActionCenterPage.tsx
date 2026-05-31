import React, { useEffect, useState } from "react";
import { fetchActionCenter, fetchStudents } from "../services/api";
import StudentProfile from "../components/StudentProfile";
import TaskList from "../components/TaskList";
import MessageSummary from "../components/MessageSummary";

export default function ActionCenterPage() {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("theme");
      return saved ? saved === "dark" : true;
    } catch {
      return true;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const studentOptions = React.useMemo(
    () =>
      students.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name} ({s.id})
        </option>
      )),
    [students],
  );

  useEffect(() => {
    async function init() {
      try {
        setLoading(true);
        const s = await fetchStudents();
        setStudents(s);
        const id = s?.[0]?.id || null;
        setSelected(id);
      } catch (e: any) {
        setError(e.message || "Error");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }, [dark]);

  useEffect(() => {
    if (!selected) return;
    let cancelled = false;
    async function loadForSelected() {
      try {
        setLoading(true);
        const res = await fetchActionCenter(selected as string);
        if (!cancelled) setData(res);
      } catch (e: any) {
        if (!cancelled) setError(e.message || "Error");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadForSelected();
    return () => {
      cancelled = true;
    };
  }, [selected]);

  const handleTaskUpdated = React.useCallback((id: string, status: string) => {
    setData((d: any) => ({
      ...d,
      tasks: d.tasks.map((t: any) => (t.id === id ? { ...t, status } : t)),
    }));
  }, []);

  const onStudentChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelected(e.target.value);
    },
    [],
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
        <div className="flex flex-col items-center gap-4 p-10 rounded-3xl bg-slate-900/95 shadow-2xl ring-1 ring-white/10">
          <div className="h-16 w-16 rounded-full border-4 border-slate-700 border-t-brand-500 animate-spin" />
          <div className="text-lg text-slate-100 font-semibold">
            Loading student action center...
          </div>
        </div>
      </div>
    );
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Counselor Student Action Center
        </h2>
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 dark:text-gray-300">
            Student
          </label>
          <select
            className="border rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-gray-100"
            value={selected || ""}
            onChange={onStudentChange}
          >
            {studentOptions}
          </select>
          <button
            onClick={() => setDark((d) => !d)}
            className="ml-2 p-2 rounded bg-gray-100 dark:bg-gray-700"
            aria-label="Toggle theme"
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[280px_1fr_260px] gap-6">
        <div>
          <StudentProfile
            student={data?.student}
            unreadCount={data?.unreadCount}
          />
        </div>
        <div>
          <TaskList
            tasks={data?.tasks || []}
            onTaskUpdated={handleTaskUpdated}
          />
        </div>
        <div>
          <MessageSummary messages={data?.messages || []} />
        </div>
      </div>
    </div>
  );
}
