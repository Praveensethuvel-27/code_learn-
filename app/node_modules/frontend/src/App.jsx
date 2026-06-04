import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout.jsx";
import { AdminLayout } from "./layouts/AdminLayout.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { AdminRoute } from "./components/AdminRoute.jsx";

import { HomePage } from "./pages/HomePage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { SignupPage } from "./pages/SignupPage.jsx";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage.jsx";
import { ResetPasswordPage } from "./pages/ResetPasswordPage.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { LanguagesPage } from "./pages/LanguagesPage.jsx";
import { LessonPage } from "./pages/LessonPage.jsx";
import { EditorPage } from "./pages/EditorPage.jsx";
import { ProblemListPage } from "./pages/ProblemListPage.jsx";
import { ProblemDetailPage } from "./pages/ProblemDetailPage.jsx";
import { ProfilePage } from "./pages/ProfilePage.jsx";

import { AdminUsersPage } from "./pages/admin/AdminUsersPage.jsx";
import { AdminLessonsPage } from "./pages/admin/AdminLessonsPage.jsx";
import { AdminProblemsPage } from "./pages/admin/AdminProblemsPage.jsx";
import { AdminStudentWorkPage } from "./pages/admin/AdminStudentWorkPage.jsx";

export default function App() {
  return (
    <Routes>
      {/* Main app layout (top navbar) */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/languages" element={<LanguagesPage />} />
        <Route path="/lessons/:id" element={<LessonPage />} />
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />
        <Route path="/problems" element={<ProblemListPage />} />
        <Route
          path="/problems/:slug"
          element={
            <ProtectedRoute>
              <ProblemDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      {/* Admin routes — sidebar AdminLayout */}
      <Route
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
        <Route path="/admin/users" element={<AdminUsersPage />} />
        <Route path="/admin/lessons" element={<AdminLessonsPage />} />
        <Route path="/admin/problems" element={<AdminProblemsPage />} />
        <Route path="/admin/student-work" element={<AdminStudentWorkPage />} />
      </Route>
    </Routes>
  );
}
