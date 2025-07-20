import React, { useState } from "react";
import { Eye, Edit, Plus, Info } from "lucide-react";
import timesheets from "../../lib/data/TableViewData"

const TableView = () => {
  const [showTooltip, setShowTooltip] = useState(false);



  const getStatusConfig = (status) => {
    switch (status) {
      case "completed":
        return {
          label: "COMPLETED",
          className: "bg-green-100 text-green-800 border-green-200",
          action: "View",
          actionIcon: Eye,
          actionClass: "text-blue-600 hover:text-blue-800",
        };
      case "incomplete":
        return {
          label: "INCOMPLETE",
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
          action: "Update",
          actionIcon: Edit,
          actionClass: "text-blue-600 hover:text-blue-800",
        };
      case "missing":
        return {
          label: "MISSING",
          className: "bg-red-100 text-red-800 border-red-200",
          action: "Create",
          actionIcon: Plus,
          actionClass: "text-blue-600 hover:text-blue-800",
        };
      default:
        return {
          label: "UNKNOWN",
          className: "bg-gray-100 text-gray-800 border-gray-200",
          action: "View",
          actionIcon: Eye,
          actionClass: "text-blue-600 hover:text-blue-800",
        };
    }
  };

  return (
    <div className="      p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center md:text-left">
            Your Timesheets
          </h1>

          {/* Status Legend */}
          <div className="relative inline-block">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onClick={() => setShowTooltip(!showTooltip)}
              className="flex items-center gap-2 bg-yellow-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
            >
              <Info size={16} />
              Statuses
            </button>

            {showTooltip && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white text-black p-4 rounded-lg shadow-lg z-10">
                <div className="space-y-2 text-sm">
                  <p>
                    <strong className="bg-green-100 text-green-800 border-green-200 p-1 ">
                      completed
                    </strong>{" "}
                    = 40 hours added by the user
                  </p>
                  <p>
                    <strong className="bg-yellow-100 text-yellow-800 border-yellow-200 p-1">
                      incomplete
                    </strong>{" "}
                    = less than 40 hours added by the user
                  </p>
                  <p>
                    <strong className="bg-red-100 text-red-800 border-red-200 p-1">
                      missing
                    </strong>
                    = no hours added by the user
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  WEEK #
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  DATE
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STATUS
                </th>

                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timesheets.map((timesheet) => {
                const config = getStatusConfig(timesheet.status);
                const ActionIcon = config.actionIcon;

                return (
                  <tr
                    key={timesheet.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-100">
                      {timesheet.week}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {timesheet.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${config.className}`}
                      >
                        {config.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded font-medium text-sm transition-colors ${config.actionClass}`}
                      >
                        <ActionIcon size={16} />
                        {config.action}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {timesheets.map((timesheet) => {
            const config = getStatusConfig(timesheet.status);
            const ActionIcon = config.actionIcon;

            return (
              <div
                key={timesheet.id}
                className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Week {timesheet.week}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {timesheet.date}
                    </p>
                  </div>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${config.className}`}
                  >
                    {config.label}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{timesheet.hours} hours</span>
                  </div>
                  <button
                    onClick={() => handleAction(timesheet)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors ${config.actionClass} bg-blue-50 hover:bg-blue-100`}
                  >
                    <ActionIcon size={16} />
                    {config.action}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TableView;
