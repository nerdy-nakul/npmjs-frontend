import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";

function PackageDetail() {
  const { name } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get(`https://registry.npmjs.org/${name}`);
        setPackageData(response.data);
      } catch (error) {
        console.error("Error fetching package details", error);
      }
    };
    fetchPackageData();
  }, [name]);

  if (!packageData) return <div className="p-4">Loading...</div>;

  const totalVersions = Object.keys(packageData.versions).length;
  const totalPages = Math.ceil(totalVersions / itemsPerPage);
  const versionKeys = Object.keys(packageData.versions).reverse();
  const currentVersions = versionKeys.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {packageData.name}
        </h1>
        <p className="text-gray-700 mb-6">{packageData.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packageData.maintainers.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Maintainers
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {packageData.maintainers.map((maintainer) => (
                  <li key={maintainer.name} className="text-gray-600">
                    {maintainer.name} -{" "}
                    <a href={`mailto:${maintainer.email}`} className="text-blue-500">
                      {maintainer.email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Additional Information
            </h2>
            <p className="text-gray-600">
              <strong>License:</strong> {packageData.license}
            </p>
            <p className="text-gray-600">
              <strong>Homepage:</strong>{" "}
              <a href={packageData.homepage} className="text-blue-500 hover:underline">
                {packageData.homepage}
              </a>
            </p>
            <p className="text-gray-600">
              <strong>Repository:</strong>{" "}
              <a href={packageData.repository.url} className="text-blue-500 hover:underline">
                {packageData.repository.url}
              </a>
            </p>
            <p className="text-gray-600">
              <strong>Bug Reports:</strong>{" "}
              <a href={packageData.bugs.url} className="text-blue-500 hover:underline">
                {packageData.bugs.url}
              </a>
            </p>
          </div>
        </div>

        {packageData.dependencies && Object.keys(packageData.dependencies).length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Dependencies
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {Object.keys(packageData.dependencies).map((dep) => (
                <li key={dep} className="text-gray-600">
                  {dep} - {packageData.dependencies[dep]}
                </li>
              ))}
            </ul>
          </div>
        )}

        {packageData.keywords && packageData.keywords.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Tags</h2>
            <div className="flex flex-wrap space-x-2">
              {packageData.keywords.map((tag, index) => (
                <span key={index} className="bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Versions</h2>
          <ul className="list-disc list-inside space-y-4">
            {currentVersions.map((version) => {
              const versionInfo = packageData.versions[version];
              return (
                <li key={version} className="border-b pb-2">
                  {/* Replace <a> with <Link> for internal navigation */}
                  <Link to={`/package/${name}/${version}`} className="text-blue-500 hover:underline">
                    {version}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex justify-between items-center mt-4">
            <button
              className={`px-3 py-1 rounded bg-blue-500 text-white ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-3 py-1 rounded bg-blue-500 text-white ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageDetail;
