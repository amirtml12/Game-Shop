import React, { useState } from "react";
import { User, Mail, Lock, ArrowRight, Github } from "lucide-react";

function AuthPage({ setView }) {
  const [mode, setMode] = useState("login"); // 'login' | 'register' | 'forgot'

  return (
    <div className="min-h-[500px] flex items-center justify-center animate-in fade-in zoom-in duration-300">
      <div className="w-full max-w-md bg-[#171a21] border border-white/5 p-8 rounded-xl shadow-2xl">
        
        {/* هدر فرم */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">
            {mode === "login" ? "ورود به حساب" : mode === "register" ? "ساخت حساب جدید" : "بازیابی رمز عبور"}
          </h2>
          <p className="text-xs text-gray-500">خوش آمدید، لطفاً اطلاعات خود را وارد کنید</p>
        </div>

        {/* فیلدهای فرم */}
        <div className="space-y-4">
          {mode === "register" && (
            <div className="relative">
              <User className="absolute right-3 top-3 text-gray-500" size={18} />
              <input type="text" placeholder="نام کاربری" className="w-full bg-[#316282]/20 border border-white/10 rounded p-3 pr-10 text-sm text-white focus:border-blue-500 outline-none" />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute right-3 top-3 text-gray-500" size={18} />
            <input type="email" placeholder="ایمیل" className="w-full bg-[#316282]/20 border border-white/10 rounded p-3 pr-10 text-sm text-white focus:border-blue-500 outline-none" />
          </div>

          {mode !== "forgot" && (
            <div className="relative">
              <Lock className="absolute right-3 top-3 text-gray-500" size={18} />
              <input type="password" placeholder="رمز عبور" className="w-full bg-[#316282]/20 border border-white/10 rounded p-3 pr-10 text-sm text-white focus:border-blue-500 outline-none" />
            </div>
          )}

          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-all shadow-lg shadow-blue-900/20">
            {mode === "login" ? "ورود" : mode === "register" ? "ثبت‌نام" : "ارسال ایمیل بازیابی"}
          </button>
        </div>

        {/* دکمه‌های جابجایی بین حالت‌ها */}
        <div className="mt-6 space-y-3 text-center">
          {mode === "login" ? (
            <>
              <button onClick={() => setMode("forgot")} className="block w-full text-xs text-gray-400 hover:text-white transition">فراموشی رمز عبور؟</button>
              <p className="text-xs text-gray-500">حساب ندارید؟ <button onClick={() => setMode("register")} className="text-blue-400 font-bold hover:underline">ایجاد حساب</button></p>
            </>
          ) : (
            <button onClick={() => setMode("login")} className="flex items-center justify-center gap-2 w-full text-xs text-gray-400 hover:text-white transition">
              <ArrowRight size={14} /> بازگشت به صفحه ورود
            </button>
          )}
        </div>

        <button 
          onClick={() => setView("categories")}
          className="mt-8 w-full border border-white/5 text-[10px] text-gray-600 hover:text-gray-400 py-2 rounded transition"
        >
          انصراف و بازگشت به فروشگاه
        </button>
      </div>
    </div>
  );
}

export default AuthPage;