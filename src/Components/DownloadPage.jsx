import React from "react";
import { ArrowRight, Download } from "lucide-react";

function DownloadPage({ selectedGame, setView }) {
  // اگر به هر دلیلی بازی انتخاب نشده بود، یک پیغام نشان بده
  if (!selectedGame) return null;

  return (
    <div className="bg-[var(--bg-main)] border border-white/5 rounded-xl p-6 lg:p-10 shadow-2xl animate-in slide-in-from-bottom duration-500">
      {/* دکمه بازگشت */}
      <button 
        onClick={() => setView("games")}
        className="flex items-center gap-2 text-blue-400 hover:text-white mb-8 transition font-bold"
      >
        <ArrowRight size={20} /> بازگشت به صفحه بازی
      </button>
      
      {/* هدر صفحه دانلود */}
      <div className="flex items-center gap-6 mb-10">
        <img 
          src={selectedGame.image} 
          className="w-32 h-20 object-cover rounded shadow-lg border border-white/10" 
          alt="" 
        />
        <div>
          <h2 className="text-3xl font-black text-white">مرکز دانلود {selectedGame.title}</h2>
          <p className="text-gray-500 text-sm italic">نسخه نهایی و کرک شده (Final Version)</p>
        </div>
      </div>

      {/* لیست پارت‌ها */}
      <div className="space-y-3">
        <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Direct Download Links:</p>
        {[1, 2, 3, 4].map((part) => (
          <div 
            key={part} 
            className="bg-black/30 p-4 rounded-lg border border-white/5 flex justify-between items-center hover:border-blue-500/30 transition group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600/20 rounded flex items-center justify-center text-blue-400 font-bold text-xs">
                {part}
              </div>
              <span className="text-sm font-medium text-gray-300">دانلود پارت {part} (حجم ۵ گیگابایت)</span>
            </div>
            <a 
              href="#" 
              className="flex items-center gap-2 bg-[#316282] hover:bg-blue-600 text-white text-[11px] px-4 py-2 rounded font-bold transition shadow-lg"
            >
              <Download size={14} /> شروع دانلود
            </a>
          </div>
        ))}
      </div>

      {/* راهنمای نصب */}
      <div className="mt-10 p-5 bg-blue-900/10 border border-blue-500/20 rounded-lg">
        <p className="text-blue-400 font-bold text-sm mb-2 italic">راهنمای نصب و استخراج:</p>
        <ul className="text-[11px] text-gray-500 space-y-2 list-disc list-inside leading-relaxed">
          <li>پسورد تمام فایل‌ها: <span className="text-blue-300 font-mono">www.steam-clone.ir</span></li>
          <li>حتماً از آخرین نسخه WinRAR برای اکسترکت استفاده کنید.</li>
          <li>در صورت خراب بودن فایل‌ها، از قابلیت Repair نرم‌افزار WinRAR استفاده کنید.</li>
        </ul>
      </div>
    </div>
  );
}

export default DownloadPage;