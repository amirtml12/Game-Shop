import React from "react";
import { Gamepad2, ShoppingCart, Sun, Moon, User, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ onLogoClick, darkMode, setDarkMode, cartCount }) {
  const location = useLocation();

  // تابعی برای تشخیص اینکه آیا یک لینک فعال است یا خیر (برای استایل دهی)
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[var(--bg-navbar)] p-4 border-b border-blue-500/20 sticky top-0 z-50 shadow-xl transition-colors duration-500">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* بخش سمت راست: لوگو و دکمه ادمین */}
        <div className="flex items-center gap-5">
          <Link
            to="/"
            onClick={onLogoClick}
            className="flex items-center gap-2 group"
          >
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-blue-500/20">
              <Gamepad2 className="text-white" size={24} />
            </div>
            <h1 className={`text-xl font-black italic tracking-tighter transition-colors ${darkMode ? "text-white" : "text-gray-800"}`}>
              STEAM STORE
            </h1>
          </Link>

          {/* دکمه پنل مدیریت با استایل متمایز */}
          <Link
            to="/admin"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              isActive("/admin")
                ? "bg-red-600 text-white border-red-600"
                : "bg-red-600/10 text-red-500 border-red-600/30 hover:bg-red-600 hover:text-white"
            }`}
          >
            <LayoutDashboard size={14} />
            پنل مدیریت
          </Link>
        </div>

        {/* بخش میانی: منوی ناوبری (در موبایل مخفی می‌شود) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold">
          <Link
            to="/"
            className={`${isActive("/") ? "text-blue-500" : "hover:text-blue-400"} transition-colors`}
          >
            صفحه اصلی
          </Link>
          <Link
            to="/about"
            className={`${isActive("/about") ? "text-blue-500" : "hover:text-blue-400"} transition-colors`}
          >
            درباره ما
          </Link>
          <Link
            to="/support"
            className={`${isActive("/support") ? "text-blue-500" : "hover:text-blue-400"} transition-colors`}
          >
            پشتیبانی
          </Link>
        </div>

        {/* بخش سمت چپ: ابزارها، تم و پروفایل */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* سوئیچ تم */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-2xl hover:bg-gray-500/10 transition-all text-blue-400 border border-transparent hover:border-blue-500/20"
            title="تغییر تم"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} className="text-gray-600" />}
          </button>

          {/* ورود / ثبت‌نام */}
          <Link
            to="/login"
            className={`flex items-center gap-2 text-xs font-black px-5 py-2.5 rounded-2xl border transition-all 
              ${darkMode 
                ? "text-gray-300 border-white/10 bg-white/5 hover:bg-white/10 hover:text-white" 
                : "text-gray-700 border-gray-200 bg-gray-50 hover:bg-gray-100"}`}
          >
            <User size={16} className="text-blue-500" />
            <span className="hidden sm:inline">ورود / عضویت</span>
          </Link>

          {/* سبد خرید با نشانگر تعداد */}
          <Link
            to="/cart"
            className={`relative p-2.5 rounded-2xl border transition-all group ${
              isActive("/cart") 
              ? "bg-blue-600 border-blue-600 text-white" 
              : "border-transparent hover:bg-blue-500/10 text-gray-400 hover:text-blue-400"
            }`}
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-black shadow-lg animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;