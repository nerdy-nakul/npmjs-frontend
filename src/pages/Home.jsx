import React from "react";

const Home = () => {
  const popularLibs = [
    "react",
    "react-dom",
    "lodash",
    "axios",
    "tslib",
    "chalk",
    "next",
    "inquirer",
    "express",
    "commander",
  ];

  const categories = [
    "Front-end",
    "Back-end",
    "CLI",
    "CSS",
    "Testing",
    "IoT",
    "Coverage",
    "Mobile",
    "Documentation",
    "Robotics",
    "Math",
    "Frameworks",
  ];

  const stats = [
    { label: "Packages", value: "3,316,396" },
    { label: "Downloads - Last Week", value: "62,425,449,641" },
    { label: "Downloads - Last Month", value: "265,683,728,772" },
  ];

  return (
    <div className="w-full px-4 lg:px-8">
      {/* Main Flexbox Section */}
      <div className="flex flex-wrap justify-between gap-8">
        <div className="flex-1 min-w-[300px] p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b-4 border-red-500 py-2">
            Popular libraries
          </h2>
          <ul className="space-y-2">
            {popularLibs.map((lib, index) => (
              <li
                key={index}
                className="bg-white font-medium py-1 rounded hover:text-red-500 border-b cursor-pointer text-sm sm:text-base"
              >
                {lib}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 min-w-[300px] p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b-4 border-red-500 py-2">
            Discover packages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category, index) => (
              <div
                key={index}
                className="py-2 px-4 border text-sm font-medium bg-white rounded hover:bg-red-200 cursor-pointer text-center"
              >
                {category}
              </div>
            ))}
          </div>
        </div>

        {/* By the Numbers */}
        <div className="flex-1 min-w-[300px] p-6">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 border-b-4 border-red-500 py-2">
            By the numbers
          </h2>
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <div key={index}>
                <span className="block text-xl sm:text-2xl font-bold">
                  {stat.value}
                </span>
                <span className="text-gray-700 text-sm sm:text-base">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
