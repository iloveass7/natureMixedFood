import { useEffect, useState } from "react";

const EditProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    bestSeller: false,
    images: [],
  });
  const [showAllProducts, setShowAllProducts] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:8000/api/product/getAllProducts");
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditClick = (product) => {
    if (editingProduct === product._id) {
      setEditingProduct(null);
    } else {
      setEditingProduct(product._id);
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        bestSeller: product.bestSeller,
        images: [],
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const res = await fetch(`http://localhost:8000/api/product/removeProduct/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      alert("Deleted!");
      fetchProducts();
    } else {
      alert(data.message || "Error deleting");
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();
    updateData.append("name", formData.name);
    updateData.append("description", formData.description);
    updateData.append("price", formData.price);
    updateData.append("bestSeller", formData.bestSeller);

    formData.images.forEach((file, idx) => {
      if (idx < 5) updateData.append(`image${idx + 1}`, file);
    });

    const res = await fetch(
      `http://localhost:8000/api/product/updateProduct/${editingProduct}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: updateData,
      }
    );

    const data = await res.json();
    if (res.ok) {
      alert("Product updated");
      setEditingProduct(null);
      fetchProducts();
    } else {
      alert(data.message || "Update failed");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const handleRemoveImage = (index) => {
    const updated = [...formData.images];
    updated.splice(index, 1);
    setFormData({ ...formData, images: updated });
  };

  const visibleProducts = showAllProducts ? products : products.slice(0, 5);

  return (
    <div className="px-6 py-1">
      <h2 className="text-4xl font-extrabold mb-9 text-green-800">Edit Products</h2>

      {visibleProducts.map((product) => (
        <div
          key={product._id}
          className="border border-gray-300 rounded-lg px-6 mx-1 my-7 py-8 shadow-xl hover:shadow-2xl transition"
        >
          <div className="flex gap-4">
            <img
              src={product.images[0]}
              alt="Product"
              className="w-48 h-48 mx-3 object-cover rounded"
            />
            <div className="flex flex-col justify-between w-full">
              <div>
                <h3 className="text-3xl font-bold mb-2 text-green-800">{product.name}</h3>
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
  {product.description}
</p>



                <p className="text-[1.2rem] mb-2 text-gray-600 font-bold ">Price: ${product.price}</p>
                <p className="text-[1.2rem]  text-gray-600">
                  Best Seller: {product.bestSeller ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  className="bg-green-700 text-white px-8 py-1 font-semibold text-lg rounded hover:bg-amber-500 transition hover:font-semibold"
                  onClick={() => handleEditClick(product)}
                >
                  {editingProduct === product._id ? "Close" : "Edit"}
                </button>
                <button
                  className="bg-red-500 text-white px-6 py-1 text-lg font-semibold rounded hover:bg-red-800 transition hover:font-semibold"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>

          {editingProduct === product._id && (
            <form
              onSubmit={handleUpdateSubmit}
              className="bg-gray-50 border-t-2 border-amber-400 mt-6 pt-6 px-2 animate-dropdown"
            >
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                className="border border-gray-400 w-full px-4 py-3 mb-2 text-lg"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                className="border border-gray-400 w-full px-4 py-3 mb-2 text-lg"
                rows="3"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                className="border border-gray-400 w-full px-4 py-3 mb-4 text-lg"
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              <div className="mb-4">
                <label className="mr-2 font-bold text-xl text-green-700">Best Seller:</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 mt-2 mb-2"
                  checked={formData.bestSeller}
                  onChange={(e) =>
                    setFormData({ ...formData, bestSeller: e.target.checked })
                  }
                />
              </div>
              
              <div className="mb-6">
                <label className="block font-bold mb-4 text-2xl">Product Images (Multiple Allowed)</label>
                <div className="flex items-center gap-6">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    id="editFileUpload"
                    className="hidden"
                  />
                  <label
                    htmlFor="editFileUpload"
                    className="bg-green-700 hover:bg-amber-500 text-white px-6 py-2 rounded cursor-pointer font-semibold"
                  >
                    Choose Files
                  </label>
                  <span className="text-gray-600">
                    {formData.images.length > 0 ? `${formData.images.length} file(s) selected` : "No file chosen"}
                  </span>
                </div>

                {formData.images.length > 0 && (
                  <div className="flex gap-4 mt-4 flex-wrap">
                    {formData.images.map((img, idx) => (
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

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-amber-500 text-white px-6 py-2 rounded font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      ))}

      {products.length > 5 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAllProducts(!showAllProducts)}
            className="bg-green-700 text-white px-8 py-2 rounded font-semibold hover:bg-amber-500 transition"
          >
            {showAllProducts ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default EditProduct;