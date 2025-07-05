import { useState } from 'react';

const EditImages = () => {
  const [bannerImage, setBannerImage] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);
  const [currentBanner, setCurrentBanner] = useState('https://images.unsplash.com/photo-1750875936215-0c35c1742cd6?q=80&w=688&auto=format&fit=crop');
  const [currentSliders, setCurrentSliders] = useState([
    'https://images.unsplash.com/photo-1750439889444-dad033c8e825?q=80&w=687&auto=format&fit=crop',
    'https://plus.unsplash.com/premium_photo-1750353386208-7e189f9845ef?q=80&w=687&auto=format&fit=crop'
  ]);

  const handleBannerChange = (e) => {
    if (e.target.files[0]) {
      setBannerImage(e.target.files[0]);
    }
  };

  const handleSliderChange = (e) => {
    if (e.target.files) {
      setSliderImages([...sliderImages, ...Array.from(e.target.files)]);
    }
  };

  const removeSliderImage = (index) => {
    const newImages = [...sliderImages];
    newImages.splice(index, 1);
    setSliderImages(newImages);
  };

  const removeCurrentSlider = (index) => {
    const newSliders = [...currentSliders];
    newSliders.splice(index, 1);
    setCurrentSliders(newSliders);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log({
      bannerImage,
      sliderImages,
      currentBanner,
      currentSliders
    });
    alert('Image changes saved successfully!');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white px-8 pb-8 rounded shadow-lg w-full max-w-8xl">
        <h3 className="text-center text-4xl font-extrabold mb-8 text-green-800">
          Edit Images
        </h3>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Banner Section */}
          <div>
            <label className="block font-bold mb-4 text-2xl">Banner Section Image</label>
            <p className="mb-4 text-lg">Upload banner section image here.</p>
            
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
              {/* Current Banner Preview */}
              <div className="rounded py-2">
                <h5 className="font-semibold text-xl mb-2">Current Banner</h5>
                <img 
                  src={currentBanner} 
                  alt="Current Banner" 
                  className="w-150 h-100 object-cover rounded"
                />
              </div>

              {/* New Banner Preview */}
              {bannerImage && (
                <div className="rounded py-2">
                  <h5 className="font-semibold text-xl mb-2">New Banner</h5>
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(bannerImage)}
                      alt="Banner Preview"
                      className="w-150 h-100 object-cover rounded"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Slider Section */}
          <div>
            <label className="block font-bold mb-4 text-2xl">Slider Section Images</label>
            <p className="mb-4 text-lg">Upload slider section images here.</p>
            
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
                Add Slider Images
              </label>
              <span className="text-gray-600">
                {sliderImages.length > 0 ? `${sliderImages.length} new file(s) selected` : "No new files chosen"}
              </span>
            </div>

            {/* Current Sliders */}
            <div className="rounded py-2 mb-6">
              <h5 className="font-semibold text-xl mb-4">Current Slider Images</h5>
              <div className="flex gap-4 flex-wrap">
                {currentSliders.map((img, idx) => (
                  <div key={`current-${idx}`} className="relative group rounded">
                    <img
                      src={img}
                      alt={`Slider ${idx + 1}`}
                      className="w-52 h-52 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeCurrentSlider(idx)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* New Slider Previews */}
            {sliderImages.length > 0 && (
              <div className="rounded py-2 mb-8">
                <h5 className="font-semibold text-xl mb-4">New Slider Images Preview</h5>
                <div className="flex gap-4 flex-wrap">
                  {sliderImages.map((img, idx) => (
                    <div key={`new-${idx}`} className="relative group rounded">
                      <img
                        src={URL.createObjectURL(img)}
                        alt="Slider Preview"
                        className="w-52 h-52 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeSliderImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="bg-green-700 hover:bg-amber-500 text-white px-6 py-3 rounded text-lg font-semibold w-full"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditImages;