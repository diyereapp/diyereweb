export default function SettingsPanel({
  selectedTool,
  textConfig,
  setTextConfig,
    setUploadedImage
}) {

  return (
    <div className="w-72 bg-white border-l p-6 overflow-y-auto">

      {selectedTool === "products" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Products</h2>
          <p className="text-gray-600 mb-4">Manage your products and colors.</p>

          <button className="w-full py-2 bg-blue-600 text-white rounded mb-3">
            Change Product
          </button>

          <button className="w-full py-2 bg-gray-200 rounded mb-3">
            Add Color
          </button>

          <button className="w-full py-2 bg-gray-200 rounded">
            Add Product Variant
          </button>
        </div>
      )}

      {selectedTool === "text" && (
        // <div>
        //   <h2 className="text-xl font-bold mb-4">Add Text</h2>

        //   <label className="block font-semibold">Text</label>
        //   <input type="text" className="w-full border p-2 rounded mb-4" placeholder="Enter text" />

        //   <label className="block font-semibold">Font Size</label>
        //   <input type="range" min="10" max="100" className="w-full mb-4" />

        //   <label className="block font-semibold">Color</label>
        //   <input type="color" className="w-16 h-10 mb-4" />

        //   <label className="block font-semibold">Outline</label>
        //   <input type="color" className="w-16 h-10 mb-4" />

        //   <button className="w-full py-2 bg-red-500 text-white rounded mt-6">Delete Text</button>
        // </div>
        <div className="w-72 bg-white border-l p-6">
      <h2 className="text-xl font-bold mb-4">Add Text</h2>

      <label className="font-semibold">Text</label>
      <input
        type="text"
        value={textConfig.text}
        onChange={(e) =>
          setTextConfig({ ...textConfig, text: e.target.value })
        }
        className="w-full border p-2 rounded mb-4"
        placeholder="Enter text"
      />

      <label className="font-semibold">Font Size</label>
      <input
        type="range"
        min="10"
        max="100"
        value={textConfig.fontSize}
        onChange={(e) =>
          setTextConfig({ ...textConfig, fontSize: Number(e.target.value) })
        }
        className="w-full mb-4"
      />

      <label className="font-semibold">Color</label>
      <input
        type="color"
        value={textConfig.color}
        onChange={(e) =>
          setTextConfig({ ...textConfig, color: e.target.value })
        }
        className="w-16 h-10 mb-4"
      />
    </div>
      )}

{selectedTool === "upload" && (
  <div>
    <h2 className="text-xl font-bold mb-4">Upload Art</h2>

    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
          setUploadedImage(reader.result); // ✅ image goes to canvas
        };
        reader.readAsDataURL(file);
      }}
      className="w-full mb-4"
    />
  </div>
)}


      {selectedTool === "art" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Clipart Gallery</h2>
          <p>Coming soon...</p>
        </div>
      )}

      {selectedTool === "names" && (
        <div>
          <h2 className="text-xl font-bold mb-4">Names & Numbers</h2>
          <p>Upload roster CSV or manually enter names.</p>
        </div>
      )}
    </div>
  );
}
