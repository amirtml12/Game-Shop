import React from "react";
import { Gamepad2, ShoppingCart, Sun, Moon, User } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar({ onLogoClick, darkMode, setDarkMode, setView, cartCount }) {
  return (
    <nav className="bg-[var(--bg-navbar)] p-4 border-b border-blue-500/20 sticky top-0 z-50 shadow-xl transition-colors duration-500">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* بخش لوگو و پنل مدیریت */}
        <div className="flex items-center gap-4">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={onLogoClick}
          >
            <Gamepad2 className="text-blue-500" size={32} />
            <h1 className={`text-2xl font-black italic tracking-tighter transition-colors ${darkMode ? "text-white" : "text-gray-800"}`}>
              STEAM STORE
            </h1>
          </div>

          <Link
            to="/admin"
            className="bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white px-3 py-1 rounded-md text-xs transition-all border border-red-600/30 font-bold"
          >
            پنل مدیریت
          </Link>
        </div>

        {/* منوی میانی - اصلاح شده برای روتینگ */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            onClick={onLogoClick}
            className="hover:text-blue-400 transition"
          >
            صفحه اصلی
          </Link>
          <Link
            to="/"
            onClick={() => setView("about")}
            className="hover:text-blue-400 transition"
          >
            درباره ما
          </Link>
          <Link
            to="/"
            onClick={() => setView("support")}
            className="hover:text-blue-400 transition"
          >
            پشتیبانی
          </Link>
        </div>

        {/* بخش ابزارها */}
        <div className="flex items-center gap-4 md:gap-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-500/20 transition-all text-blue-400"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} className="text-gray-600" />}
          </button>

          <Link
            to="/"
            onClick={() => setView("login")}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-md border transition-all 
              ${darkMode ? "text-gray-300 border-white/10 hover:bg-white/5 hover:text-white" : "text-gray-700 border-gray-200 hover:bg-gray-100"}`}
          >
            <User size={16} className="text-blue-500" />
            <span className="hidden sm:inline">ورود / ثبت‌نام</span>
          </Link>

          <Link
            to="/"
            onClick={() => setView("cart")}
            className="relative cursor-pointer group p-1"
          >
            <ShoppingCart className={`w-6 h-6 transition-colors ${darkMode ? "text-gray-400 group-hover:text-white" : "text-gray-600 group-hover:text-black"}`} />
            <span className="absolute -top-1 -left-1 bg-blue-600 text-white text-[10px] rounded-full min-w-[16px] h-4 flex items-center justify-center font-bold px-1 shadow-lg">
              {cartCount || 0}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;