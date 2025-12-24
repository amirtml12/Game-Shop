import React from "react";
import { Search, ArrowRight, ChevronLeft } from "lucide-react";

function Sidebar({ 
  searchTerm, 
  setSearchTerm, 
  view, 
  setView, 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  filteredGames, 
  setSelectedGame,
  selectedGame 
}) {
  return (
    <aside className="w-full lg:w-1/4 space-y-4">
      {/* Search Box */}
      <div className="bg-[#171a21] rounded-lg p-3 shadow-2xl border border-white/5">
        <div className="relative">
          <input 
            type="text"
            placeholder="جستجوی سریع..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (e.target.value !== "") setView("games");
            }}
            className="w-full bg-[#316282] border-none rounded p-2 pr-9 text-xs text-white placeholder-blue-300 outline-none focus:ring-1 focus:ring-blue-400"
          />
          <Search className="absolute right-3 top-2.5 text-blue-300" size={14} />
        </div>
      </div>

      <div className="bg-[var(--bg-card)] rounded-lg overflow-hidden border border-white/5 shadow-2xl">
        {view === "games" && !searchTerm && (
          <button 
            onClick={() => setView("categories")}
            className="w-full flex items-center gap-2 p-4 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition border-b border-blue-500/20 font-bold text-sm"
          >
            <ArrowRight size={18} /> بازگشت به ژانرها
          </button>
        )}

        {view === "categories" && !searchTerm ? (
          <div className="p-2 space-y-1">
            <span className="text-[10px] text-gray-500 uppercase font-bold p-2 tracking-widest block">انتخاب سبک</span>
            {categories.map((cat) => (
              <div 
                key={cat}
                onClick={() => { setSelectedCategory(cat); setView("games"); setSearchTerm(""); }}
                className="flex justify-between items-center p-3 hover:bg-white/5 rounded cursor-pointer group transition"
              >
                <span className="font-medium">{cat}</span>
                <ChevronLeft size={16} className="text-gray-600 group-hover:text-blue-400 transition" />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-2">
            <span className="text-[10px] text-blue-400 uppercase font-bold p-2 tracking-widest italic block">
              {searchTerm ? "نتایج جستجو" : selectedCategory}
            </span>
            <div className="max-h-[500px] overflow-y-auto space-y-1 custom-scrollbar">
              {filteredGames.length > 0 ? (
                filteredGames.map((game) => (
                  <div 
                    key={game.id} 
                    onClick={() => { setSelectedGame(game); if(view === 'download') setView('games'); }}
                    className={`flex items-center gap-3 p-3 rounded cursor-pointer transition-all ${selectedGame?.id === game.id ? "bg-blue-600/50 border-r-4 border-blue-400" : "hover:bg-white/5"}`}
                  >
                    <img src={game.image} className="w-12 h-8 object-cover rounded" alt="" />
                    <span className="text-xs font-bold truncate">{game.title}</span>
                  </div>
                ))
              ) : (
                <div className="p-4 text-xs text-gray-500 text-center">بازی یافت نشد</div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;