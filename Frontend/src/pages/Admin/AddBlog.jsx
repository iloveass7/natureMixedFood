import { useState } from "react";
import { api } from "../../config/api";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) setFeaturedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !featuredImage) {
      alert("Title, content and image are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", content.trim());
    formData.append("image", featuredImage);

    try {
      setSubmitting(true);

      // Authorization header is added by your interceptor; no need to set it here.
      const res = await api.post("/blog/create", formData);

      const ok =
        res.status >= 200 && res.status < 300 && (res.data?.success ?? true);
      if (!ok) throw new Error(res.data?.message || "Failed to add blog post");

      alert("Blog post added successfully!");
      // reset form
      setTitle("");
      setContent("");
      setFeaturedImage(null);
    } catch (error) {
      console.error("Error creating blog:", error);
      alert(error.response?.data?.message || error.message || "Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white px-8 pb-8 gap-7 rounded shadow-lg w-full max-w-8xl h-full">
        <h3 className="text-center text-4xl font-extrabold mb-12 text-green-800">
          Add New Blog Post
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blog Title (required) */}
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

          {/* Blog Content (required) */}
          <div>
            <label className="block font-bold mb-4 text-2xl">Description*</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="13"
              className="border border-gray-300 rounded p-3 mb-4 text-lg w-full"
              placeholder="Write your blog content here..."
            />
          </div>

          {/* Featured Image (required) */}
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

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-700 hover:bg-amber-500 text-white px-6 py-3 rounded text-lg font-semibold w-full disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Publishing…
                </>
              ) : (
                "Publish Blog Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
