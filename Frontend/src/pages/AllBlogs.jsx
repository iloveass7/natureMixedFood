import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Layout syncing (heights)
  const leftCardRef = useRef(null);
  const rightHeaderRef = useRef(null);
  const [leftCardHeight, setLeftCardHeight] = useState(0);
  const [rightHeaderHeight, setRightHeaderHeight] = useState(0);

  const measureHeights = useCallback(() => {
    if (leftCardRef.current) {
      setLeftCardHeight(leftCardRef.current.getBoundingClientRect().height);
    }
    if (rightHeaderRef.current) {
      setRightHeaderHeight(
        rightHeaderRef.current.getBoundingClientRect().height
      );
    }
  }, []);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/blog/getBlogs");
        const sorted = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(sorted);
      } catch {
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Observe left card + right header BEFORE paint (for height sync)
  useLayoutEffect(() => {
    const roLeft = leftCardRef.current && new ResizeObserver(measureHeights);
    const roHdr = rightHeaderRef.current && new ResizeObserver(measureHeights);
    if (leftCardRef.current && roLeft) roLeft.observe(leftCardRef.current);
    if (rightHeaderRef.current && roHdr) roHdr.observe(rightHeaderRef.current);

    measureHeights();
    const onResize = () => measureHeights();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      roLeft?.disconnect();
      roHdr?.disconnect();
    };
  }, [measureHeights]);

  const latestBlog = blogs[0];
  const otherBlogsAll = blogs.slice(1);

  const otherBlogs = useMemo(() => {
    const q = query.trim().toLowerCase();
    let arr = otherBlogsAll.filter(
      (b) =>
        b.title?.toLowerCase().includes(q) ||
        b.description?.toLowerCase().includes(q)
    );
    arr = arr.sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest")
        return new Date(a.createdAt) - new Date(b.createdAt);
      return (a.title || "").localeCompare(b.title || "");
    });
    return arr;
  }, [otherBlogsAll, query, sortBy]);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="w-full py-20 text-center text-xl font-semibold text-red-500">
        {error}
      </div>
    );
  if (blogs.length === 0)
    return (
      <div className="w-full py-20 text-center text-xl font-semibold text-gray-500">
        No blogs found.
      </div>
    );

  // Scroll area height = left-card height - right header height (dynamic)
  const scrollHeight =
    leftCardHeight && rightHeaderHeight
      ? Math.max(0, leftCardHeight - rightHeaderHeight)
      : undefined;

  return (
    <div className="mx-10 max-w-8xl px-4 sm:px-6 md:px-[120px] py-8 mb-10">
      {/* GRID HEADER ROW — same columns as content below */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-6">
        {/* Title shares the left column width */}
        <div className="lg:col-span-8">
          <h1 className="text-6xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-green-700">
            Our Blogs
          </h1>
        </div>

        {/* Search lives in the SAME column as the sidebar → identical width from first paint */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3 w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="
                flex-1 rounded-lg border border-gray-300 px-4 py-4 text-lg
                caret-green-600
                hover:border-green-600 hover:ring-1 hover:ring-green-600
                focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-600
                focus-visible:outline-green-600
              "
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-36 rounded-lg border border-gray-300 px-4 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 hover:border-green-600"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="title">Title A–Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* MAIN GRID — same column widths as header above */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT */}
        <section className="lg:col-span-8">
          <div
            ref={leftCardRef}
            className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
          >
            {/* Boxed header */}
            <div className="px-4 sm:px-5 py-7 border-b border-gray-200">
              <h2 className="px-2 text-3xl sm:text-4xl font-extrabold text-green-700">
                Recent Blogs
              </h2>
            </div>

            {/* Featured latest post */}
            <article>
              <Link to={`/blog/${latestBlog._id}`} className="block">
                <div className="w-full h-64 sm:h-80 md:h-[30rem]">
                  <img
                    src={latestBlog.image}
                    alt={latestBlog.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onLoad={measureHeights}
                  />
                </div>
              </Link>

              <div className="p-6 sm:p-8">
                <Link to={`/blog/${latestBlog._id}`}>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 hover:text-green-700 transition">
                    {latestBlog.title}
                  </h3>
                </Link>

                <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-gray-500 mb-4">
                  <span>
                    {new Date(latestBlog.createdAt).toLocaleDateString(
                      undefined,
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                  <span>•</span>
                  <span>{latestBlog.author || "Admin"}</span>
                </div>

                <p className="text-gray-700 text-lg sm:text-xl leading-relaxed line-clamp-5 mb-6">
                  {latestBlog.description}
                </p>

                <Link
                  to={`/blog/${latestBlog._id}`}
                  className="inline-flex items-center bg-green-700 hover:bg-amber-500 text-white font-semibold rounded-lg px-5 sm:px-6 py-2.5 sm:py-3 transition"
                >
                  Read Full Story
                </Link>
              </div>
            </article>
          </div>
        </section>

        {/* RIGHT */}
        <aside className="lg:col-span-4">
          <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col">
            <div
              ref={rightHeaderRef}
              className="px-4 sm:px-5 py-7 border-b border-gray-200"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-green-700">
                Other Blogs
              </h2>
            </div>

            {/* Scroll area dynamically sized to match left card content */}
            <div
              className="overflow-y-auto overflow-x-hidden"
              style={scrollHeight ? { height: scrollHeight } : undefined}
            >
              <ul className="divide-y divide-gray-100">
                {otherBlogs.map((b) => {
                  const desc =
                    b.description?.length > 160
                      ? `${b.description.slice(0, 160)}…`
                      : b.description || "";
                  return (
                    <li key={b._id} className="hover:bg-gray-50 transition">
                      <Link
                        to={`/blog/${b._id}`}
                        className="flex items-start gap-3 sm:gap-4 md:gap-5 p-4 sm:p-5 w-full"
                      >
                        {/* Responsive thumbnail (prevents sm clipping) */}
                        <div className="flex-shrink-0 w-28 h-20 sm:w-36 sm:h-24 md:w-44 md:h-32 lg:w-56 lg:h-40 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={b.image}
                            alt={b.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[1.65rem] font-bold text-green-700 leading-snug line-clamp-2">
                            {b.title}
                          </h3>
                          <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-1">
                            {new Date(b.createdAt).toLocaleDateString()}
                          </p>
                          <p
                            className="text-sm sm:text-base md:text-[1.1rem] text-gray-700 mt-1 line-clamp-3"
                            title={b.description}
                          >
                            {desc}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AllBlogs;
