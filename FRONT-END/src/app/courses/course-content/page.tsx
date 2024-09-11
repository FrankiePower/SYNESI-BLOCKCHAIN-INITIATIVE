"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, Play, Bell } from "lucide-react";
import Link from "next/link";
import VideoEmbed from "@/components/youtube-embed";

const LessonAccordion = ({ title, isOpen, toggleOpen }: any) => (
  <div className="border-b border-gray-200">
    <button
      className="w-full py-4 px-6 flex justify-between items-center hover:bg-gray-50"
      onClick={toggleOpen}
    >
      <span className="font-medium">{title}</span>
      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {isOpen && (
      <div className="py-2 px-6 bg-gray-50">
        {/* Lesson content would go here */}
        <p>Lesson content for {title}</p>
      </div>
    )}
  </div>
);

const CourseContentPage = () => {
  const [openLesson, setOpenLesson] = useState<number | null>(0);

  const lessons = [
    "Introduction to Base Blockchain",
    "Why Base Blockchain",
    "How to use Base Blockchain",
    "Benefits of Base Blockchain",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Base Blockchain</h2>
              <Link href="/courses">
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                  Back to Courses
                </button>
              </Link>
            </div>
            <div className="relative pt-[56.25%]">
              <VideoEmbed videoId="khZrWdAOirw"/>
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-white bg-opacity-75 rounded-full flex items-center justify-center">
                  <Play size={32} className="text-primary-blue" />
                </button>
              </div>
            </div>
          </div>
          <div>
            {lessons.map((lesson, index) => (
              <LessonAccordion
                key={index}
                title={lesson}
                isOpen={openLesson === index}
                toggleOpen={() =>
                  setOpenLesson(openLesson === index ? null : index)
                }
              />
            ))}
          </div>
          <div className="p-6 border-t border-gray-200">
            <button className="w-full px-4 py-2 bg-primary-blue text-white rounded hover:bg-blue-700">
              Continue
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseContentPage;
