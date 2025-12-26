import React, { useState } from "react";
import { 
  FaPlus, FaTrash, FaEdit, FaSave, FaTimes, FaSearch, 
  FaGamepad, FaTags, FaDesktop, FaServer 
} from "react-icons/fa";

const AdminPanel = ({ games, setGames, categories }) => {
  // استیت برای جستجو در پنل ادمین
  const [adminSearch, setAdminSearch] = useState("");
  // استیت برای ویرایش
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  
  // استیت برای بازی جدید
  const [newGame, setNewGame] = useState({
    title: "", price: "", category: categories[0], image: "", description: "",
    requirements: { 
      minOS: "Windows 10", minCPU: "", minRAM: "", minGPU: "", 
      recOS: "Windows 11", recCPU: "", recRAM: "", recGPU: "",
      storage: "" 
    }
  });

  // --- توابع کمکی ---
  const handleAddGame = (e) => {
    e.preventDefault();
    const gameWithId = { ...newGame, id: Date.now() };
    setGames([gameWithId, ...games]);
    alert("بازی جدید با موفقیت اضافه شد!");
    // ریست فرم
    setNewGame({
      title: "", price: "", category: categories[0], image: "", description: "",
      requirements: { minOS: "Windows 10", minCPU: "", minRAM: "", minGPU: "", recOS: "Windows 11", recCPU: "", recRAM: "", recGPU: "", storage: "" }
    });
  };

  const startEdit = (game) => {
    setEditingId(game.id);
    setEditForm({ ...game });
  };

  const saveEdit = () => {
    setGames(games.map(g => g.id === editingId ? editForm : g));
    setEditingId(null);
    alert("تغییرات ذخیره شد.");
  };

  const filteredAdminGames = games.filter(g => 
    g.title.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-500" dir="rtl">
      
      {/* ۱. هدر و آمار خیره کننده */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-3xl flex items-center gap-4">
          <div className="bg-blue-500 p-4 rounded-2xl text-white"><FaGamepad size={24}/></div>
          <div>
            <p className="text-gray-400 text-sm">کل بازی‌ها</p>
            <h3 className="text-2xl font-bold text-white">{games.length} مورد</h3>
          </div>
        </div>
        <div className="bg-purple-600/10 border border-purple-500/20 p-6 rounded-3xl flex items-center gap-4">
          <div className="bg-purple-500 p-4 rounded-2xl text-white"><FaTags size={24}/></div>
          <div>
            <p className="text-gray-400 text-sm">دسته‌بندی‌ها</p>
            <h3 className="text-2xl font-bold text-white">{categories.length} ژانر</h3>
          </div>
        </div>
      </div>

      {/* ۲. فرم افزودن بازی جدید */}
      <form onSubmit={handleAddGame} className="bg-[#1a1f29] border border-white/5 p-8 rounded-3xl space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
          <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
          افزودن محصول جدید به فروشگاه
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input required placeholder="نام بازی" className="admin-input" value={newGame.title} onChange={e => setNewGame({...newGame, title: e.target.value})} />
          <input required placeholder="قیمت (مثلاً 59.99$)" className="admin-input" value={newGame.price} onChange={e => setNewGame({...newGame, price: e.target.value})} />
          <select className="admin-input" value={newGame.category} onChange={e => setNewGame({...newGame, category: e.target.value})}>
            {categories.map(c => <option key={c} value={c} className="bg-[#1a1f29]">{c}</option>)}
          </select>
          <input placeholder="لینک تصویر (URL)" className="admin-input md:col-span-2 lg:col-span-3" value={newGame.image} onChange={e => setNewGame({...newGame, image: e.target.value})} />
          <textarea placeholder="توضیحات کوتاه بازی..." className="admin-input md:col-span-2 lg:col-span-3" rows="3" value={newGame.description} onChange={e => setNewGame({...newGame, description: e.target.value})} />
        </div>

        {/* بخش سیستم مورد نیاز در فرم افزودن */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-2xl">
           <div className="space-y-3">
              <p className="text-orange-400 font-bold flex items-center gap-2 text-sm"><FaDesktop/> حداقل سیستم</p>
              <input placeholder="CPU" className="admin-input-sm" onChange={e => setNewGame({...newGame, requirements: {...newGame.requirements, minCPU: e.target.value}})} />
              <input placeholder="RAM" className="admin-input-sm" onChange={e => setNewGame({...newGame, requirements: {...newGame.requirements, minRAM: e.target.value}})} />
              <input placeholder="GPU" className="admin-input-sm" onChange={e => setNewGame({...newGame, requirements: {...newGame.requirements, minGPU: e.target.value}})} />
           </div>
           <div className="space-y-3">
              <p className="text-purple-400 font-bold flex items-center gap-2 text-sm"><FaServer/> سیستم پیشنهادی</p>
              <input placeholder="CPU" className="admin-input-sm" onChange={e => setNewGame({...newGame, requirements: {...newGame.requirements, recCPU: e.target.value}})} />
              <input placeholder="RAM" className="admin-input-sm" onChange={e => setNewGame({...newGame, requirements: {...newGame.requirements, recRAM: e.target.value}})} />
              <input placeholder="GPU" className="admin-input-sm" onChange={e => setNewGame({...newGame, requirements: {...newGame.requirements, recGPU: e.target.value}})} />
           </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2">
          <FaPlus /> تایید و انتشار بازی
        </button>
      </form>

      {/* ۳. لیست مدیریت و جستجو */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-xl font-bold text-gray-300">لیست محصولات موجود</h2>
          <div className="relative w-full md:w-80">
            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              placeholder="جستجو در مدیریت..." 
              className="w-full bg-[#1a1f29] border border-white/10 rounded-full py-2 pr-10 pl-4 text-sm focus:border-blue-500 outline-none"
              value={adminSearch}
              onChange={e => setAdminSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-4">
          {filteredAdminGames.map(game => (
            <div key={game.id} className="bg-[#1a1f29] border border-white/5 p-4 rounded-2xl flex flex-wrap md:flex-nowrap items-center gap-4 group hover:border-blue-500/30 transition-all">
              <img src={game.image} className="w-20 h-20 object-cover rounded-xl shadow-lg" alt="" />
              
              {editingId === game.id ? (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input className="admin-input-edit" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                  <input className="admin-input-edit" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} />
                  <textarea className="admin-input-edit md:col-span-2" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} />
                </div>
              ) : (
                <div className="flex-1">
                  <h4 className="font-bold text-white text-lg">{game.title}</h4>
                  <div className="flex gap-3 mt-1">
                    <span className="text-blue-400 text-xs bg-blue-400/10 px-2 py-0.5 rounded-full">{game.category}</span>
                    <span className="text-green-500 text-xs font-mono">{game.price}</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-2 line-clamp-1 italic">{game.description}</p>
                </div>
              )}

              <div className="flex gap-2 mr-auto">
                {editingId === game.id ? (
                  <>
                    <button onClick={saveEdit} className="admin-btn-save"><FaSave /></button>
                    <button onClick={() => setEditingId(null)} className="admin-btn-cancel"><FaTimes /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(game)} className="admin-btn-edit"><FaEdit /></button>
                    <button onClick={() => setGames(games.filter(g => g.id !== game.id))} className="admin-btn-delete"><FaTrash /></button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* استایل‌های اختصاصی پنل ادمین */}
      <style jsx="true">{`
        .admin-input { background: #0f1218; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 12px; color: white; outline: none; transition: 0.3s; width: 100%; }
        .admin-input:focus { border-color: #3b82f6; background: #161b22; }
        .admin-input-sm { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 8px; color: white; width: 100%; font-size: 12px; outline: none; }
        .admin-input-edit { background: #0a0c10; border: 1px solid #333; border-radius: 10px; padding: 8px 12px; color: white; font-size: 14px; outline: none; width: 100%; }
        .admin-btn-edit { p-4 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition p-3; padding: 12px; }
        .admin-btn-delete { p-4 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition p-3; padding: 12px; }
        .admin-btn-save { background: #22c55e; color: white; border-radius: 12px; padding: 12px; }
        .admin-btn-cancel { background: #4b5563; color: white; border-radius: 12px; padding: 12px; }
      `}</style>
    </div>
  );
};

export default AdminPanel;