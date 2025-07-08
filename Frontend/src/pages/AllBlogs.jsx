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
        // Fetch the blog data from the backend
        const response = await axios.get(
          "http://localhost:8000/api/blog/getBlogs"
        );
        // Check the structure of the response to ensure that `createdAt` is available and correctly formatted
        console.log("Blogs data from backend:", response.data);

        // Sorting blogs based on createdAt in descending order (latest first)
        const sortedBlogs = response.data.sort((a, b) => {
          // Ensure that createdAt is parsed as a Date object
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA; // Sort in descending order: latest first
        });

        // Set the sorted blogs into the state
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
    return (
      <Loader />
    );
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

  const latestBlog = blogs[0]; // Latest blog is now the first blog
  const otherBlogs = blogs.slice(1);

  return (
    <div className="p-6 sm:p-12 min-h-screen max-w-8xl mx-40">
      <h2 className="text-4xl font-extrabold text-green-700 mb-10 text-center">
        Our Latest Blogs
      </h2>

      {/* Featured Latest Blog */}
      <div className="bg-white shadow-2xl rounded-xl p-6 mb-12 flex flex-col md:flex-row gap-8 items-start">
        <img
          src={latestBlog.image}
          alt={latestBlog.title}
          className="w-full md:w-1/2 h-64 object-cover rounded-xl"
        />
        <div className="flex-1 space-y-4">
          <h3 className="text-3xl font-extrabold text-green-700">
            {latestBlog.title}
          </h3>
          <p className="text-gray-700 text-lg ">{latestBlog.description}</p>
          <Link
            to={`/blog/${latestBlog._id}`} // Link to a specific blog page
            className="inline-block mt-4  border-2 border-green-700 text-green-700 font-semibold px-5 py-2 rounded hover:bg-green-700 hover:text-white transition"
          >
            Read more
          </Link>
        </div>
      </div>

      {/* Other Blogs */}
      <div className="space-y-8">
        {otherBlogs.map((blog) => (
          <div
            key={blog._id}
            className="px-7 py-8 shadow-2xl bg-white flex gap-4 items-start p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-32 h-32 object-cover rounded mx-4"
            />
            <div>
              <h4 className="text-2xl font-extrabold text-green-700 mb-2">
                {blog.title}
              </h4>
              <p className="text-gray-600 text-sm">{blog.description}</p>
              <Link
                to={`/blog/${blog._id}`} // Link to a specific blog page
                className="inline-block mt-4 border-2 border-green-700 text-green-700 font-semibold px-5 py-2 rounded hover:bg-green-700 hover:text-white transition"
              >
                Read more
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
