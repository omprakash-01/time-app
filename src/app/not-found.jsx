
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-green-600">404</h1>
        <p className="mt-4 text-xl font-semibold text-gray-800">
          Page Not Found
        </p>
        <p className="mt-2 text-gray-600">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
