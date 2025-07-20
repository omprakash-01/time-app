import React from "react";
import { X } from "lucide-react";

const TaskForm = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  projectOptions,
  typeOptions,
  editing,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">
            {editing ? "Edit Entry" : "Add New Entry"}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Project <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.project}
              onChange={(e) =>
                setFormData({ ...formData, project: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {projectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type of Work <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Task description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Write text here ..."
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
              required
            />
            <p className="text-xs text-gray-500 mt-1">A note for extra info</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hours <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    hours: Math.max(1, formData.hours - 1),
                  })
                }
                className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                value={formData.hours}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hours: parseInt(e.target.value) || 1,
                  })
                }
                className="w-20 p-2 border-t border-b border-gray-300 text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
                required
              />
              <button
                type="button"
                onClick={() =>
                  setFormData({ ...formData, hours: formData.hours + 1 })
                }
                className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={onSubmit}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-medium"
            >
              {editing ? "Update entry" : "Add entry"}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-3 text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
