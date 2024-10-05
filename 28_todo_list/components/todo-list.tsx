"use client"; // Enables client-side rendering for this component

// Import necessary hooks and types from React
import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";

// Import custom UI components from the UI directory
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// Define a TypeScript interface for task data
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

// Default export of the TodoListComponent function
export default function TodoList() {
  // State hooks for managing tasks, new task input, editing task, and component mount status
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTaskText, setEditedTaskText] = useState<string>("");
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // Effect hook to run on component mount
  useEffect(() => {
    setIsMounted(true); // Set mounted status to true
    // Load tasks from local storage
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks) as Task[]); // Parse and set tasks from local storage
    }
  }, []);

  // Effect hook to save tasks to local storage whenever they change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to local storage
    }
  }, [tasks, isMounted]);

  // Function to add a new task
  const addTask = (): void => {
    if (newTask.trim() !== "") {
      // Add the new task to the task list
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask(""); // Clear the new task input
    }
  };

  // Function to toggle the completion status of a task
  const toggleTaskCompletion = (id: number): void => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Function to start editing a task
  const startEditingTask = (id: number, text: string): void => {
    setEditingTaskId(id); // Set the task ID being edited
    setEditedTaskText(text); // Set the text of the task being edited
  };

  // Function to update an edited task
  const updateTask = (): void => {
    if (editedTaskText.trim() !== "") {
      // Update the task text
      setTasks(
        tasks.map((task) =>
          task.id === editingTaskId ? { ...task, text: editedTaskText } : task
        )
      );
      setEditingTaskId(null); // Clear the editing task ID
      setEditedTaskText(""); // Clear the edited task text
    }
  };

  // Function to delete a task
  const deleteTask = (id: number): void => {
    setTasks(tasks.filter((task) => task.id !== id)); // Filter out the task to be deleted
  };

  // Avoid rendering on the server to prevent hydration errors
  if (!isMounted) {
    return null;
  }

  // JSX return statement rendering the todo list UI
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      {/* Center the todo list within the screen */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        {/* Header with title */}
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Todo List
        </h1>
        {/* Input for adding new tasks */}
        <div className="flex items-center mb-4">
          <Input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={
              (e: ChangeEvent<HTMLInputElement>) => setNewTask(e.target.value) // Update new task input
            }
            className="flex-1 mr-2 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          />
          <Button
            onClick={addTask}
            className="bg-black hover:bg-slate-800 text-white font-medium py-2 px-4 rounded-md"
          >
            Add
          </Button>
        </div>
        {/* List of tasks */}
        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-md px-4 py-2"
            >
              <div className="flex items-center">
                {/* Checkbox to toggle task completion */}
                <Checkbox
                  checked={task.completed}
                  className="mr-2"
                  onCheckedChange={() => toggleTaskCompletion(task.id)}
                />
                {editingTaskId === task.id ? (
                  // Input for editing task text
                  <Input
                    type="text"
                    value={editedTaskText}
                    onChange={
                      (e: ChangeEvent<HTMLInputElement>) =>
                        setEditedTaskText(e.target.value) // Update edited task text
                    }
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        updateTask(); // Update task on Enter key press
                      }
                    }}
                    className="flex-1 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                  />
                ) : (
                  // Display task text
                  <span
                    className={`flex-1 text-gray-800 dark:text-gray-200 ${
                      task.completed
                        ? "line-through text-gray-500 dark:text-gray-400"
                        : ""
                    }`}
                  >
                    {task.text}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                {editingTaskId === task.id ? (
                  // Button to save edited task
                  <Button
                    onClick={updateTask}
                    className="bg-black hover:bg-slate-800 text-white font-medium py-1 px-2 rounded-md mr-2"
                  >
                    Save
                  </Button>
                ) : (
                  // Button to start editing task
                  <Button
                    onClick={() => startEditingTask(task.id, task.text)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 font-medium py-1 px-2 rounded-md mr-2"
                  >
                    Edit
                  </Button>
                )}
                {/* Button to delete task */}
                <Button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded-md"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
