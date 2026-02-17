import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Translate from "./pages/Translator";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Home />} />

      
      <Route
        path="/translator"
        element={
          <ProtectedRoute>
            <Translate />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
