"use client";
import React, { useState } from "react";
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import TaskForm from "./TaskForm";
import initialTasks from "../../lib/data/ListViewData";

const ListView = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    project: "",
    type: "",
    description: "",
    hours: 12,
  });

  const projectOptions = [
    "Project Name",
    "Project Gama",
    "Project Alpha",
    "Project Beta",
  ];
  const typeOptions = [
    "Work Type",
    "Bug fixes",
    "Development",
    "Testing",
    "Design",
  ];
  const totalHours = tasks.reduce((sum, task) => sum + task.hours, 0);

  const groupedTasks = tasks.reduce((groups, task) => {
    if (!groups[task.date]) {
      groups[task.date] = [];
    }
    groups[task.date].push(task);
    return groups;
  }, {});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description.trim()) return;

    if (editingTask) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                project: formData.project,
                task: formData.description,
                hours: formData.hours,
                type: formData.type,
              }
            : task
        )
      );
    } else {
      const newTask = {
        id: Date.now(),
        date: selectedDate || "Jan 24",
        project: formData.project,
        task: formData.description,
        hours: formData.hours,
        type: formData.type,
      };
      setTasks([...tasks, newTask]);
    }

    resetForm();
  };

  const resetForm = () => {
    setShowModal(false);
    setEditingTask(null);
    setSelectedDate(null);
    setFormData({
      project: "Project Name",
      type: "Bug fixes",
      description: "",
      hours: 12,
    });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      project: task.project,
      type: task.type,
      description: task.task,
      hours: task.hours,
    });
    setSelectedDate(task.date);
    setShowModal(true);
    setActiveDropdown(null);
  };

  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    setActiveDropdown(null);
  };

  const toggleDropdown = (taskId) => {
    setActiveDropdown(activeDropdown === taskId ? null : taskId);
  };

  return (
    <div className="lg:pt-8">
      <div className="max-w-6xl mx-auto p-5 bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              This week's timesheet
            </h1>
            <p className="text-gray-600 mt-1">21 - 26 January, 2024</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-800 font-medium">
              {totalHours}/40 hrs
            </div>
            <div className="w-36 bg-gray-200 rounded-full h-1 overflow-hidden">
              <div
                className="bg-orange-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${(totalHours / 40) * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500">
              {Math.floor((totalHours / 40) * 100)}%
            </div>
          </div>
        </div>

        {/* Task List */}
        <div>
          {Object.entries(groupedTasks).map(([date, dateTasks]) => (
            <div key={date}>
              <div className="p-4 md:p-6 flex flex-col lg:flex-row gap-5 items-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 w-[100px]">
                  {date}
                </h3>
                <div className="space-y-3 w-full">
                  {dateTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex justify-between items-center bg-white border border-gray-300 rounded-md px-4 py-3 hover:shadow-sm"
                    >
                      <div className="text-sm text-gray-900 font-medium">
                        {task.task}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-600">{task.hours} hrs</span>
                        <span className="text-blue-600 font-medium">
                          {task.project}
                        </span>
                        <div className="relative">
                          <button
                            onClick={() => toggleDropdown(task.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <MoreHorizontal className="h-4 w-4 text-gray-400" />
                          </button>
                          {activeDropdown === task.id && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg z-10">
                              <button
                                onClick={() => handleEdit(task)}
                                className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Edit className="h-4 w-4" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(task.id)}
                                className="w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <Trash2 className="h-4 w-4" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      setEditingTask(null);
                      setSelectedDate(date);
                      setShowModal(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-blue-300 rounded-md text-blue-600 hover:border-blue-400 hover:bg-blue-50 transition"
                  >
                    <Plus className="h-4 w-4" />
                    Add new task
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TaskForm
        isOpen={showModal}
        onClose={resetForm}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        projectOptions={projectOptions}
        typeOptions={typeOptions}
        editing={!!editingTask}
      />

  
      {activeDropdown && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </div>
  );
};

export default ListView;
