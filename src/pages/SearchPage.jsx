import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";

function SearchPage() {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPackages, setTotalPackages] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("popularity"); // Default sorting

  const query = searchParams.get("search") || "";

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(
        `https://registry.npmjs.org/-/v1/search`,
        {
          params: {
            text: query,
            from: (page - 1) * 20,
            size: 20,
            sort: sortBy,
          },
        }
      );
      setResults(response.data.objects);
      setTotalPackages(response.data.total);
      setTotalPages(Math.ceil(response.data.total / 20));
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, [query, page, sortBy]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row px-4 md:px-8 my-8">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 border-r md:border-r-2 md:border-gray-300 mb-4 md:mb-0">
        <h2 className="text-lg font-semibold mb-4">Sort by</h2>
        <div className="flex flex-col">
          {["popularity", "quality", "maintenance"].map((option) => (
            <label
              key={option}
              className="flex items-center mb-2 border-b pb-1"
            >
              <input
                type="radio"
                value={option}
                checked={sortBy === option}
                onChange={() => {
                  setSortBy(option);
                  setPage(1);
                }}
                className="mr-2"
              />
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </label>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-3/4 flex flex-col">
        <div className="bg-white rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Total {totalPackages} Packages Found for "{query}"
            </h1>
            {/* Pagination Controls */}
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="flex items-center">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {results.length > 0 ? (
              results.map((pkg) => (
                <div
                  key={pkg.package.name}
                  className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <Link
                    to={`/package/${pkg.package.name}`}
                    className="hover:underline text-indigo-600"
                  >
                    <h3 className="text-xl font-semibold text-indigo-600 hover:text-indigo-800">
                      {pkg.package.name}
                    </h3>
                  </Link>
                  <p className="text-gray-700 mt-1">
                    {pkg.package.description}
                  </p>
                  <div className="flex flex-wrap mt-2">
                    {pkg.package.keywords &&
                      pkg.package.keywords.map((k, index) => (
                        <span
                          key={index}
                          className="mr-1 mb-1 font-medium rounded-lg px-2 py-1 bg-gray-400 text-white text-sm"
                        >
                          {k}
                        </span>
                      ))}
                  </div>
                  <p className="mt-2 text-gray-600 text-sm flex items-center">
                    <span className="mr-2">Published by:</span>
                    <span className="font-semibold mr-2">
                      {pkg.package.publisher.username}
                    </span>
                    <span className="mx-2">|</span>
                    <span>Latest Version:</span>
                    <span className="font-semibold ml-1">
                      {pkg.package.version}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center mt-4">
                No results found for "
                <span className="font-semibold">{query}</span>"
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
