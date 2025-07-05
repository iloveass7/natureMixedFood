import { useState } from 'react';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [tags, setTags] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFeaturedImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log({
      title,
      author,
      date,
      content,
      featuredImage,
      tags: tags.split(',').map(tag => tag.trim()),
      metaDescription
    });
    alert('Blog post added successfully!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white px-8 pb-8 rounded shadow-lg w-full max-w-8xl">
        <h3 className="text-center text-4xl font-extrabold mb-8 text-green-800">
          Add New Blog Post
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blog Title */}
          <div>
            <label className="block font-bold mb-2 text-xl">Blog Title*</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border border-gray-300 rounded p-3 text-lg w-full"
              placeholder="Enter blog title"
            />
          </div>

          {/* Author and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-bold mb-2 text-xl">Author*</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="border border-gray-300 rounded p-3 text-lg w-full"
                placeholder="Author name"
              />
            </div>
            <div>
              <label className="block font-bold mb-2 text-xl">Publish Date*</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="border border-gray-300 rounded p-3 text-lg w-full"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block font-bold mb-2 text-xl">Featured Image</label>
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
                className="bg-green-700 hover:bg-amber-500 text-white px-6 py-2 rounded cursor-pointer font-semibold"
              >
                Choose Image
              </label>
              <span className="text-gray-600">
                {featuredImage ? "1 file selected" : "No file chosen"}
              </span>
            </div>
            {featuredImage && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(featuredImage)}
                  alt="Featured preview"
                  className="w-full max-w-xs h-auto object-cover rounded shadow"
                />
              </div>
            )}
          </div>

          {/* Blog Content */}
          <div>
            <label className="block font-bold mb-2 text-xl">Content*</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="10"
              className="border border-gray-300 rounded p-3 text-lg w-full"
              placeholder="Write your blog content here..."
            ></textarea>
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