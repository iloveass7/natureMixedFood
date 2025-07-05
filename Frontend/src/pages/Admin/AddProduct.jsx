import { useState } from "react";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Premium Quality");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState("");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      title,
      type,
      description,
      quantity,
      price,
      images,
    };

    console.log("New Product:", productData);
    alert("Product Added Successfully!");

    setImages([]);
    setTitle("");
    setType("Premium Quality");
    setDescription("");
    setQuantity(0);
    setPrice("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white px-8 pb-8 rounded shadow-lg w-full max-w-8xl">

        <h3 className="text-center text-4xl font-extrabold mb-8 text-green-800">
          Add New Product
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Image Upload */}
          <div>
            <label className="block font-bold mb-4 text-2xl">Product Images (Multiple Allowed)</label>

            <div className="flex items-center gap-6">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                id="fileUpload"
                className="hidden"
              />

              <label
                htmlFor="fileUpload"
                className="bg-green-700 hover:bg-amber-500 text-white px-6 py-2 rounded cursor-pointer font-semibold"
              >
                Choose Files
              </label>

              <span className="text-gray-600">
                {images.length > 0 ? `${images.length} file(s) selected` : "No file chosen"}
              </span>
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="flex gap-4 mt-4 flex-wrap">
                {images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={URL.createObjectURL(img)}
                      alt="preview"
                      className="w-24 h-24 object-cover rounded shadow"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hidden group-hover:flex"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Title */}
          <div>
            <label className="block font-bold mb-4 text-2xl">Product Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border border-gray-300 rounded p-4 text-lg w-full"
              placeholder="Enter product title"
            />
          </div>

          {/* Product Type */}
          <div>
            <label className="block font-bold mb-4 text-2xl">Product Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 rounded p-4 text-lg w-full"
            >
              <option value="Premium Quality">Premium Quality</option>
              <option value="Best Seller">Best Seller</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold mb-4 text-2xl">Product Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="border border-gray-300 rounded p-4 text-lg w-full"
              placeholder="Enter product description"
            ></textarea>
          </div>

          {/* Quantity */}
          <div>
            <label className="block font-bold mb-4 text-2xl">Available Quantity</label>
            <input
              type="number"
              value={quantity}
              min="0"
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="border border-gray-300 rounded p-4 text-lg w-full"
              placeholder="Enter stock quantity"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-bold mb-4 text-2xl">Price ($)</label>
            <input
              type="number"
              value={price}
              min="0"
              step="0.01"
              onChange={(e) => setPrice(e.target.value)}
              required
              className="border border-gray-300 rounded p-4 text-lg w-full"
              placeholder="Enter product price"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="bg-green-700 hover:bg-amber-500 text-white px-6 py-3 rounded text-lg font-semibold w-full"
            >
              Add Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;
