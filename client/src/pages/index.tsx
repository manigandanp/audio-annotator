import { TitlesPage } from "./titles";
import { ProjectPage } from "./projects";
import { BrowserRouter, Routes, Route } from "react-router-dom";



export const Pages = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TitlesPage />} />
      <Route path="/projects" element={<ProjectPage />} />
    </Routes>
  </BrowserRouter>
  )
}