import React from "react";

const GameDetails = ({ game, setView, addToCart }) => {
  // اگر بازی انتخاب نشده باشد، چیزی نشان نده (یا لیست بازی‌ها را نشان بده)
  if (!game) {
    return (
      <div className="text-center py-20 opacity-50">
        <p>لطفاً یک بازی را از سایدبار انتخاب کنید یا ژانری را برگزینید.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* بخش اصلی معرفی بازی */}
      <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-8">
        <img
          src={game.image}
          alt={game.title}
          className="w-full md:w-80 h-48 object-cover rounded-xl shadow-2xl"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{game.title}</h2>
          <p className="text-gray-400 leading-relaxed">{game.description}</p>
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {/* دکمه خرید */}
            <button
              onClick={() => addToCart(game)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
            >
              افزودن به سبد خرید
            </button>

            {/* دکمه دانلود (که قبلاً حذف شده بود) */}
            <button
              onClick={() => setView("download")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold border border-white/10 transition-all"
            >
              دانلود بازی
            </button>

            <span className="text-2xl font-mono text-green-400 mr-auto">
              {game.price}
            </span>
          </div>
        </div>
      </div>

      {/* بخش سیستم مورد نیاز (Requirements) */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* حداقل سیستم */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
          <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
            حداقل سیستم مورد نیاز
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <strong>OS:</strong>{" "}
              {game.requirements?.minOS || "Windows 10 64-bit"}
            </li>
            <li>
              <strong>Processor:</strong>{" "}
              {game.requirements?.minCPU || "Intel Core i5-4460"}
            </li>
            <li>
              <strong>Memory:</strong> {game.requirements?.minRAM || "8 GB RAM"}
            </li>
            <li>
              <strong>Graphics:</strong>{" "}
              {game.requirements?.minGPU || "NVIDIA GTX 760"}
            </li>
            <li>
              <strong>Storage:</strong>{" "}
              {game.requirements?.storage || "50 GB space"}
            </li>
          </ul>
        </div>

        {/* سیستم پیشنهادی */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/5">
          <h3 className="text-purple-400 font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            سیستم پیشنهادی
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <strong>OS:</strong>{" "}
              {game.requirements?.recOS || "Windows 11 64-bit"}
            </li>
            <li>
              <strong>Processor:</strong>{" "}
              {game.requirements?.recCPU || "Intel Core i7-9700K"}
            </li>
            <li>
              <strong>Memory:</strong>{" "}
              {game.requirements?.recRAM || "16 GB RAM"}
            </li>
            <li>
              <strong>Graphics:</strong>{" "}
              {game.requirements?.recGPU || "NVIDIA RTX 2060"}
            </li>
            <li>
              <strong>Storage:</strong>{" "}
              {game.requirements?.storage || "50 GB SSD recommended"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
