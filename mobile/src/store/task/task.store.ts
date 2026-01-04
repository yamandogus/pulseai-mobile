import { create } from 'zustand';
import { Task, dummyTasks } from '@/app/screens/task/task';

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'checked' | 'status'>) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: dummyTasks,
  addTask: (taskData) => set((state) => {
    const newTask: Task = {
      ...taskData,
      id: Math.random().toString(36).substring(7),
      checked: false,
      status: 'Beklemede',
    };
    return { tasks: [newTask, ...state.tasks] };
  }),
  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id
        ? { ...task, checked: !task.checked, status: !task.checked ? 'Tamamlandı' : 'Beklemede' }
        : task
    ),
  })),
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id),
  })),
  updateTask: (id, updates) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, ...updates } : task
    ),
  })),
}));
