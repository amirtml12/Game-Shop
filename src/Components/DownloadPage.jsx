import React from "react";
import { ArrowRight, Download } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"; // اضافه کردن useParams

function DownloadPage({ games }) {
  const navigate = useNavigate();
  const { gameId } = useParams(); // گرفتن آیدی از آدرس مرورگر

  // پیدا کردن بازی از لیست بازی‌ها بر اساس آیدی موجود در آدرس
  const selectedGame = games.find((g) => g.id === parseInt(gameId));

  // اگر بازی پیدا نشد (مثلاً آیدی اشتباه بود)
  if (!selectedGame) {
    return (
      <div className="text-center py-20 text-white">
        <h2 className="mb-4">بازی یافت نشد!</h2>
        <button onClick={() => navigate("/")} className="text-blue-500 underline">برگشت به فروشگاه</button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-main)] border border-white/5 rounded-xl p-6 lg:p-10 shadow-2xl animate-in slide-in-from-bottom duration-500">
      {/* دکمه بازگشت به صفحه خود بازی */}
      <button 
        onClick={() => navigate(`/game/${selectedGame.id}`)}
        className="flex items-center gap-2 text-blue-400 hover:text-white mb-8 transition font-bold"
      >
        <ArrowRight size={20} /> بازگشت به صفحه بازی
      </button>
      
      <div className="flex items-center gap-6 mb-10">
        <img 
          src={selectedGame.image} 
          className="w-32 h-20 object-cover rounded shadow-lg border border-white/10" 
          alt={selectedGame.title} 
        />
        <div>
          <h2 className="text-3xl font-black text-white">مرکز دانلود {selectedGame.title}</h2>
          <p className="text-gray-500 text-sm italic">نسخه نهایی (Final Version)</p>
        </div>
      </div>

      <div className="space-y-3">
        {[1, 2, 3].map((part) => (
          <div key={part} className="bg-black/30 p-4 rounded-lg border border-white/5 flex justify-between items-center hover:border-blue-500/30 transition group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600/20 rounded flex items-center justify-center text-blue-400 font-bold text-xs">{part}</div>
              <span className="text-sm font-medium text-gray-300">دانلود پارت {part}</span>
            </div>
            <a href="#" className="bg-blue-600 text-white text-[11px] px-4 py-2 rounded font-bold transition shadow-lg">
              <Download size={14} className="inline ml-1"/> شروع دانلود
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DownloadPage;