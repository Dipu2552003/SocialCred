import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user information from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");
    setUser(null); // Clear user state
    alert("You have been logged out");
    // Redirect to LandingPage after logout
    navigate("/");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4">
        User Information
      </h2>
      {user ? (
        <div className="space-y-4">
          {/* Display the entire user object */}
          <pre className="bg-gray-100 p-4 rounded-md">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      ) : (
        <p>No user information available</p>
      )}
      <button
        onClick={handleLogout}
        className="mt-4 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default ReportPage;
