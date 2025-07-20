"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    handleResize();
    handleScroll();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
    setDropdownOpen(false);
  };

  const isActive = (href) => pathname === href;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-sm border-b border-gray-200"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <nav className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between h-16">
            {/* Left: Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center group">
                  <span className="text-xl font-bold text-gray-900 tracking-tight">
                    ticktock
                  </span>
                </Link>
              </div>

              {/* Center: Navigation */}
              <div className="">
                <Link
                  href="#"
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200`}
                >
                  Timesheets
                </Link>
              </div>
            </div>

            <div className="flex">
              <div className="">
                <Link
                  href="/"
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive("/")
                      ? "text-blue-500 underline underline-offset-4 decoration-2"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Table View
                </Link>
              </div>
              <div className="">
                <Link
                  href="/listview"
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive("/listview")
                      ? "text-blue-500 underline underline-offset-4 decoration-2"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  List View
                </Link>
              </div>
            </div>

            {/* Right: User Menu */}
            <div className="flex items-center">
              {session ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none"
                  >
                    <span>{session.user?.name || "John Doe"}</span>
                    <svg
                      className={`ml-2 h-4 w-4 transition-transform duration-200 ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 transition-all duration-200 origin-top-right ${
                      dropdownOpen
                        ? "opacity-100 scale-100 translate-y-0"
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          isActive("/profile")
                            ? "text-blue-500 bg-blue-50"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                          isActive("/settings")
                            ? "text-blue-500 bg-blue-50"
                            : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                        onClick={() => setDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive("/login")
                      ? "text-blue-500 underline underline-offset-4 decoration-2"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex md:hidden items-center justify-between h-16">
            {/* Left: Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-lg font-bold text-gray-900 tracking-tight">
                  ticktock
                </span>
              </Link>
            </div>

            {/* Right: Mobile Menu Button */}
            <div className="flex items-center space-x-3">
              {session && (
                <span className="text-sm text-gray-700 font-medium">
                  {session.user?.name || "John Doe"}
                </span>
              )}

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 transition-all duration-200"
                aria-expanded={isOpen}
                aria-label="Toggle navigation menu"
              >
                <div className="w-6 h-6 flex flex-col justify-center">
                  <span
                    className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                      isOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                      isOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                      isOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-4 bg-white border-t border-gray-200">
            <div className="space-y-1">
              <Link
                href="#"
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 `}
                onClick={() => setIsOpen(false)}
              >
                Timesheets
              </Link>
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive("/")
                    ? "text-blue-500 underline underline-offset-4 decoration-2 bg-blue-50"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                Table View
              </Link>

              <Link
                href="/listview"
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive("/listview")
                    ? "text-blue-500 underline underline-offset-4 decoration-2 bg-blue-50"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => setIsOpen(false)}
              >
                List View
              </Link>

              {session ? (
                <>
                  <Link
                    href="/profile"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive("/profile")
                        ? "text-blue-500 underline underline-offset-4 decoration-2 bg-blue-50"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive("/settings")
                        ? "text-blue-500 underline underline-offset-4 decoration-2 bg-blue-50"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    Settings
                  </Link>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive("/login")
                      ? "text-blue-500 underline underline-offset-4 decoration-2 bg-blue-50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
