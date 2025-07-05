import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        // Mock blog data
        const mockBlogs = [
            {
                _id: "1",
                title: "Latest Blog Post - Exciting News!",
                description:
                    "This is the most recent blog post. It covers important updates and interesting insights for our readers.",
                image: "https://images.unsplash.com/photo-1750875936215-0c35c1742cd6?q=80&w=688&auto=format&fit=crop",

            },
            {
                _id: "2",
                title: "Tips for a Healthy Lifestyle",
                description:
                    "Discover easy and effective tips to improve your daily routine and stay healthy.",
                image: "https://plus.unsplash.com/premium_photo-1750353386208-7e189f9845ef?q=80&w=687&auto=format&fit=crop",

            },
            {
                _id: "3",
                title: "Exploring the Best Travel Destinations",
                description:
                    "Plan your next trip with our curated list of must-visit places around the world.",
                image: "https://images.unsplash.com/photo-1750875936215-0c35c1742cd6?q=80&w=688&auto=format&fit=crop",

            },
        ];

        setBlogs(mockBlogs);
    }, []);

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
                    <h3 className="text-3xl font-extrabold text-green-700">{latestBlog.title}</h3>
                    <p className="text-gray-700 text-lg ">{latestBlog.description}</p>
                            <button
                                className="inline-block mt-4  border-2 border-green-700 text-green-700 font-semibold px-5 py-2 rounded hover:bg-green-700 hover:text-white transition"
                            >
                                Read more
                            </button>
                </div>
            </div>

            {/* Other Blogs */}
            <div className="space-y-8 ">
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
                            <h4 className="text-2xl font-extrabold text-green-700 mb-2">{blog.title}</h4>
                            <p className="text-gray-600 text-sm">{blog.description}</p>
                            <button
                                className="inline-block mt-4 border-2 border-green-700 text-green-700 font-semibold px-5 py-2 rounded hover:bg-green-700 hover:text-white transition"
                            >
                                Read more
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllBlogs;
