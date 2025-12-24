import React from "react";
import { Download } from "lucide-react";

function GameDetails({ game, setView, addToCart }) {
  if (!game)
    return (
      <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl text-gray-600 italic">
        <p>لطفاً برای مشاهده جزئیات، یک بازی را انتخاب کنید</p>
      </div>
    );

  return (
    <div className="bg-[var(--bg-main)] border border-white/5 rounded-xl p-4 lg:p-8 shadow-2xl animate-in fade-in duration-300">
      <div className="flex flex-col xl:flex-row gap-8">
        <img
          src={game.image}
          className="w-full xl:w-[400px] rounded-lg shadow-2xl border border-white/10 object-cover"
          alt={game.title}
        />
        <div className="flex-1 flex flex-col">
          <h2 className="text-4xl font-black text-white mb-2">{game.title}</h2>
          <div className="flex gap-2 mb-4">
            {game.tags?.map((t) => (
              <span
                key={t}
                className="text-[9px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 uppercase"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {game.desc}
          </p>

          <div className="bg-black/40 p-4 rounded-lg flex flex-wrap gap-4 justify-between items-center border border-white/5 mt-auto">
            <div>
              <span className="block text-[10px] text-gray-500 font-bold">
                قیمت خرید
              </span>
              <span className="text-2xl font-bold text-green-400">
                {game.price}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => addToCart(game)} // وصل کردن به تابع
                className="bg-green-600 px-6 py-3 rounded-md font-extrabold text-white hover:bg-green-500 transition-all active:scale-95"
              >
                افزودن به سبد
              </button>
              <button
                onClick={() => setView("download")}
                className="bg-blue-600 px-6 py-3 rounded-md font-extrabold text-white hover:bg-blue-500 transition-all flex items-center gap-2"
              >
                <Download size={18} /> دانلود فایل‌ها
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* بخش Requirements می‌تواند اینجا باشد */}
    </div>
  );
}

export default GameDetails;
