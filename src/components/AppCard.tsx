// src/components/AppCard.tsx
import { Link } from "react-router-dom";

export interface AppMeta {
  id: string;
  name: string;
  slug: string;
  description?: string;
  short_description?: string;
  icon_url?: string;
  iconUrl?: string;
  version: string;
  size: string;
  category?: string;
  download_count?: number;
  apk_url?: string;
  screenshots?: string[];
  sha256?: string;
}

interface AppCardProps {
  app: AppMeta;
}

export default function AppCard({ app }: AppCardProps) {
  const icon = app.icon_url || app.iconUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80";
  const desc = app.short_description || app.description || "Fast, lightweight and modern Android application.";

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700/60 overflow-hidden flex flex-col group hover:-translate-y-1">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          <img
            src={icon}
            alt={`${app.name} icon`}
            className="w-16 h-16 rounded-2xl object-cover shadow-sm ring-1 ring-slate-900/5 group-hover:scale-105 transition-transform duration-300 bg-slate-100 dark:bg-slate-700 flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80";
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
              {app.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40">
                v{app.version}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {app.size}
              </span>
            </div>
            {app.category && (
              <span className="inline-block mt-1 text-xs text-slate-400 dark:text-slate-500">
                {app.category}
              </span>
            )}
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 mb-4 flex-1">
          {desc}
        </p>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between mt-auto">
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            Verified APK
          </span>
          <Link
            to={`/apps/${app.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-blue-600 shadow-sm transition-all duration-200 group-hover:shadow-md"
          >
            Get App
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
