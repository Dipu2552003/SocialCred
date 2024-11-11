import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormPage from "./components/FormPage.jsx";
import AnalysisPage from "./components/AnalysisPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/form" element={<FormPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/" element={<FormPage />} />
      </Routes>
    </Router>
  );
}

export default App;
