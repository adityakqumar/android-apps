// src/components/Footer.tsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 py-10 transition-colors">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="font-extrabold text-base text-slate-900 dark:text-white">
                FreeAPKStore
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
                100% Free
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct, unthrottled APK downloads published directly by the developer.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/apps" className="hover:text-primary transition-colors">
              All Apps
            </Link>
            <Link to="/admin" className="hover:text-primary transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500">
          <p>© {new Date().getFullYear()} FreeAPKStore. All Android APK binaries are virus-scanned & safe.</p>
          <p>Android is a trademark of Google LLC.</p>
        </div>
      </div>
    </footer>
  );
}
