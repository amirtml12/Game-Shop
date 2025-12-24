import React, { useState, useEffect } from "react";
import { gamesData, categories } from "./data";
import { useLocalStorage } from "./hooks/useLocalStorage";

// ایمپورت کامپوننت‌ها (دقت کن اسم پوشه Components و فایل‌ها دقیق باشد)
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Slider from "./Components/Slider";
import GameDetails from "./Components/GameDetails";
import DownloadPage from "./Components/DownloadPage";
import AuthPage from "./Components/AuthPage";
import CartPage from "./Components/CartPage"; // این احتمالاً جا افتاده بود

function App() {
  // --- وضعیت‌های حافظه‌دار ---
  const [darkMode, setDarkMode] = useLocalStorage("theme", true);
  const [cart, setCart] = useLocalStorage("shopping-cart", []);

  // --- وضعیت‌های معمولی ---
  const [view, setView] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // --- مدیریت تم ---
  useEffect(() => {
    if (!darkMode) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [darkMode]);

  // --- منطق افزودن به سبد خرید ---
  const addToCart = (game) => {
    const isExist = cart.find((item) => item.id === game.id);
    if (!isExist) {
      setCart([...cart, game]);
    } else {
      alert("این بازی از قبل در سبد شماست.");
    }
  };

  // --- فیلتر بازی‌ها ---
  const filteredGames = gamesData.filter((game) => {
    if (searchTerm) {
      return game.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return game.category === selectedCategory;
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedGame, view]);

  const handleLogoClick = () => {
    setView("categories");
    setSearchTerm("");
    setSelectedGame(null);
    setSelectedCategory(null);
  };

  return (
    <div
      className="min-h-screen bg-[var(--bg-main)] text-[var(--text-color)] font-sans transition-colors duration-500"
      dir="rtl"
    >
      <Navbar
        onLogoClick={handleLogoClick}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setView={setView}
        cartCount={cart.length}
      />

      <main className="container mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8">
        {/* مخفی کردن سایدبار در صفحه ورود یا سبد خرید برای جلوگیری از شلوغی */}
        {view !== "login" && view !== "cart" && (
          <Sidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            view={view}
            setView={setView}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            filteredGames={filteredGames}
            setSelectedGame={setSelectedGame}
            selectedGame={selectedGame}
          />
        )}

        <section
          className={`flex-1 space-y-8 ${
            view === "login" || view === "cart"
              ? "max-w-4xl mx-auto w-full"
              : ""
          }`}
        >
          {/* ۱. مدیریت نمایش اسلایدر به صورت مستقل */}
          {/* اسلایدر فقط در صفحات فروشگاه و زمانی که جستجو نمی‌کنیم نمایش داده شود */}
          {view !== "login" &&
            view !== "cart" &&
            view !== "download" &&
            !searchTerm && <Slider />}

          {/* ۲. مدیریت نمایش محتوای متغیر (جزئیات بازی، سبد خرید، ورود یا دانلود) */}
          {view === "cart" ? (
            <CartPage cart={cart} setCart={setCart} setView={setView} />
          ) : view === "login" ? (
            <AuthPage setView={setView} />
          ) : view === "download" ? (
            <DownloadPage selectedGame={selectedGame} setView={setView} />
          ) : (
            <GameDetails
              game={selectedGame}
              setView={setView}
              addToCart={addToCart}
            />
          )}
        </section>
      </main>

      <footer className="py-10 text-center text-gray-500 text-[10px] border-t border-white/5 mt-10 uppercase tracking-widest">
        &copy; 2025 Steam Clone | Powered by React Hooks
      </footer>
    </div>
  );
}

export default App;
