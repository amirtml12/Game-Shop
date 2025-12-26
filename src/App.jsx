import React, { useState, useEffect } from "react";
import { gamesData, categories } from "./data";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { AnimatePresence } from "framer-motion"; // برای مدیریت خروج انیمیشن‌ها

// ایمپورت کامپوننت‌ها
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Slider from "./Components/Slider";
import GameDetails from "./Components/GameDetails";
import DownloadPage from "./Components/DownloadPage";
import AuthPage from "./Components/AuthPage";
import CartPage from "./Components/CartPage";
import PageTransition from "./Components/PageTransition";

function App() {
  // --- وضعیت‌های حافظه‌دار (Local Storage) ---
  const [darkMode, setDarkMode] = useLocalStorage("theme", true);
  const [cart, setCart] = useLocalStorage("shopping-cart", []);

  // --- وضعیت‌های اصلی اپلیکیشن ---
  const [view, setView] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // --- مدیریت تم تیره و روشن ---
  useEffect(() => {
    if (!darkMode) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [darkMode]);

  // --- اسکرول به بالا هنگام تغییر صفحه یا بازی ---
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [selectedGame, view]);

  // --- منطق افزودن به سبد خرید ---
  const addToCart = (game) => {
    const isExist = cart.find((item) => item.id === game.id);
    if (!isExist) {
      setCart([...cart, game]);
    } else {
      alert("این بازی از قبل در سبد خرید شما موجود است.");
    }
  };

  // --- فیلتر کردن لیست بازی‌ها ---
  const filteredGames = gamesData.filter((game) => {
    if (searchTerm) {
      return game.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return game.category === selectedCategory;
  });

  // --- بازگشت به صفحه اصلی (لوگو) ---
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
      {/* نوار ناوبری */}
      <Navbar
        onLogoClick={handleLogoClick}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setView={setView}
        cartCount={cart.length}
      />

      <main className="container mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8">
        {/* نمایش سایدبار فقط در صفحات فروشگاه */}
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
          {/* ۱. اسلایدر را از AnimatePresence خارج کردیم تا ثابت بماند و نپرد */}
          {!searchTerm &&
            view !== "login" &&
            view !== "cart" &&
            view !== "download" && <Slider />}

          {/* ۲. فقط محتوای متغیر را داخل انیمیشن می‌گذاریم */}
          <AnimatePresence mode="wait">
            {view === "cart" ? (
              <PageTransition key="cart-page">
                <CartPage cart={cart} setCart={setCart} setView={setView} />
              </PageTransition>
            ) : view === "login" ? (
              <PageTransition key="login-page">
                <AuthPage setView={setView} />
              </PageTransition>
            ) : view === "download" ? (
              <PageTransition key="download-page">
                <DownloadPage selectedGame={selectedGame} setView={setView} />
              </PageTransition>
            ) : (
              <PageTransition
                key={selectedGame ? selectedGame.id : "game-list"}
              >
                <GameDetails
                  game={selectedGame}
                  setView={setView}
                  addToCart={addToCart}
                />
              </PageTransition>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* فوتر ساده */}
      <footer className="py-10 text-center text-gray-500 text-[10px] border-t border-white/5 mt-10 uppercase tracking-widest">
        &copy; 2025 Steam Store Clone | Developed with React & Framer Motion
      </footer>
    </div>
  );
}

export default App;
