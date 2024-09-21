import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery) {
        try {
          const response = await axios.get(
            `https://registry.npmjs.org/-/v1/search`,
            {
              params: {
                text: debouncedQuery,
                size: 10, // Limiting suggestions
              },
            }
          );
          const packageSuggestions = response.data.objects.map((pkg) => ({
            name: pkg.package.name,
            description: pkg.package.description,
            version: pkg.package.version,
          }));

          setSuggestions(packageSuggestions);
        } catch (error) {
          console.error("Error fetching suggestions", error);
        }
      } else {
        setSuggestions([]); // Clear suggestions if the query is empty
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    setSuggestions([]); // Clear suggestions after search
    navigate(`/package?search=${searchTerm}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query) {
      handleSearch(query);
    }
  };

  return (
    <div className="w-full border-t-8 border-red-500">
      <div className="flex flex-wrap items-center justify-start gap-4 px-4 py-4 border-b">
        <Link to={"/"} className="flex items-center">
          <FaHeart className="text-xl" />
        </Link>
        <p className="hidden md:block">Pro</p>
        <p className="hidden md:block">Teams</p>
        <p className="hidden md:block">Pricing</p>
        <p className="hidden md:block">Documentation</p>
      </div>

      <div className="relative flex flex-col md:flex-row px-4 gap-5 py-5 shadow-lg">
        <div className="flex items-center space-x-3">
          <Link to={"/"}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/800px-Npm-logo.svg.png"
              alt="NPM Logo"
              className="h-10 px-1"
            />
          </Link>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search packages"
          className="w-full p-4 bg-gray-100 focus:border-indigo-600 focus:outline-none text-gray-900"
        />
        <button
          onClick={handleKeyPress}
          className="bg-black text-white px-10 py-2"
        >
          Search
        </button>

        {suggestions.length > 0 && (
          <ul className="absolute left-40 w-full md:w-[73rem] top-16 z-10 bg-white border mt-3 shadow-lg overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSearch(suggestion.name)}
                className="px-3 py-2 cursor-pointer border-t font-medium hover:bg-indigo-100 hover:text-indigo-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{suggestion.name}</div>
                    <div className="text-sm text-gray-500">
                      {suggestion.description}
                    </div>
                  </div>
                  <div className="text-sm text-black">
                    Version: {suggestion.version}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
