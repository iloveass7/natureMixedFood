import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/blog/getBlogs"
        );
        console.log("Blogs data from backend:", response.data);

        const sortedBlogs = response.data.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });

        setBlogs(sortedBlogs);
      } catch (err) {
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="w-full py-20 text-center text-xl font-semibold text-red-500">
        {error}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="w-full py-20 text-center text-xl font-semibold text-gray-500">
        No blogs found.
      </div>
    );
  }

  const latestBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <div className="px-4 sm:px-6 lg:mx-34 py-8 min-h-screen max-w-8xl mx-auto">
      {/* Header */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-green-700 mb-8 sm:mb-10 text-center">
        Our Latest Blogs
      </h2>

      {/* Featured Latest Blog - Stacked on sm devices */}
      <div className="bg-white shadow-lg sm:shadow-2xl rounded-lg sm:rounded-xl overflow-hidden mb-10 sm:mb-16  border border-gray-200 sm:border-gray-300">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96">
            <img
              src={latestBlog.image}
              alt={latestBlog.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-green-700 mb-2 sm:mb-4">
              {latestBlog.title}
            </h3>
            <p className="text-gray-600 sm:text-gray-700 text-base sm:text-lg mb-4 sm:mb-6 line-clamp-3 sm:line-clamp-4">
              {latestBlog.description}
            </p>
            <Link
              to={`/blog/${latestBlog._id}`}
              className="self-start mt-2 sm:mt-4 bg-green-700 hover:bg-amber-500 text-sm sm:text-base md:text-lg text-white font-semibold px-4 sm:px-5 md:px-6 py-2 sm:py-3 rounded-lg transition duration-300"
            >
              Read Full Story
            </Link>
          </div>
        </div>
      </div>

      {/* Other Blogs - Single column on sm, 2 columns on md, 3 on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {otherBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-lg sm:rounded-xl shadow-sm sm:shadow-md overflow-hidden hover:shadow-md sm:hover:shadow-lg transition duration-300 border border-gray-200 sm:border-gray-200"
          >
            <div className="h-40 sm:h-48 md:h-48 w-full">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-5 md:p-6">
              <h4 className="text-lg sm:text-xl font-bold text-green-700 mb-1 sm:mb-2">
                {blog.title}
              </h4>
              <p className="text-gray-500 sm:text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                {blog.description}
              </p>
              <Link
                to={`/blog/${blog._id}`}
                className="inline-block mt-1 sm:mt-2 text-sm sm:text-base text-white bg-green-700 hover:bg-amber-500 font-semibold px-3 sm:px-4 py-1 sm:py-2 rounded transition duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;