// src/pages/Apps.tsx
import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../supabase/client";
import AppCard, { type AppMeta } from "../components/AppCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FALLBACK_APPS: AppMeta[] = [
  {
    id: "app-photo-recovery",
    name: "DeepScan Photo & File Recovery",
    slug: "photo-recovery-scanner",
    version: "1.0.0",
    size: "6.5 MB",
    category: "Tools",
    short_description: "Deep scan internal phone memory & SD cards to recover deleted photos, videos, and media without root.",
    icon_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=150&auto=format&fit=crop&q=80",
    apk_url: "https://github.com/adityakqumar/android-apps/releases/download/v1.0.0/app-debug.apk",
  },
  {
    id: "app-1",
    name: "AKP File Manager",
    slug: "akp-file-manager",
    version: "1.4.2",
    size: "12.8 MB",
    category: "Tools",
    short_description: "Ultra-fast, zero-ads Android storage and file explorer with root access support.",
    icon_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "app-2",
    name: "NoteCraft Pro",
    slug: "notecraft-pro",
    version: "2.1.0",
    size: "8.4 MB",
    category: "Productivity",
    short_description: "Markdown notes and offline task manager with zero telemetry.",
    icon_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "app-3",
    name: "Pulse Audio Player",
    slug: "pulse-audio-player",
    version: "3.0.1",
    size: "16.2 MB",
    category: "Media & Video",
    short_description: "High-resolution offline lossless music player with 10-band equalizer.",
    icon_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "app-4",
    name: "SecureVault Crypt",
    slug: "securevault-crypt",
    version: "1.2.0",
    size: "9.6 MB",
    category: "Tools",
    short_description: "AES-256 encrypted local password and document locker for Android.",
    icon_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "app-5",
    name: "FocusPomodoro",
    slug: "focus-pomodoro",
    version: "1.0.5",
    size: "6.1 MB",
    category: "Productivity",
    short_description: "Distraction-free timer with ambient soundscapes and usage statistics.",
    icon_url: "https://images.unsplash.com/photo-1508962914676-134849a727f0?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "app-6",
    name: "TerminalX Shell",
    slug: "terminalx-shell",
    version: "2.4.0",
    size: "21.5 MB",
    category: "Tools",
    short_description: "Full-featured Linux terminal emulator and package manager environment.",
    icon_url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=150&auto=format&fit=crop&q=80",
  },
];

const CATEGORIES = ["All", "Tools", "Productivity", "Media & Video", "Personalization"];

export default function Apps() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "All";

  const [apps, setApps] = useState<AppMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<"newest" | "name" | "size">("newest");

  useEffect(() => {
    async function fetchApps() {
      try {
        const { data, error } = await supabase
          .from("apps")
          .select("id, name, short_description, description, icon_url, version, size, slug, category, created_at")
          .eq("published", true)
          .order("created_at", { ascending: false });

        if (error || !data || data.length === 0) {
          setApps(FALLBACK_APPS);
        } else {
          setApps(data);
        }
      } catch {
        setApps(FALLBACK_APPS);
      } finally {
        setLoading(false);
      }
    }

    fetchApps();
  }, []);

  // Sync state with URL params
  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === "All") {
      newParams.delete("category");
    } else {
      newParams.set("category", cat);
    }
    setSearchParams(newParams);
  };

  const filteredApps = useMemo(() => {
    return apps
      .filter((app) => {
        const matchesCategory =
          selectedCategory === "All" ||
          app.category?.toLowerCase() === selectedCategory.toLowerCase();
        const matchesSearch =
          app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (app.short_description || app.description || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.slug.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "size") {
          const sizeA = parseFloat(a.size) || 0;
          const sizeB = parseFloat(b.size) || 0;
          return sizeA - sizeB;
        }
        return 0; // Default order
      });
  }, [apps, selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        {/* Page Title & Breadcrumb */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            All Android Applications
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm sm:text-base">
            Browse and download safe, free APK files without accounts or subscriptions.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/60 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search APKs by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />
              <svg
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/40"
              >
                <option value="newest">Newest First</option>
                <option value="name">Alphabetical (A-Z)</option>
                <option value="size">Smallest File Size</option>
              </select>
            </div>
          </div>

          {/* Categories Pill List */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-650"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-6 px-1">
          <span>Found {filteredApps.length} applications</span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-primary hover:underline font-medium"
            >
              Clear search filter
            </button>
          )}
        </div>

        {/* Apps Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-slate-500 font-medium">Loading applications...</p>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-700/60 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No applications match your criteria</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
              Try adjusting your search terms or select another category.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
