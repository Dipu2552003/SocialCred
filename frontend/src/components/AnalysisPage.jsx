import { useState, useEffect } from "react";
import axios from "axios";

const AnalysisPage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [dropdownValue, setDropdownValue] = useState(null); // Store dropdown value

  // Retrieve the financialPrediction from localStorage
  useEffect(() => {
    const userCache = localStorage.getItem("user");

    // Check if the cache exists and parse it
    if (userCache) {
      const user = JSON.parse(userCache); // Parse the string into an object
      if (user && user.prediction) {
        setDropdownValue(user.prediction); // Access the 'prediction' property (which is a string)
      } else {
        setDropdownValue(null); // Set to null if 'prediction' is not found
      }
    } else {
      setDropdownValue(null); // Set to null if there's no cached data
    }
  }, []);

  // Handle file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle sentiment analysis request
  const handleAnalyzeSentiment = async () => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    if (!dropdownValue) {
      alert("No sentiment value selected.");
      return;
    }

    setLoading(true);
    setError("");

    // Map the string value of dropdownValue to its corresponding numerical value
    let sentimentValue;
    if (dropdownValue === "Bad") sentimentValue = 1;
    else if (dropdownValue === "Neutral") sentimentValue = 2;
    else if (dropdownValue === "Good") sentimentValue = 3;

    // Create FormData to send file and mapped sentiment value
    const formData = new FormData();
    formData.append("file", file); // Append file
    formData.append("dropdown", sentimentValue); // Append the numerical sentiment value

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

      {/* Display the current dropdown value */}
      <div className="mb-4">
        <p className="font-semibold text-gray-700">
          Current Sentiment Value:{" "}
          {dropdownValue === "Bad"
            ? "Bad"
            : dropdownValue === "Neutral"
            ? "Neutral"
            : dropdownValue === "Good"
            ? "Good"
            : "None"}
        </p>
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
