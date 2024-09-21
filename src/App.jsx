import { Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import PackageDetail from "./pages/PackageDetail";
import VersionDetail from "./pages/VersionDetail";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/package" element={<SearchPage />} />
        <Route path="/package/:name" element={<PackageDetail />} />
        <Route path="/package/:name/:version" element={<VersionDetail />} />
      </Routes>
    </div>
  );
}

export default App;
