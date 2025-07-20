import React from "react";
import { AlertTriangle } from "lucide-react";

function ApiError({ error }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-6 shadow-md flex items-start gap-4 max-w-2xl mx-auto">
      <div className="mt-1">
        <AlertTriangle className="w-6 h-6 text-red-500" />
      </div>
      <div>
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="text-sm text-red-700 mt-1">{error}</p>
      </div>
    </div>
  );
}

export default ApiError;
