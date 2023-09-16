import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import DifficultyLevel from "./components/DifficultyLevel";
import Quiz from "./components/Quiz";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<DifficultyLevel />} />
      <Route path="quiz" element={<Quiz />} />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
