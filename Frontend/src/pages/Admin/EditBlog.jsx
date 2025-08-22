import { useEffect, useState } from "react";
import { api } from "../../config/api"; // <-- use shared axios instance

const EditBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    existingImage: "",
  });
  const [showAllBlogs, setShowAllBlogs] = useState(false);

  // per-action loading
  const [savingId, setSavingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get("/blog/getBlogs");
      const sorted = (Array.isArray(data) ? data : []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setBlogs(sorted);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      alert("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleEditClick = (blog) => {
    if (editingBlog === blog._id) {
      setEditingBlog(null);
    } else {
      setEditingBlog(blog._id);
      setFormData({
        title: blog.title || "",
        description: blog.description || "",
        image: null,
        existingImage: blog.image || "",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      setDeletingId(id);

      const res = await api.delete(`/blog/deleteBlog/${id}`, {
        // headers are auto-added by interceptor (adminToken/token)
      });

      const ok =
        res.status === 204 ||
        res.status === 200 ||
        res.data?.success === true;

      if (ok) {
        alert("Blog deleted successfully!");
        await fetchBlogs();
      } else {
        throw new Error(res.data?.message || "Error deleting blog");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.response?.data?.message || err.message || "Error deleting blog");
    } finally {
      setDeletingId(null);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!editingBlog) return;

    try {
      setSavingId(editingBlog);

      const updateData = new FormData();
      updateData.append("title", formData.title);
      updateData.append("description", formData.description);
      if (formData.image) {
        updateData.append("image", formData.image);
      }

      const res = await api.put(
        `/blog/updateBlog/${editingBlog}`,
        updateData,
        {
          // DO NOT set Content-Type; axios sets proper multipart boundary for FormData
        }
      );

      const ok =
        res.status >= 200 &&
        res.status < 300 &&
        (res.data?.success ?? true);

      if (ok) {
        alert("Blog updated successfully");
        setEditingBlog(null);
        await fetchBlogs();
      } else {
        throw new Error(res.data?.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert(err.response?.data?.message || err.message || "Update failed");
    } finally {
      setSavingId(null);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const visibleBlogs = showAllBlogs ? blogs : blogs.slice(0, 5);

  return (
    <div className="px-6 py-1">
      <h2 className="text-4xl font-extrabold mb-9 text-green-800">Edit Blogs</h2>

      {visibleBlogs.map((blog) => {
        const isSaving = savingId === blog._id;
        const isDeleting = deletingId === blog._id;

        return (
          <div
            key={blog._id}
            className="border border-gray-300 rounded-lg px-6 my-7 py-8 shadow-xl hover:shadow-2xl transition"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={blog.image}
                alt="Blog"
                className="w-48 h-48 mx-3 object-cover rounded"
              />
              <div className="flex flex-col justify-between w-full">
                <div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold mb-2 text-green-800 break-words"
                    style={{
                      wordBreak: "break-word",
                      overflowWrap: "break-word",
                      hyphens: "auto",
                    }}
                  >
                    {blog.title}
                  </h3>

                  <p
                    className="text-gray-700 mb-2 text-xl overflow-hidden break-words"
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      wordBreak: "break-word",
                    }}
                  >
                    {blog.description}
                  </p>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="bg-green-700 text-white px-8 py-1 font-semibold text-lg rounded hover:bg-amber-500 transition hover:font-semibold disabled:opacity-60"
                    onClick={() => handleEditClick(blog)}
                    disabled={isDeleting}
                  >
                    {editingBlog === blog._id ? "Close" : "Edit"}
                  </button>
                  <button
                    className="bg-red-500 text-white px-6 py-1 text-lg font-semibold rounded hover:bg-red-800 transition hover:font-semibold disabled:opacity-60 inline-flex items-center gap-2"
                    onClick={() => handleDelete(blog._id)}
                    disabled={isDeleting || isSaving}
                  >
                    {isDeleting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Deleting…
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {editingBlog === blog._id && (
              <form
                onSubmit={handleUpdateSubmit}
                className="bg-gray-50 border-t-2 border-amber-400 mt-6 pt-6 px-2 animate-dropdown"
              >
                <input
                  type="text"
                  placeholder="Title"
                  value={formData.title}
                  className="border border-gray-400 w-full px-4 py-3 mb-2 text-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  disabled={isSaving}
                />
                <textarea
                  placeholder="Description"
                  value={formData.description}
                  className="border border-gray-400 w-full px-4 py-3 mb-2 text-lg"
                  rows="5"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  disabled={isSaving}
                />

                <div className="mb-6">
                  <label className="block font-bold mb-4 text-2xl">
                    Blog Image
                  </label>
                  <div className="flex items-center gap-6">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      id="editBlogFileUpload"
                      className="hidden"
                      disabled={isSaving}
                    />
                    <label
                      htmlFor="editBlogFileUpload"
                      className={`${
                        isSaving ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
                      } bg-green-700 hover:bg-amber-500 text-white px-6 py-2 rounded font-semibold`}
                    >
                      Choose File
                    </label>
                    <span className="text-gray-600">
                      {formData.image
                        ? "New image selected"
                        : "Current image will be kept"}
                    </span>
                  </div>

                  <div className="flex gap-4 mt-4">
                    {formData.image ? (
                      <div className="relative group">
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="preview"
                          className="w-48 h-48 object-cover rounded shadow"
                        />
                      </div>
                    ) : (
                      <div className="relative group">
                        <img
                          src={formData.existingImage}
                          alt="current"
                          className="w-48 h-48 object-cover rounded shadow"
                        />
                        <span className="text-sm text-gray-500">
                          Current Image
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving || isDeleting}
                    className="bg-green-700 hover:bg-amber-500 text-white px-6 py-2 rounded font-semibold disabled:opacity-60 inline-flex items-center gap-2"
                  >
                    {isSaving ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving…
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        );
      })}

      {blogs.length > 5 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAllBlogs(!showAllBlogs)}
            className="bg-green-700 text-white px-8 py-2 rounded font-semibold hover:bg-amber-500 transition"
          >
            {showAllBlogs ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
