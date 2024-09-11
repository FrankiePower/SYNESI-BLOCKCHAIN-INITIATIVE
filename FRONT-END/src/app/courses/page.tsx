import React from "react";
import Link from "next/link";
import { baseLogo } from "@/assets";

const CourseCard = ({ title, description, image, progress, slug }: any) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={image.src!} alt={title} className="w-full h-40 object-contain" />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{progress}% Complete</span>
        <Link href={`/courses/course-content`}>
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
        "Learn blockchain fundamentals, smart contracts, and decentralized applications in this beginner-friendly 15-lesson course ...",
      image: baseLogo,
      progress: 0,
    }
  ];

  return (
    <main className="p-6">
      <h2 className="text-2xl mt-3 mb-5 leading-tight tracking-tighter text-primary-blue">All available courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </main>
  );
};

export default MyCoursesPage;
