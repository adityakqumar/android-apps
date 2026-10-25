// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Apps from "./pages/Apps";
import AppDetail from "./pages/AppDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { supabase } from "./supabase/client";
import { useEffect, useState } from "react";

import type { ReactNode } from "react";

function App() {
  const [adminSession, setAdminSession] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // 1. Check existing session on boot
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAdminSession(session);
      setCheckingAuth(false);
    }).catch(() => {
      setCheckingAuth(false);
    });

    // 2. Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAdminSession(session);
      setCheckingAuth(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const RequireAdmin = ({ children }: { children: ReactNode }) => {
    if (checkingAuth) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }
    return adminSession ? children : <Navigate to="/admin/login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/apps/:slug" element={<AppDetail />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/*"
          element={
            <RequireAdmin>
              <AdminDashboard />
            </RequireAdmin>
          }
        />
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white">
              <h1 className="text-6xl font-black text-primary mb-4">404</h1>
              <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
              <p className="text-slate-500 mb-6">The page you requested does not exist.</p>
              <a href="/" className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
                Back to Home
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
