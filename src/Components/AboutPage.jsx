import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="space-y-12 py-10">
      {/* تیتر اصلی */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h2 className="text-4xl font-extrabold text-white">درباره استیم استور</h2>
        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
          ما تلاش می‌کنیم تا بهترین تجربه خرید بازی‌های دیجیتال را برای گیمرهای فارسی‌زبان فراهم کنیم. 
          پلتفرم ما با استفاده از مدرن‌ترین تکنولوژی‌های وب طراحی شده است.
        </p>
      </motion.div>

      {/* بخش ویژگی‌ها */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "تحویل آنی", desc: "بلافاصله بعد از خرید، لینک دانلود را دریافت کنید.", icon: "⚡" },
          { title: "پشتیبانی ۲۴ ساعته", desc: "تیم ما در تمام روزهای هفته پاسخگوی شماست.", icon: "🎧" },
          { title: "امنیت پرداخت", desc: "تمامی تراکنش‌ها در محیطی امن انجام می‌شوند.", icon: "🛡️" },
        ].map((item, index) => (
          <motion.div 
            key={index}
            whileHover={{ y: -10 }}
            className="bg-[#1a1f29] p-8 rounded-2xl border border-white/5 text-center space-y-3"
          >
            <div className="text-4xl">{item.icon}</div>
            <h4 className="text-xl font-bold text-blue-400">{item.title}</h4>
            <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* بخش تکنولوژی‌ها */}
      <div className="bg-white/5 p-10 rounded-3xl border border-white/5 text-center">
        <h3 className="text-xl font-bold mb-8 text-gray-300">تکنولوژی‌های استفاده شده</h3>
        <div className="flex flex-wrap justify-center gap-8 opacity-60">
          <span className="text-2xl font-bold grayscale hover:grayscale-0 transition cursor-default">REACT</span>
          <span className="text-2xl font-bold grayscale hover:grayscale-0 transition cursor-default">TAILWIND</span>
          <span className="text-2xl font-bold grayscale hover:grayscale-0 transition cursor-default">FRAMER MOTION</span>
          <span className="text-2xl font-bold grayscale hover:grayscale-0 transition cursor-default">VITE</span>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;