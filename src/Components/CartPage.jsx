import React from "react";
import { Trash2, ArrowRight, CreditCard } from "lucide-react";

function CartPage({ cart, setCart, setView }) {
  const totalPrice = cart.reduce((acc, game) => acc + (parseFloat(game.price) || 0), 0);

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="bg-[#1b2838] border border-white/5 rounded-xl p-6 shadow-2xl animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-white">سبد خرید شما ({cart.length})</h2>
        <button onClick={() => setView("categories")} className="flex items-center gap-2 text-blue-400 text-sm hover:underline">
          <ArrowRight size={16} /> بازگشت به فروشگاه
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="py-20 text-center text-gray-500 italic border-2 border-dashed border-white/5 rounded-xl">
          سبد خرید شما خالی است.
        </div>
      ) : (
        <div className="space-y-4">
          {cart.map((game) => (
            <div key={game.id} className="flex items-center justify-between bg-black/20 p-4 rounded-lg border border-white/5">
              <div className="flex items-center gap-4">
                <img src={game.image} className="w-20 h-12 object-cover rounded" />
                <div>
                  <h3 className="text-white font-bold text-sm">{game.title}</h3>
                  <span className="text-green-500 text-xs">{game.price}</span>
                </div>
              </div>
              <button onClick={() => removeItem(game.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded transition">
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          <div className="mt-10 p-6 bg-black/40 rounded-lg border-t-2 border-blue-500">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400">جمع کل قابل پرداخت:</span>
              <span className="text-2xl font-black text-green-400">{totalPrice} تومان</span>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-md flex items-center justify-center gap-3 transition-all">
              <CreditCard size={20} /> تسویه حساب و پرداخت نهایی
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;