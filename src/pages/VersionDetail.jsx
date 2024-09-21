import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function VersionDetail() {
  const { name, version } = useParams();
  const [versionData, setVersionData] = useState(null);

  useEffect(() => {
    const fetchVersionData = async () => {
      try {
        const response = await axios.get(
          `https://registry.npmjs.org/${name}/${version}`
        );
        setVersionData(response.data);
      } catch (error) {
        console.error("Error fetching version details", error);
      }
    };
    fetchVersionData();
  }, [name, version]);

  if (!versionData) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {versionData.name} -{" "}
          <span className="text-indigo-600">{versionData.version}</span>
        </h1>
        <p className="text-gray-700 mb-6">{versionData.description}</p>

        {versionData.license && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              License
            </h2>
            <p className="text-gray-600">{versionData.license}</p>
          </div>
        )}

        {versionData.repository && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Repository
            </h2>
            <a
              href={versionData.repository.url}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {versionData.repository.url}
            </a>
          </div>
        )}

        {versionData.homepage && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Homepage
            </h2>
            <a
              href={versionData.homepage}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {versionData.homepage}
            </a>
          </div>
        )}

        {versionData.bugs && versionData.bugs.url && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Bug Reports
            </h2>
            <a
              href={versionData.bugs.url}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {versionData.bugs.url}
            </a>
          </div>
        )}

        {versionData.dependencies &&
          Object.keys(versionData.dependencies).length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Dependencies
              </h2>
              <ul className="list-disc list-inside space-y-2">
                {Object.keys(versionData.dependencies).map((dep) => (
                  <li key={dep} className="text-gray-600">
                    <span className="font-medium">{dep}:</span>{" "}
                    {versionData.dependencies[dep]}
                  </li>
                ))}
              </ul>
            </div>
          )}

        {versionData.maintainers && versionData.maintainers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Maintainers
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {versionData.maintainers.map((maintainer) => (
                <li key={maintainer.name} className="text-gray-600">
                  {maintainer.name} -{" "}
                  <a
                    href={`mailto:${maintainer.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {maintainer.email}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {versionData.dist && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Distribution
            </h2>
            <p className="text-gray-600">
              <strong>Tarball:</strong>{" "}
              <a
                href={versionData.dist.tarball}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {versionData.dist.tarball}
              </a>
            </p>
            <p className="text-gray-600">
              <strong>Shasum:</strong> {versionData.dist.shasum}
            </p>
            <p className="text-gray-600">
              <strong>File Count:</strong> {versionData.dist.fileCount}
            </p>
            <p className="text-gray-600">
              <strong>Unpacked Size:</strong> {versionData.dist.unpackedSize}{" "}
              bytes
            </p>
          </div>
        )}

        {versionData.exports && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Exports
            </h2>
            <pre className="bg-gray-100 p-4 rounded text-sm text-gray-700 overflow-auto">
              {JSON.stringify(versionData.exports, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default VersionDetail;
