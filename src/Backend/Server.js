const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// --- Middleware ---
app.use(cors({
  origin: "http://localhost:5173", // آدرس دقیق فرانت‌ند
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json()); // برای تجزیه بدنه درخواست‌های JSON

// --- اتصال به دیتابیس محلی (MongoDB) ---
const mongoURI = 'mongodb://127.0.0.1:27017/steam_store';

mongoose.connect(mongoURI)
  .then(() => console.log("اتصال به MongoDB برقرار شد ✅"))
  .catch(err => console.error("خطا در اتصال به دیتابیس: ❌", err));

// --- تعریف مدل‌ها (Models) ---

// ۱. مدل بازی‌ها
const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: String,
  requirements: Object,
  id: Number // آیدی عددی برای هماهنگی با کدهای قبلی فرانت‌ند
});

const Game = mongoose.model('Game', gameSchema);

// ۲. مدل کاربران
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' } // کاربر عادی یا admin
});

const User = mongoose.model('User', userSchema);

// --- مسیرها (Routes) ---

// --- بخش بازی‌ها ---

// دریافت تمام بازی‌ها
app.get('/api/games', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).send("خطا در دریافت لیست بازی‌ها");
  }
});

// افزودن بازی جدید (ادمین)
app.post('/api/games', async (req, res) => {
  try {
    const newGame = new Game(req.body);
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (err) {
    res.status(400).send("خطا در ذخیره بازی: " + err.message);
  }
});

// حذف بازی (ادمین)
app.delete('/api/games/:id', async (req, res) => {
  try {
    // حذف بر اساس آیدی خودِ دیتابیس (_id)
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: "بازی با موفقیت حذف شد" });
  } catch (err) {
    res.status(500).send("خطا در حذف بازی");
  }
});

// --- بخش کاربران و احراز هویت ---

// ثبت‌نام کاربر جدید
app.post('/api/register', async (req, res) => {
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).send("این ایمیل قبلاً ثبت شده است.");

    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).send("خطا در ثبت‌نام کاربر");
  }
});

// ورود (Login)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      // ارسال اطلاعات کاربر به جز رمز عبور
      const { password, ...userData } = user._doc;
      res.json(userData);
    } else {
      res.status(401).send("ایمیل یا رمز عبور اشتباه است");
    }
  } catch (err) {
    res.status(500).send("خطا در برقراری ارتباط با سرور");
  }
});

// --- اجرای سرور ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`سرور استیم کپی روی پورت ${PORT} در حال اجراست... 🚀`);
});