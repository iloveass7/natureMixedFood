import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, User } from "lucide-react";
import Loader from "../components/Loader";

const BlogDetails = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/blog/getSingleBlog/${id}`
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setBlog(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!blog) return <div className="text-center py-10">Blog not found</div>;

  // Format date to be more readable
  const formattedDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-auto w-full px-4 md:px-36 py-10 pb-16">
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* LEFT SECTION - Blog Image */}
        <div className="w-full lg:w-1/2 px-4 flex flex-col">
          {/* Main Image Area */}
          <div className="flex-1 flex items-center justify-center border border-green-700 rounded-md overflow-hidden hover:bg-green-200 min-h-[400px]">
            <img
              src={blog.image}
              alt={blog.title}
              className="object-contain w-full h-full max-h-[600px] cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            />
          </div>

          {/* Copyright Notice */}
          <div className="mt-6 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Nature Mixed Food. All rights reserved.
          </div>
        </div>

        {/* RIGHT SECTION - Blog Content */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{blog.title}</h2>
            <p className="text-green-700 text-xl font-semibold mb-6">
              Featured Blogs
            </p>
            <hr className="border-green-700 mb-3" />

            <div className="text-gray-700 text-xl leading-relaxed space-y-4">
              {blog.description.split("\n").map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <Link 
              to="/blogs" 
              className="text-lg bg-green-600 hover:bg-amber-500 text-white w-full py-4 rounded font-bold flex items-center justify-center gap-2 transition"
            >
              ← Back to All Blogs
            </Link>
          </div>

          {/* Blog Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
            <div className="flex flex-col items-center bg-gray-50 shadow-md rounded p-4 hover:bg-green-100">
              <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center mb-2">
                <Calendar size={24} className="text-green-600" />
              </div>
              <h4 className="font-bold text-center">Published</h4>
              <p className="text-gray-600 text-sm text-center">{formattedDate}</p>
            </div>

            <div className="flex flex-col items-center bg-gray-50 shadow-md rounded p-4 hover:bg-green-100">
              <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center mb-2">
                <Clock size={24} className="text-green-600" />
              </div>
              <h4 className="font-bold text-center">Reading Time</h4>
              <p className="text-gray-600 text-sm text-center">5 minutes</p>
            </div>

            <div className="flex flex-col items-center bg-gray-50 shadow-md rounded p-4 hover:bg-green-100">
              <div className="w-12 h-12 bg-white border rounded-full flex items-center justify-center mb-2">
                <User size={24} className="text-green-600" />
              </div>
              <h4 className="font-bold text-center">Author</h4>
              <p className="text-gray-600 text-sm text-center">Organic Expert</p>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center overflow-auto">
          <div className="relative w-full h-full flex items-center justify-center p-6">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-8 text-5xl text-amber-500 font-bold hover:text-red-600 z-50"
              title="Close"
            >
              &times;
            </button>
            <img
              src={blog.image}
              alt="Zoomed"
              className="max-h-[90vh] max-w-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;