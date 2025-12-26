import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { gamesData as initialGames } from "./data";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { AnimatePresence } from "framer-motion";

// ایمپورت کامپوننت‌ها
import AdminPanel from "./Components/AdminPanel";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Slider from "./Components/Slider";
import GameDetails from "./Components/GameDetails";
import DownloadPage from "./Components/DownloadPage";
import AuthPage from "./Components/AuthPage";
import CartPage from "./Components/CartPage";
import PageTransition from "./Components/PageTransition";
import Footer from "./Components/Footer";
import AboutPage from "./Components/AboutPage";
import SupportPage from "./Components/SupportPage";

const categories = ["Action", "RPG", "Sports", "Strategy", "Adventure"];

// --- کامپوننت کمکی برای استخراج ID از آدرس URL ---
const GameRouteWrapper = ({ games, addToCart, setView, setSelectedGame }) => {
  const { gameId } = useParams();
  const game = games.find((g) => g.id === parseInt(gameId));

  if (!game)
    return (
      <div className="text-white text-center py-20 font-bold">
        بازی مورد نظر یافت نشد.
      </div>
    );

  return (
    <PageTransition key={game.id}>
      <GameDetails
        game={game}
        setView={setView}
        addToCart={addToCart}
        featuredGames={games.slice(0, 4)}
        setSelectedGame={setSelectedGame}
      />
    </PageTransition>
  );
};

function App() {
  const [darkMode, setDarkMode] = useLocalStorage("theme", true);
  const [cart, setCart] = useLocalStorage("shopping-cart", []);

  const [games, setGames] = useLocalStorage("all-games", initialGames);
  const [view, setView] = useState("categories");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const isAdmin = location.pathname === "/admin";
  const isGamePage = location.pathname.startsWith("/game/");

  useEffect(() => {
    if (!darkMode) document.documentElement.classList.add("light");
    else document.documentElement.classList.remove("light");
  }, [darkMode]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, view]);

  const addToCart = (game) => {
    const isExist = cart.find((item) => item.id === game.id);
    if (!isExist) setCart([...cart, game]);
    else alert("این بازی در سبد خرید موجود است.");
  };

  const filteredGames = games.filter((game) => {
    if (searchTerm)
      return game.title.toLowerCase().includes(searchTerm.toLowerCase());
    return game.category === selectedCategory;
  });

  const handleLogoClick = () => {
    navigate("/");
    setView("categories");
    setSelectedGame(null);
    setSelectedCategory(null);
    setSearchTerm("");
  };

  return (
    <div
      className="min-h-screen bg-[var(--bg-main)] text-[var(--text-color)] font-sans"
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
        {/* سایدبار در صفحه ادمین مخفی می‌شود */}
        {!isAdmin && (
          <Sidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            view={view}
            setView={setView}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            filteredGames={filteredGames}
            setSelectedGame={(game) => {
              setSelectedGame(game);
              if (game) navigate(`/game/${game.id}`);
            }}
          />
        )}

        <section
          className={`flex-1 space-y-8 ${
            isAdmin ? "max-w-5xl mx-auto w-full" : ""
          }`}
        >
          {/* اسلایدر فقط در صفحه اصلی نمایش داده می‌شود */}
          {!isAdmin && !isGamePage && view === "categories" && !searchTerm && (
            <Slider />
          )}

          <Routes>
            {/* پنل مدیریت */}
            <Route
              path="/admin"
              element={
                <PageTransition key="admin">
                  <AdminPanel
                    games={games}
                    setGames={setGames}
                    categories={categories}
                  />
                </PageTransition>
              }
            />

            {/* جزئیات هر بازی */}
            <Route
              path="/game/:gameId"
              element={
                <GameRouteWrapper
                  games={games}
                  addToCart={addToCart}
                  setView={setView}
                  setSelectedGame={setSelectedGame}
                />
              }
            />

            {/* سبد خرید */}
            <Route
              path="/cart"
              element={
                <PageTransition key="cart">
                  <CartPage cart={cart} setCart={setCart} />
                </PageTransition>
              }
            />

            {/* درباره ما */}
            <Route
              path="/about"
              element={
                <PageTransition key="about">
                  <AboutPage />
                </PageTransition>
              }
            />

            {/* پشتیبانی */}
            <Route
              path="/support"
              element={
                <PageTransition key="support">
                  <SupportPage />
                </PageTransition>
              }
            />

            {/* صفحه اصلی (فقط لیست پیشنهادی) */}
            <Route
              path="/"
              element={
                <PageTransition key="home">
                  <GameDetails
                    game={null}
                    addToCart={addToCart}
                    featuredGames={games.slice(0, 4)}
                    setSelectedGame={(game) => navigate(`/game/${game.id}`)}
                  />
                </PageTransition>
              }
            />
          </Routes>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
