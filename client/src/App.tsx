import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./global.css";
import { TitlesPage } from "./pages/titles/index";
import { ProjectPage } from "./pages/projects";
import { TitlePage } from "./pages/title";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TitlesPage />} />
        <Route path="/projects" element={<ProjectPage />} />
        <Route path="/titles/:titleId" element={<TitlePage />} />
      </Routes>
    </BrowserRouter>
  );
}
