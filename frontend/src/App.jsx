import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout.jsx";
import { AdminLayout } from "./layouts/AdminLayout.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { AdminRoute } from "./components/AdminRoute.jsx";

import { HomePage }            from "./pages/HomePage.jsx";
import { LoginPage }           from "./pages/LoginPage.jsx";
import { SignupPage }           from "./pages/SignupPage.jsx";
import { ForgotPasswordPage }  from "./pages/ForgotPasswordPage.jsx";
import { ResetPasswordPage }   from "./pages/ResetPasswordPage.jsx";

import { EditorPage }          from "./pages/EditorPage.jsx";
import { ProblemListPage }     from "./pages/ProblemListPage.jsx";
import { ProblemDetailPage }   from "./pages/ProblemDetailPage.jsx";
import { ProfilePage }         from "./pages/ProfilePage.jsx";

import { StreakPage }          from "./pages/Streakpage.jsx";
import { SavedCodesPage }      from "./pages/SavedCodesPage.jsx";
import { PracticePathsPage }   from "./pages/PracticePathsPage.jsx";
import { LeaderboardPage }     from "./pages/LeaderboardPage.jsx";
import { RewardsPage }         from "./pages/RewardsPage.jsx";

import { AiChatPage }          from "./pages/AiChatPage.jsx";

import { AdminDashboardPage }  from "./pages/admin/AdminDashboardPage.jsx";
import { AdminUsersPage }      from "./pages/admin/AdminUsersPage.jsx";
import { AdminProblemsPage }   from "./pages/admin/AdminProblemsPage.jsx";
export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>

        <Route path="/"                element={<HomePage />} />
        <Route path="/login"           element={<LoginPage />} />
        <Route path="/signup"          element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password"  element={<ResetPasswordPage />} />
        <Route path="/practice-paths"  element={<PracticePathsPage />} />
        <Route path="/languages"       element={<Navigate to="/editor" replace />} />
        <Route path="/lessons/:id"     element={<Navigate to="/editor" replace />} />
        <Route path="/problems"        element={<ProblemListPage />} />

        <Route path="/problems/:slug"  element={<ProtectedRoute><ProblemDetailPage /></ProtectedRoute>} />
        <Route path="/dashboard"       element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/editor"          element={<ProtectedRoute><EditorPage /></ProtectedRoute>} />
        <Route path="/streak"          element={<ProtectedRoute><StreakPage /></ProtectedRoute>} />
        <Route path="/leaderboard"     element={<LeaderboardPage />} />
        <Route path="/rewards"         element={<ProtectedRoute><RewardsPage /></ProtectedRoute>} />
        <Route path="/ai-learn"        element={<Navigate to="/" replace />} />
        <Route path="/ai-chat"         element={<ProtectedRoute><AiChatPage /></ProtectedRoute>} />
        <Route path="/milestones"      element={<Navigate to="/streak" replace />} />
        <Route path="/saved-codes"     element={<ProtectedRoute><SavedCodesPage /></ProtectedRoute>} />
        <Route path="/profile"         element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>

      <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route path="/admin"              element={<Navigate to="/dashboard" replace />} />
        <Route path="/admin/users"        element={<AdminUsersPage />} />
        <Route path="/admin/lessons"      element={<Navigate to="/admin/problems" replace />} />
        <Route path="/admin/problems"     element={<AdminProblemsPage />} />
        <Route path="/admin/student-work" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}