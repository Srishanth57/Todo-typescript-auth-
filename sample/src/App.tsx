import { Navigate, Route, Routes } from "react-router";

// import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import { NotFound } from "./components/NotFound";
import SignupForm from "./components/SignupForm";

import "./index.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      {/* used <LoginForm/> for rendering the jsx    */}
      <Route path="login" element={<LoginForm />} />
      <Route path="signup" element={<SignupForm />} />
      {/* Used element={Home} for rendering the component rather than jsx */}

      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
}

export default App;
