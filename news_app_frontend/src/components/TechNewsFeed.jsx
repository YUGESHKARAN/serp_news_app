

import React, { useState,useEffect,useRef,useCallback , useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, ExternalLink, Share2, Search } from "lucide-react";
import axios from "axios";



export default function TechNewsFeed() {
  const [query, setQuery] = useState("sport");
  const [filter, setFilter] = useState("All");
  const [bookmarks, setBookmarks] = useState([]);
  const [serpData, setSerpData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;
  const cacheRef = useRef({}); // cache results by query

  const getSerpData = useCallback(async (searchTerm) => {
    if (cacheRef.current[searchTerm]) {
      setSerpData(cacheRef.current[searchTerm]);
      return;
    }

    try {
      const response = await axios.post("https://serp-news-app-1.onrender.com/tool", { query: searchTerm });
      // const response = await axios.post("http://127.0.0.1:4000/tool", { query: searchTerm });
      if (response.status === 200) {
        cacheRef.current[searchTerm] = response.data;
        setSerpData(response.data);
      }
    } catch (err) {
      console.error("error", err);
    }
  }, []);

  // debounce query changes
  useEffect(() => {
    if (!query.trim()) return;

    const handler = setTimeout(() => {
      getSerpData(query.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [query, getSerpData]);

  const filteredNews = useMemo(() => {
    const q = query.trim().toLowerCase();
    return serpData
      .filter((n) => (filter === "All" ? true : n.source?.name === filter))
      .filter((n) => {
        const snippetText = n.snippet?.toLowerCase() || "";
        return (
          !q ||
          n.title?.toLowerCase().includes(q) ||
          snippetText.includes(q)
        );
      })
      .sort((a, b) => a.position - b.position);
  }, [serpData, query, filter]);

  const sources = useMemo(() => {
    const s = new Set(serpData.map((n) => n.source?.name || ""));
    return ["All", ...Array.from(s)];
  }, [serpData]);

  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);

  const paginatedData = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleBookmark = (link) => {
    setBookmarks((prev) =>
      prev.includes(link) ? prev.filter((l) => l !== link) : [link, ...prev]
    );
  };

  const handleShare = async (url, title) => {
    if (navigator.share) {
      // ✅ Mobile & modern browsers
      try {
        await navigator.share({
          title: title || "Check this out!",
          text: "Found this interesting tech news:",
          url: url,
        });
        console.log("Shared successfully!");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // 💻 Fallback for desktop browsers
      try {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };


  return (
<div className="min-h-screen bg-gradient-to-b from-gray-900 via-neutral-900 to-black text-gray-100 p-4 sm:p-6">
  <div className="max-w-6xl mx-auto">
    {/* Header */}
 <header className="bg-neutral-900/80 backdrop-blur-sm border-b border-neutral-800 px-4 sm:px-6 py-4 rounded-xl mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-md">
  {/* Branding */}
  <div className="flex items-center gap-3">
    <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white">
      T
    </div>
    <div>
      <h1 className="text-2xl font-bold tracking-tight">TechPulse</h1>
      <p className="text-xs text-gray-400">Curated tech headlines · powered by SerpAPI</p>
    </div>
  </div>

  {/* Search & Filter */}
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
    {/* Search */}
    <div className="relative flex-1 sm:flex-initial sm:w-64">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search headlines..."
        className="pl-10 pr-4 py-2 w-full rounded-lg bg-neutral-800 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-neutral-700 transition"
      />
      <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
    </div>

    {/* Source Filter */}
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="bg-neutral-800 px-3 py-2 scrollbar-hide rounded-lg text-sm border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition"
    >
      {sources.map((s) => (
        <option key={s} value={s} className="bg-neutral-800 text-white">
          {s}
        </option>
      ))}
    </select>
  </div>
</header>


    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main News List */}
      <main className="lg:col-span-2 space-y-5">
        {/* <AnimatePresence>
         
        </AnimatePresence> */}

         {paginatedData.map((item) => (
            <div
              key={item.link}
              // layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-gradient-to-r from-neutral-800 via-neutral-850 to-neutral-800 shadow-md border border-neutral-700 hover:border-indigo-500 transition"
            >
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-28 h-40 sm:h-20 flex-shrink-0 overflow-hidden rounded-xl"
              >
                <img
                  src={item.thumbnail}
                  alt="thumb"
                  className="w-full h-full object-cover transform hover:scale-105 transition"
                />
              </a>

              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                  <div>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-lg font-semibold hover:text-indigo-400 transition"
                    >
                      {item.title}
                    </a>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                      {item.snippet || ""}
                    </p>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-neutral-900 text-gray-300 border border-neutral-700">
                      {item.source?.name || "Unknown"}
                    </span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => toggleBookmark(item.link)}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-sm transition"
                  >
                    <Bookmark size={14} />
                    {bookmarks.includes(item.link) ? "Bookmarked" : "Save"}
                  </button>

                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-transparent border border-neutral-700 text-sm hover:bg-neutral-800 transition"
                  >
                    <ExternalLink size={14} /> Read
                  </a>

                  <button
                  onClick={()=>{handleShare(item.link, item.title)}}
                   className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-transparent border border-neutral-700 text-sm hover:bg-neutral-800 transition">
                    <Share2 size={14} /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}

        {serpData.length === 0 && (
          <div className="p-6 rounded-xl bg-neutral-800 text-center text-gray-400">
            No results match your search.
          </div>
        )}

       {/* Pagination Controls */}
{totalPages > 1 && (
  <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
    <button
      onClick={() => goToPage(currentPage - 1)}
      disabled={currentPage === 1}
      className="px-3 py-1  hover:border-green-500 transition rounded bg-neutral-800 text-gray-300 border border-neutral-700 disabled:opacity-50"
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, idx) => {
      const pageNum = idx + 1;
      return (
        <button
          key={pageNum}
          onClick={() => goToPage(pageNum)}
          className={`px-3 py-1 rounded border text-sm sm:text-base ${
            currentPage === pageNum
              ? "bg-neutral-700 text-white border-neutral-500"
              : "bg-neutral-800 text-gray-300 border-neutral-700  hover:border-indigo-500 transition"
          }`}
        >
          {pageNum}
        </button>
      );
    })}

    <button
      onClick={() => goToPage(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="px-3 py-1 rounded bg-neutral-800  hover:border-green-500 transition text-gray-300 border border-neutral-700 disabled:opacity-50"
    >
      Next
    </button>
  </div>
)}

      </main>

      {/* Sidebar */}
      <aside className="space-y-4">
        <div className="p-4 rounded-2xl bg-neutral-800 border border-neutral-700">
          <h3 className="text-sm font-semibold">Top Sources</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {sources.slice(0, 8).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  filter === s
                    ? "bg-indigo-600 text-white"
                    : "bg-neutral-900 text-gray-300 hover:bg-neutral-800"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-800 border border-neutral-700">
  <h3 className="text-sm font-semibold">Bookmarks</h3>
<div className="mt-3 flex flex-col items-start space-y-3">
  {bookmarks.length === 0 ? (
    <div className="text-sm text-gray-400">
      No bookmarks yet — save articles to read later.
    </div>
  ) : (
    bookmarks.map((b) => (
      <div
        key={b}
        className="w-full flex items-start justify-between gap-2 break-words"
      >
        <a
          href={b}
          target="_blank"
          rel="noreferrer"
          className="flex-1 text-sm text-indigo-400 hover:underline break-all"
        >
          {b}
        </a>
        <button
          onClick={() =>
            setBookmarks((prev) => prev.filter((link) => link !== b))
          }
          className="text-gray-400 text-xs hover:text-red-500 transition"
          title="Remove bookmark"
        >
          ✕
        </button>
      </div>
    ))
  )}
</div>


</div>

      </aside>
    </div>
  </div>
</div>

  );
}
