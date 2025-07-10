import { useState } from "react";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [tags, setTags] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFeaturedImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !featuredImage) {
      alert("Title, content and image are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", content);
    formData.append("image", featuredImage);

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch("http://localhost:8000/api/blog/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Blog post added successfully!");
        // optionally reset form
      } else {
        alert(data.message || "Failed to add blog post");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white px-8 pb-8 gap-7 rounded shadow-lg w-full max-w-8xl h-full">
        <h3 className="text-center text-4xl font-extrabold mb-12  text-green-800">
          Add New Blog Post
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blog Title */}
          <div>
            <label className="block font-bold mb-4 text-2xl">Blog Title*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border border-gray-300 rounded p-3 mb-6 text-lg w-full"
              placeholder="Enter blog title"
            />
          </div>

          {/* Blog Content */}
          <div>
            <label className="block font-bold mb-4 text-2xl">Description*</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="13"
              className="border border-gray-300 rounded p-3 mb-4 text-lg w-full"
              placeholder="Write your blog content here..."
            ></textarea>
          </div>

{/* Featured Image */}
<div>
  <label className="block font-bold mb-2 text-2xl">Featured Image*</label>
  <div className="flex items-center gap-6 mb-2">
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      id="featuredImageUpload"
      className="hidden"
    />
    <label
      htmlFor="featuredImageUpload"
      className="bg-green-700 hover:bg-amber-500 text-white mt-3 px-8 py-2 rounded cursor-pointer font-semibold"
    >
      Choose Image
    </label>
    <span className="text-gray-600 mt-3">
      {featuredImage ? "1 file selected" : "No file chosen"}
    </span>
  </div>

  {/* Preview with remove button */}
  {featuredImage && (
    <div className="mt-4 relative group w-fit">
      <img
        src={URL.createObjectURL(featuredImage)}
        alt="Featured preview"
        className="w-64 h-64 object-cover rounded shadow"
      />
      <button
        type="button"
        onClick={() => setFeaturedImage(null)}
        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hidden group-hover:flex"
        title="Remove"
      >
        ✕
      </button>
    </div>
  )}
</div>


          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-green-700 hover:bg-amber-500 text-white px-6 py-3 rounded text-lg font-semibold w-full"
            >
              Publish Blog Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
