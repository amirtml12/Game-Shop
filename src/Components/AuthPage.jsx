import React, { useState } from "react";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthPage({ setView, setUser }) {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 شروع فرآیند اتصال به سرور...");
    console.log("📝 اطلاعات تایپ شده:", { email, password });

    try {
      if (mode === "login") {
        // ارسال درخواست به بک‌ند
        const response = await axios.post("http://localhost:5000/api/login", { 
            email: email.trim(), // حذف فاصله‌های اضافی احتمالی
            password: password 
        });

        console.log("✅ پاسخ موفقیت‌آمیز سرور دریافت شد:", response.data);

        // ۱. ذخیره کاربر در استیت اصلی اپلیکیشن
        if (setUser) {
            setUser(response.data);
            console.log("👤 کاربر در سیستم ست شد.");
        }

        // ۲. هدایت کاربر (اگر ادمین بود به پنل، وگرنه به فروشگاه)
        if (response.data.role === "admin") {
    navigate("/admin"); // آدرس صفحه ادمین تو
} else {
    navigate("/"); // آدرس صفحه اصلی تو
}
        alert("ورود با موفقیت انجام شد!");

      } else if (mode === "register") {
        const response = await axios.post("http://localhost:5000/api/register", { 
            name, 
            email: email.trim(), 
            password 
        });
        console.log("✨ ثبت‌نام موفق:", response.data);
        alert("ثبت‌نام با موفقیت انجام شد! حالا می‌توانید وارد شوید.");
        setMode("login");
      }
    } catch (error) {
      console.error("❌ جزئیات خطای اکسایوس:", error);
      
      // بررسی نوع خطا برای نمایش پیام دقیق‌تر به کاربر
      if (error.response) {
        // سرور پاسخ داده اما با کد خطا (مثلاً 401 یا 400)
        console.log("⚠️ پیام سرور:", error.response.data);
        alert(error.response.data); 
      } else if (error.request) {
        // درخواست فرستاده شده اما جوابی نیامده (مشکل شبکه یا سرور خاموش)
        alert("سرور پاسخ نمی‌دهد. مطمئن شوید Backend روشن است.");
      } else {
        alert("خطای ناشناخته: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-[500px] flex items-center justify-center animate-in fade-in zoom-in duration-300">
      <div className="w-full max-w-md bg-[#171a21] border border-white/5 p-8 rounded-xl shadow-2xl">
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter">
            {mode === "login" ? "ورود به حساب" : mode === "register" ? "ساخت حساب جدید" : "بازیابی رمز عبور"}
          </h2>
          <p className="text-xs text-gray-500">خوش آمدید، لطفاً اطلاعات خود را وارد کنید</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="relative">
              <User className="absolute right-3 top-3 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="نام کاربری" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#316282]/20 border border-white/10 rounded p-3 pr-10 text-sm text-white focus:border-blue-500 outline-none" 
                required
              />
            </div>
          )}
          
          <div className="relative">
            <Mail className="absolute right-3 top-3 text-gray-500" size={18} />
            <input 
              type="email" 
              placeholder="ایمیل" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#316282]/20 border border-white/10 rounded p-3 pr-10 text-sm text-white focus:border-blue-500 outline-none" 
              required
            />
          </div>

          {mode !== "forgot" && (
            <div className="relative">
              <Lock className="absolute right-3 top-3 text-gray-500" size={18} />
              <input 
                type="password" 
                placeholder="رمز عبور" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#316282]/20 border border-white/10 rounded p-3 pr-10 text-sm text-white focus:border-blue-500 outline-none" 
                required
              />
            </div>
          )}

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition-all shadow-lg shadow-blue-900/20">
            {mode === "login" ? "ورود" : mode === "register" ? "ثبت‌نام" : "ارسال ایمیل بازیابی"}
          </button>
        </form>

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