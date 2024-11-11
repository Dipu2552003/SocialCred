import { useState } from "react";
import axios from "axios";

const AnalysisPage = () => {
  const [file, setFile] = useState(null);
  const [dropdownValue, setDropdownValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle dropdown value change
  const handleDropdownChange = (e) => {
    setDropdownValue(e.target.value);
  };

  // Handle sentiment analysis request
  const handleAnalyzeSentiment = async () => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    if (!dropdownValue) {
      alert("Please select a valid dropdown value.");
      return;
    }

    setLoading(true);
    setError("");

    // Create FormData to send file and dropdown value
    const formData = new FormData();
    formData.append("file", file); // Append file
    formData.append("dropdown", dropdownValue); // Append dropdown value

    try {
      const response = await axios.post(
        "http://localhost:5000/api/analyze_sentiment", // Update this URL to your backend endpoint
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      setError("Error analyzing sentiment.");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sentiment Analysis</h1>

      {/* File upload input */}
      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="fileInput"
        >
          Upload File:
        </label>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      {/* Dropdown selection */}
      <div className="mb-4">
        <label
          className="block text-gray-700 font-semibold mb-2"
          htmlFor="dropdown"
        >
          Select Option:
        </label>
        <select
          id="dropdown"
          value={dropdownValue}
          onChange={handleDropdownChange}
          className="border border-gray-300 rounded p-2 w-full"
        >
          <option value="">-- Select --</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
      </div>

      {/* Analyze Sentiment button */}
      <div className="mb-4">
        <button
          onClick={handleAnalyzeSentiment}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 w-full"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>
      </div>

      {/* Display result or error */}
      {error && <p className="text-red-500">{error}</p>}
      {result && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Sentiment Analysis Result:</h3>
          <pre className="bg-gray-100 p-4 rounded mt-2">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AnalysisPage;
