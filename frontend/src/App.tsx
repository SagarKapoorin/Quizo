import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/auth';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import CreateQuiz from '@/pages/CreateQuiz';
import EditQuiz from '@/pages/EditQuiz';
import './App.css'

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-quiz"
            element={
              <PrivateRoute>
                <CreateQuiz />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-quiz/:id"
            element={
              <PrivateRoute>
                <EditQuiz />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;