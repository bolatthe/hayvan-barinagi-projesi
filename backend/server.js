const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path'); // 💡 path modülü eklendi
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 💡 frontend dizinini serve et
app.use(express.static(path.join(__dirname, '../frontend')));

const User = require('./models/User');
const Animal = require('./models/Animal');
const AdoptionRequest = require('./models/AdoptionRequest');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB bağlantısı başarılı'))
    .catch(err => console.error('❌ MongoDB bağlantı hatası:', err));

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Kullanıcı bulunamadı' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Hatalı şifre' });

    const token = jwt.sign({ id: user._id, role: user.role }, 'secret');
    res.json({ token, role: user.role });
});

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, role: 'user' });
    await user.save();
    res.json({ message: 'Kayıt başarılı' });
});

app.get('/api/animals', async (req, res) => {
    const animals = await Animal.find();
    res.json(animals);
});

app.post('/api/adopt/:animalId', async (req, res) => {
    const { userId } = req.body;
    const request = new AdoptionRequest({ userId, animalId: req.params.animalId, status: 'pending' });
    await request.save();
    res.json({ message: 'Talep gönderildi' });
});

app.get('/api/admin/requests', async (req, res) => {
    const requests = await AdoptionRequest.find().populate('userId').populate('animalId');
    res.json(requests);
});

app.post('/api/admin/requests/:id/:action', async (req, res) => {
    const { action } = req.params;
    const status = action === 'accept' ? 'accepted' : 'rejected';
    await AdoptionRequest.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: `Talep ${status}` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Sunucu ${PORT} portunda çalışıyor.`));
