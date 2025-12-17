const tools = [
  { key: "products", label: "Products", icon: "📦" },
  { key: "text", label: "Add Text", icon: "🔤" },
  { key: "upload", label: "Upload Art", icon: "📤" },
  { key: "art", label: "Add Art", icon: "🎨" },
  { key: "names", label: "Names & Numbers", icon: "🔢" },
];

export default function Sidebar({ selectedTool, setSelectedTool }) {
  return (
    <div className="w-64 bg-white border-r flex flex-col py-6 gap-1">
      {tools.map(t => (
        <button
          key={t.key}
          onClick={() => setSelectedTool(t.key)}
          className={`flex items-center gap-4 px-6 py-4 text-lg font-semibold 
            ${selectedTool === t.key ? "bg-blue-100 border-r-4 border-blue-600" : ""}`}
        >
          <span className="text-xl">{t.icon}</span> {t.label}
        </button>
      ))}
    </div>
  );
}
