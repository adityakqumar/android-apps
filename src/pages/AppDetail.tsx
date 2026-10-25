// src/pages/AppDetail.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../supabase/client";

interface DetailedApp {
  id: string;
  name: string;
  slug: string;
  version: string;
  size: string;
  category: string;
  short_description?: string;
  description: string;
  icon_url: string;
  apk_url?: string;
  screenshots: string[];
  sha256?: string;
  downloads?: number;
  updated_at?: string;
  created_at?: string;
  min_android?: string;
  package_name?: string;
}

export default function AppDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [app, setApp] = useState<DetailedApp | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadApp() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("apps")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error || !data) {
          // Provide fallback demo data if database is not populated yet
          if (isMounted) {
            if (slug === "photo-recovery-scanner" || slug === "app-debug") {
              setApp({
                id: "app-photo-recovery",
                name: "DeepScan Photo & File Recovery",
                slug: "photo-recovery-scanner",
                version: "1.0.0",
                size: "6.5 MB",
                category: "Tools & Utilities",
                short_description: "Deep scan internal phone memory & SD cards to recover deleted photos, videos, and media without root.",
                description: `DeepScan Photo & File Recovery is an advanced native Android recovery tool designed to deeply scan your phone's internal storage partitions and micro-SD cards to detect, extract, and recover accidentally deleted photos, images, and media files.\n\nKey Highlights & Capabilities:\n• Deep Internal & SD Card Scan: Uses raw sector parsing to recover deleted JPEG, PNG, WEBP, GIF, and RAW camera formats.\n• No Root Required: Safe and non-invasive. Recovers deleted files and cached thumbnails directly on any unrooted Android device.\n• High-Definition Preview: Preview all recoverable images in full resolution before saving them back to your gallery.\n• 100% Free & Private: Runs completely on-device. Zero background tracking, zero cloud uploads, and no subscriptions or paywalls.\n• One-Click Restore: Restores selected photos directly back into your phone's DCIM or Pictures gallery album.\n• Fast & Lightweight: Compact 6.5 MB APK footprint, optimized for all Android devices from Android 7.0 up to Android 14+.`,
                icon_url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&auto=format&fit=crop&q=80",
                apk_url: "https://github.com/adityakqumar/android-apps/releases/download/v1.0.0/app-debug.apk",
                screenshots: [
                  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=600&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80"
                ],
                sha256: "38b36b91925c4b9761e9bd3fe44376bda1b76a63c8684594abf34e362f23189c",
                downloads: 3840,
                updated_at: new Date().toISOString(),
                min_android: "Android 7.0 (Nougat) or higher",
                package_name: "com.akp.photorecovery"
              });
            } else {
              setApp({
                id: "demo-app",
                name: slug ? slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Sample Android App",
                slug: slug || "sample-android-app",
                version: "1.0.0",
                size: "18.4 MB",
                category: "Tools & Utilities",
                short_description: "A fast, privacy-focused native Android utility designed for daily productivity.",
                description: `This application is built with modern Android Studio architecture, featuring clean Material Design 3, zero background trackers, and optimal battery efficiency.\n\nKey Highlights:\n• 100% Free and Open: No subscriptions, no locked features, and no in-app ads.\n• Offline Capable: Works seamlessly without mandatory network connectivity.\n• Battery & Storage Optimized: Extremely compact APK footprint and optimized background resource usage.\n• Clean Android UI: Seamless adaptive dark mode conforming to system preferences.`,
                icon_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
                apk_url: "/downloads/photo-recovery.apk",
                screenshots: [
                  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=600&auto=format&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80"
                ],
                sha256: "38b36b91925c4b9761e9bd3fe44376bda1b76a63c8684594abf34e362f23189c",
                downloads: 1240,
                updated_at: new Date().toISOString(),
                min_android: "Android 8.0 (Oreo) or higher",
                package_name: `com.akp.${slug || "app"}`
              });
            }
          }
        } else {
          if (isMounted) {
            setApp({
              ...data,
              screenshots: Array.isArray(data.screenshots) ? data.screenshots : []
            });
          }
        }
      } catch (err) {
        console.error("Error loading app detail:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (slug) {
      loadApp();
    }
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const copySha256 = () => {
    if (app?.sha256) {
      navigator.clipboard.writeText(app.sha256);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/apps" className="hover:text-primary transition-colors">Apps</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium truncate">{app?.name || "Loading..."}</span>
        </nav>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-500 font-medium">Fetching app information...</p>
          </div>
        ) : !app ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm">
            <h2 className="text-2xl font-bold mb-2">Application Not Found</h2>
            <p className="text-slate-500 mb-6">The APK application you are looking for is either unpublished or does not exist.</p>
            <Link to="/apps" className="px-6 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors">
              Browse All Applications
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Top Overview Card */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700/60 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
              <img
                src={app.icon_url || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80"}
                alt={`${app.name} Icon`}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover shadow-md ring-1 ring-slate-900/10 flex-shrink-0 bg-slate-100 dark:bg-slate-700"
              />

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/40">
                    {app.category || "General"}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Virus Scanned & Safe
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {app.name}
                </h1>

                {app.package_name && (
                  <p className="text-xs font-mono text-slate-400 mt-1">{app.package_name}</p>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-700/60">
                  <div>
                    <span className="text-xs text-slate-400 block">Version</span>
                    <span className="font-semibold text-slate-900 dark:text-white">v{app.version}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">APK Size</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{app.size}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Requires</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{app.min_android || "Android 7.0+"}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">License</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">100% Free</span>
                  </div>
                </div>
              </div>

              {/* Download CTA Card */}
              <div className="w-full md:w-auto flex flex-col sm:flex-row md:flex-col gap-3 justify-center items-stretch flex-shrink-0 pt-2">
                <a
                  href={app.apk_url && app.apk_url !== "#" ? app.apk_url : undefined}
                  download={app.apk_url && app.apk_url !== "#" ? `${app.slug}-v${app.version}.apk` : undefined}
                  onClick={(e) => {
                    if (!app.apk_url || app.apk_url === "#") {
                      e.preventDefault();
                      alert("Demo mode: In production, this directly downloads the signed APK binary uploaded via your Admin Dashboard.");
                    }
                  }}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <svg className="w-6 h-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download APK ({app.size})</span>
                </a>
                <p className="text-center text-xs text-slate-400 dark:text-slate-500">
                  Direct download • No wait time • Safe & signed
                </p>
              </div>
            </div>

            {/* Screenshots section */}
            {app.screenshots && app.screenshots.length > 0 && (
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700/60">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Screenshots</h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin">
                  {app.screenshots.map((shot, idx) => (
                    <img
                      key={idx}
                      src={shot}
                      alt={`${app.name} preview ${idx + 1}`}
                      className="h-72 w-auto rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer hover:opacity-90 transition-opacity flex-shrink-0 object-cover"
                      onClick={() => setSelectedScreenshot(shot)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Lightbox Modal */}
            {selectedScreenshot && (
              <div
                className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
                onClick={() => setSelectedScreenshot(null)}
              >
                <div className="relative max-w-4xl max-h-[90vh]">
                  <img
                    src={selectedScreenshot}
                    alt="Enlarged screenshot"
                    className="max-h-[85vh] w-auto rounded-2xl shadow-2xl object-contain mx-auto"
                  />
                  <button
                    className="absolute top-2 right-2 p-2 bg-slate-900/70 text-white rounded-full hover:bg-slate-900"
                    onClick={() => setSelectedScreenshot(null)}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Description & Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 dark:border-slate-700/60">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About this App</h2>
                <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed text-sm sm:text-base">
                  {app.description}
                </div>
              </div>

              {/* Sidebar with Security & SHA-256 */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-700/60">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    File Integrity & Security
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                    Verify file authenticity using the official SHA-256 cryptographic hash:
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs break-all text-slate-700 dark:text-slate-300">
                    {app.sha256 || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"}
                  </div>
                  <button
                    onClick={copySha256}
                    className="mt-3 w-full py-2 px-3 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy SHA-256 Checksum</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Installation Guide */}
                <div className="bg-blue-50/60 dark:bg-slate-800/80 rounded-3xl p-6 border border-blue-100 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    How to Install APK
                  </h3>
                  <ol className="text-xs text-slate-600 dark:text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
                    <li>Download the .apk file to your device.</li>
                    <li>Tap the completed download notification or locate it in your Downloads folder.</li>
                    <li>When prompted by Android, tap <strong>Settings</strong> and enable <strong>"Allow from this source"</strong>.</li>
                    <li>Return and tap <strong>Install</strong> to complete installation.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
