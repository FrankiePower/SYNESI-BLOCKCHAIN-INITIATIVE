import React from "react";
import { Bell, Settings } from "lucide-react";

const Sidebar = () => (
  <div className="w-64 bg-white p-4 border-r border-gray-200">
    <h1 className="text-2xl font-bold text-blue-600 mb-8">Synesi</h1>
    <nav>
      <ul className="space-y-2">
        <li>
          <a
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
          >
            Overview
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-4 bg-blue-600 text-white rounded"
          >
            My Courses
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
          >
            Achievements
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
          >
            Notifications
          </a>
        </li>
        <li>
          <a
            href="#"
            className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded"
          >
            Settings
          </a>
        </li>
      </ul>
    </nav>
  </div>
);

const Header = () => (
  <header className="bg-white p-4 flex justify-between items-center border-b border-gray-200">
    <h2 className="text-xl font-semibold">My Courses</h2>
    <div className="flex items-center space-x-4">
      <Bell className="text-gray-600" />
      <div className="flex items-center space-x-2">
        <img
          src="/api/placeholder/32/32"
          alt="User avatar"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-sm font-medium">stephen.eth</span>
      </div>
    </div>
  </header>
);

const CourseCard = ({ title, description, image, progress }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={image} alt={title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{progress}% Complete</span>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Start Course
        </button>
      </div>
    </div>
  </div>
);

const MyCoursesPage = () => {
  const courses = [
    {
      title: "Base Blockchain",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat ...",
      image: "/api/placeholder/400/320",
      progress: 0,
    },
    {
      title: "Lisk Blockchain",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat ...",
      image: "/api/placeholder/400/320",
      progress: 0,
    },
    {
      title: "Optimization",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat ...",
      image: "/api/placeholder/400/320",
      progress: 0,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyCoursesPage;
