export const gamesData = [
  {
    id: 1,
    category: "Action", // اضافه شد
    title: "Cyberpunk 2077",
    price: "29.99$",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/capsule_616x353.jpg",
    desc: "سایبرپانک ۲۰۷۷ یک بازی نقش‌آفرینی اکشن در دنیای آینده است.",
    tags: ["Open World", "RPG"],
    requirements: {
      min: { os: "Windows 10", cpu: "i5-3570K", ram: "8GB", gpu: "GTX 960" },
      rec: { os: "Windows 11", cpu: "i7-12700K", ram: "16GB", gpu: "RTX 3070" }
    }
  },
  {
    id: 2,
    category: "Action",
    title: "Elden Ring",
    price: "59.99$",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/capsule_616x353.jpg",
    desc: "یک بازی فانتزی حماسی در دنیایی وسیع و تاریک.",
    tags: ["Souls-like", "Action"],
    requirements: {
      min: { os: "Windows 10", cpu: "i5-8400", ram: "12GB", gpu: "GTX 1060" },
      rec: { os: "Windows 11", cpu: "i7-8700K", ram: "16GB", gpu: "RTX 3060" }
    }
  },
  {
    id: 3,
    category: "Sport",
    title: "FC 24",
    price: "69.99$",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2195250/capsule_616x353.jpg",
    desc: "تجربه واقعی فوتبال با تکنولوژی HyperMotion.",
    tags: ["Soccer", "Sports"],
    requirements: {
      min: { os: "Windows 10", cpu: "i5-6600K", ram: "8GB", gpu: "GTX 1050 Ti" },
      rec: { os: "Windows 11", cpu: "i7-6700", ram: "12GB", gpu: "GTX 1660" }
    }
  }
];

export const categories = ["Action", "Sport", "RPG", "Strategy"];
export const newsData = [
  { id: 1, title: 'تخفیفات بهاره استیم', desc: 'بیش از ۵۰۰ بازی محبوب با ۷۰٪ تخفیف', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200' },
  { id: 2, title: 'آپدیت جدید CS2', desc: 'تغییرات بزرگ در نقشه‌های رقابتی', img: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200' }
];