import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormPage from "./components/FormPage.jsx";
import AnalysisPage from "./components/AnalysisPage";
import LandingPage from "./components/LandingPage.jsx";
import ReportPage from "./components/ReportPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;
