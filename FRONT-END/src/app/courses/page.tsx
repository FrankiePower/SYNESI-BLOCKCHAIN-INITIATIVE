import React from "react";
import Link from "next/link";

const CourseCard = ({ title, description, image, progress } : any) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={image} alt={title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{progress}% Complete</span>
        <Link href="/courses/course-content">
          <button className="px-4 py-2 bg-primary-blue text-white rounded">
            Start Course
          </button>
        </Link>
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
    <main className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </main>
  );
};

export default MyCoursesPage;