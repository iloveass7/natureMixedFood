import { useEffect, useState } from "react";
import { api } from "../../config/api";

const EditImages = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);
  const [currentBanner, setCurrentBanner] = useState(null);
  const [currentSliders, setCurrentSliders] = useState([]);

  // Loading states
  const [uploadLoading, setUploadLoading] = useState(false); // main "Save All New Uploads"
  // per-card loading is tracked on each card as `isUpdating`

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const bannerRes = await api.get("/card/getBanner");
      const cardsRes = await api.get("/card/getCards");

      setCurrentBanner(bannerRes.data?.image || null);
      setCurrentSliders(
        cardsRes.data.map((card) => ({
          ...card,
          isUpdating: false, // per-card loading flag
        }))
      );
    } catch (error) {
      console.error("Failed to fetch images", error);
      alert("Failed to load images");
    }
  };

  const handleBannerChange = (e) => {
    if (e.target.files[0]) {
      setBannerImage(e.target.files[0]);
    }
  };

  const handleSliderChange = (e) => {
    const files = Array.from(e.target.files || []);
    const newSliderObjects = files.map((file) => ({
      file,
      title: "",
      description: "",
    }));
    setSliderImages((prev) => [...prev, ...newSliderObjects]);
  };

  const handleSliderInputChange = (index, field, value) => {
    setSliderImages((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const removeSliderImage = (index) => {
    setSliderImages((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleCurrentSliderEdit = (index, field, value) => {
    setCurrentSliders((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const updateSliderCard = async (id, title, description, index) => {
    try {
      // set this card into loading state
      setCurrentSliders((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], isUpdating: true };
        return updated;
      });

      const token = localStorage.getItem("adminToken") || "";

      const { status, data } = await api.put(
        `/card/update/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status >= 200 && status < 300 && (data?.success ?? true)) {
        alert("Slider updated");
        await fetchImages();
      } else {
        throw new Error(data?.message || "Update failed");
      }
    } catch (err) {
      console.error("Slider update error:", err);
      alert(err.response?.data?.message || err.message || "Update failed");
    } finally {
      // clear this card's loading state
      setCurrentSliders((prev) => {
        const updated = [...prev];
        if (updated[index]) updated[index] = { ...updated[index], isUpdating: false };
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploadLoading) return;

    try {
      setUploadLoading(true);
      const token = localStorage.getItem("adminToken") || "";

      // Upload banner if provided
      if (bannerImage) {
        const bannerForm = new FormData();
        bannerForm.append("image", bannerImage);

        await api.post("/card/banner", bannerForm, {
          headers: {
            Authorization: `Bearer ${token}`,
            // don't set Content-Type; axios sets it for FormData
          },
        });
      }

      // Upload new sliders (if any)
      for (let i = 0; i < sliderImages.length; i++) {
        const form = new FormData();
        form.append("image", sliderImages[i].file);
        form.append("title", sliderImages[i].title);
        form.append("description", sliderImages[i].description);

        await api.post("/card/add", form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      alert("Images uploaded successfully!");
      setBannerImage(null);
      setSliderImages([]);
      await fetchImages();
    } catch (error) {
      console.error("Image upload error:", error.response?.data || error.message);
      alert("Upload failed. Check console for details.");
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white px-9 pb-8 rounded shadow-lg w-full max-w-8xl">
        <h3 className="text-center text-4xl font-extrabold mb-8 text-green-800">
          Edit Images
        </h3>

        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Banner Section */}
          <div>
            <label className="block font-bold mb-4 text-2xl">Banner Image</label>
            <p className="mb-4 text-lg">Upload a new banner image.</p>
            <div className="flex items-center gap-6 mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                id="bannerUpload"
                className="hidden"
              />
              <label
                htmlFor="bannerUpload"
                className="bg-green-700 hover:bg-amber-500 text-white px-6 py-2 rounded cursor-pointer font-semibold"
              >
                Upload New Banner
              </label>
            </div>

            <div className="flex flex-wrap gap-6 mb-8">
              {currentBanner && (
                <div>
                  <h5 className="font-semibold text-xl mb-2">Current Banner</h5>
                  <img
                    src={currentBanner}
                    alt="Current Banner"
                    className="w-full max-w-md h-auto object-cover rounded"
                  />
                </div>
              )}
              {bannerImage && (
                <div>
                  <h5 className="font-semibold text-xl mb-2">New Banner</h5>
                  <img
                    src={URL.createObjectURL(bannerImage)}
                    alt="New Banner Preview"
                    className="w-full max-w-md h-auto object-cover rounded"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Current Slider Cards - Editable */}
          <div>
            <label className="block font-bold mb-4 text-2xl">Current Offer Images</label>
            <p className="mb-4 text-lg">Edit your current offer cards.</p>

            <div className="space-y-8">
              {currentSliders.map((card, idx) => (
                <div
                  key={card._id}
                  className="flex flex-col px-8 py-5 sm:flex-row gap-6 shadow-2xl border border-gray-300 p-4 rounded shadow-md"
                >
                  <img
                    src={card.image}
                    alt={`Slider ${idx + 1}`}
                    className="w-full sm:w-48 h-51 object-cover rounded my-2"
                  />
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="block font-semibold text-lg">Title</label>
                      <input
                        type="text"
                        value={card.title}
                        onChange={(e) =>
                          handleCurrentSliderEdit(idx, "title", e.target.value)
                        }
                        className="w-full border border-gray-400 px-3 py-2 my-2 text-lg rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-lg">Description</label>
                      <textarea
                        rows="2"
                        value={card.description}
                        onChange={(e) =>
                          handleCurrentSliderEdit(idx, "description", e.target.value)
                        }
                        className="w-full border border-gray-400 px-3 py-2 mt-2 text-lg rounded"
                      ></textarea>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        updateSliderCard(card._id, card.title, card.description, idx)
                      }
                      disabled={card.isUpdating || uploadLoading}
                      className="bg-green-700 text-white px-6 py-2 mb-2 rounded hover:bg-amber-500 transition font-semibold disabled:opacity-60 inline-flex items-center gap-2"
                    >
                      {card.isUpdating ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving…
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upload New Sliders */}
          <div>
            <label className="block font-bold mb-4 text-2xl">Add New Offers</label>
            <p className="mb-4 text-lg">Upload new Offer Images and set their info.</p>
            <div className="flex items-center gap-6 mb-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleSliderChange}
                id="sliderUpload"
                className="hidden"
              />
              <label
                htmlFor="sliderUpload"
                className="bg-green-700 hover:bg-amber-500 text-white px-6 py-2 rounded cursor-pointer font-semibold"
              >
                Upload Slider Images
              </label>
              <span className="text-gray-600">
                {sliderImages.length > 0
                  ? `${sliderImages.length} new image(s) selected`
                  : "No new images"}
              </span>
            </div>

            {sliderImages.length > 0 && (
              <div className="space-y-8">
                {sliderImages.map((slider, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col px-8 py-5 sm:flex-row gap-6 shadow-2xl border border-gray-300 p-4 rounded shadow-md"
                  >
                    <img
                      src={URL.createObjectURL(slider.file)}
                      alt="New Preview"
                      className="w-full sm:w-48 h-50 my-2 object-cover rounded"
                    />
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block font-semibold text-lg">Title</label>
                        <input
                          type="text"
                          value={slider.title}
                          onChange={(e) =>
                            handleSliderInputChange(idx, "title", e.target.value)
                          }
                          className="w-full border border-gray-400 px-3 py-2 mt-2 text-lg rounded"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-lg">Description</label>
                        <textarea
                          rows="2"
                          value={slider.description}
                          onChange={(e) =>
                            handleSliderInputChange(idx, "description", e.target.value)
                          }
                          className="w-full border border-gray-400 px-3 py-2 mt-2 text-lg rounded"
                        ></textarea>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSliderImage(idx)}
                        disabled={uploadLoading}
                        className="bg-red-600 text-white px-6 py-2 mb-2 rounded hover:bg-amber-500 transition font-semibold disabled:opacity-60"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={uploadLoading}
              className="bg-green-700 hover:bg-amber-500 text-white px-6 py-3 rounded text-lg font-semibold w-full disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {uploadLoading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving…
                </>
              ) : (
                "Save All New Uploads"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditImages;
