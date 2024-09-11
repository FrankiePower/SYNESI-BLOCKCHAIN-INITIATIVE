import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { avatar, baseLogo, homeIllustration } from "@/assets";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="py-20 px-4 bg-[#f0f5fa]">
          <div className="container mx-auto flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#004080]">
                Unlock the Power of Blockchain Knowledge
              </h1>
              <p className="text-xl mb-6 text-gray-600">
                Learn from industry experts and master blockchain technology
              </p>
              <Link href={"/verification"}>
                <Button
                  size="lg"
                  className="mr-4 bg-[#004080] hover:bg-[#003366]"
                >
                  Get Started
                </Button>
              </Link>
              <Link href={"/about"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-[#004080] border-[#004080] hover:bg-[#004080] hover:text-white"
                >
                  Learn More
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src={homeIllustration.src}
                alt="Blockchain Education"
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center text-[#004080]">
              Featured Courses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <img
                      src={baseLogo.src}
                      alt={`Course ${i}`}
                      className="w-full h-40 object-contain mb-4 rounded"
                    />
                    <h3 className="text-xl font-semibold mb-2 text-[#004080]">
                      Build on base
                    </h3>
                    <p className="text-gray-600 mb-4">
                    Learn blockchain fundamentals, smart contracts, and decentralized applications in this beginner-friendly 15-lesson course ...
                    </p>
                    <Link href="/courses">
                      <Button
                        variant="outline"
                        className="w-full text-[#004080] border-[#004080] hover:bg-[#004080] hover:text-white"
                      >
                        Enroll Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center text-[#004080]">
              What Our Students Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <p className="text-gray-600 mb-4">
                      &ldquo;This course has been incredibly helpful in
                      understanding blockchain technology. Highly
                      recommended!&rdquo;
                    </p>
                    <div className="flex items-center">
                      <Image
                        src={avatar}
                        alt={`Student ${i}`}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <p className="font-semibold text-[#004080]">
                          Student {i}
                        </p>
                        <p className="text-sm text-gray-500">Web Developer</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 bg-[#004080] text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Join the revolution. Start learning blockchain today!
            </h2>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full md:w-64 bg-white text-black"
              />
              <Button
                variant="secondary"
                className="bg-white text-[#004080] hover:bg-gray-100"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#002040] text-white py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Partners
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Courses</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Blockchain Basics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Smart Contracts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Cryptocurrency
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-[#66a3ff]">
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#003366] text-center">
            <p>&copy; 2023 SynesiBlockchain Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
