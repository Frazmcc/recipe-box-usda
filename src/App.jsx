import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RecipesPage from "@/pages/RecipesPage.jsx";
import RecipeDetail from "@/pages/RecipeDetail.jsx";
export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/recipes' replace />} />
        <Route path='/recipes' element={<RecipesPage />} />
        <Route path='/recipe/:id' element={<RecipeDetail />} />
        <Route path='*' element={<Navigate to='/recipes' replace />} />
      </Routes>
    </BrowserRouter>
  );
}