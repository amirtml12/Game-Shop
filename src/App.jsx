import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, useParams, Navigate } from "react-router-dom";
import axios from "axios"; // حتما نصب کنید: npm install axios
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
const API_URL = "http://localhost:5000/api"; // آدرس بک‌ند شما

// --- کامپوننت کمکی برای استخراج ID ---
const GameRouteWrapper = ({ games, addToCart, navigate }) => {
  const { gameId } = useParams();
  const game = games.find((g) => g.id === gameId || g._id === gameId);

  if (!game) return <div className="text-white text-center py-20 font-bold">بازی یافت نشد.</div>;

  return (
    <PageTransition key={game._id || game.id}>
      <GameDetails
        game={game}
        addToCart={addToCart}
        featuredGames={games.slice(0, 4)}
        setSelectedGame={(g) => navigate(`/game/${g._id || g.id}`)}
      />
    </PageTransition>
  );
};

function App() {
  const [darkMode, setDarkMode] = useLocalStorage("theme", true);
  const [cart, setCart] = useLocalStorage("shopping-cart", []);
  const [user, setUser] = useLocalStorage("user", null); // وضعیت لاگین کاربر
  
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // اتصال به بک‌ند برای دریافت بازی‌ها
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axios.get(`${API_URL}/games`);
        setGames(res.data);
      } catch (err) {
        console.error("خطا در اتصال به سرور:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !darkMode);
  }, [darkMode]);

  const addToCart = (game) => {
    if (cart.find((item) => item._id === game._id)) {
      alert("این بازی در سبد شما هست.");
    } else {
      setCart([...cart, game]);
    }
  };

  const filteredGames = games.filter((game) => {
    if (searchTerm) return game.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedCategory) return game.category === selectedCategory;
    return true;
  });

  if (loading) return <div className="h-screen flex items-center justify-center bg-[#0f1218] text-blue-500">در حال دریافت اطلاعات...</div>;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-color)] font-sans" dir="rtl">
      <Navbar 
        onLogoClick={() => navigate("/")} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        cartCount={cart.length}
        user={user}
        onLogout={() => setUser(null)}
      />

      <main className="container mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8">
        {location.pathname !== "/admin" && (
          <Sidebar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            filteredGames={filteredGames}
          />
        )}

        <section className={`flex-1 space-y-8 ${location.pathname === "/admin" ? "max-w-5xl mx-auto w-full" : ""}`}>
          {location.pathname === "/" && !searchTerm && <Slider />}

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* مسیرهای عمومی */}
              <Route path="/" element={<PageTransition><GameDetails game={null} featuredGames={games.slice(0, 4)} addToCart={addToCart} /></PageTransition>} />
              <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
              <Route path="/support" element={<PageTransition><SupportPage /></PageTransition>} />
              <Route path="/cart" element={<PageTransition><CartPage cart={cart} setCart={setCart} /></PageTransition>} />
              <Route path="/login" element={<PageTransition><AuthPage setUser={setUser} /></PageTransition>} />
              
              {/* مسیرهای داینامیک */}
              <Route path="/game/:gameId" element={<GameRouteWrapper games={games} addToCart={addToCart} navigate={navigate} />} />
              <Route path="/download/:gameId" element={<PageTransition><DownloadPage games={games} /></PageTransition>} />

              {/* پنل ادمین (محافظت شده) */}
              <Route path="/admin" element={
                user?.role === "admin" ? (
                  <PageTransition><AdminPanel games={games} setGames={setGames} categories={categories} /></PageTransition>
                ) : (
                  <Navigate to="/login" />
                )
              } />
            </Routes>
          </AnimatePresence>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;