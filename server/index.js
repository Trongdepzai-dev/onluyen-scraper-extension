require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Cấu hình Multer để lưu file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const downloadDir = path.join(__dirname, 'public', 'downloads');
        if (!fs.existsSync(downloadDir)) {
            fs.mkdirSync(downloadDir, { recursive: true });
        }
        cb(null, downloadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

const FEEDBACK_FILE = path.join(__dirname, 'feedback.json');
const UPDATE_FILE = path.join(__dirname, 'update_info.json');

// Ensure files exist
if (!fs.existsSync(FEEDBACK_FILE)) fs.writeFileSync(FEEDBACK_FILE, '[]', 'utf8');
if (!fs.existsSync(UPDATE_FILE)) {
    const defaultConfig = {
        version: "1.0.0",
        message: "Cập nhật mới",
        announcement: {
            enabled: false,
            title: "Thông báo hệ thống",
            content: "Chào mừng bạn đến với OnLuyen Scraper!",
            type: "info" // info, warning, success
        },
        maintenance: false,
        platforms: {
            chrome: { url: "", force_update: false },
            edge: { url: "", force_update: false }
        }
    };
    fs.writeFileSync(UPDATE_FILE, JSON.stringify(defaultConfig, null, 2), 'utf8');
}

// ==========================================
// API PUBLIC (Extension gọi vào đây)
// ==========================================

// Lấy thông tin cập nhật & thông báo
app.get('/update_info.json', (req, res) => {
    res.sendFile(UPDATE_FILE);
});

// Gửi Feedback
app.post('/api/feedback', (req, res) => {
    const { type, message, contact } = req.body;
    if (!message) return res.status(400).json({ success: false, error: 'Message is required' });

    const newFeedback = {
        id: Date.now(),
        type: type || 'feedback',
        message,
        contact: contact || 'anonymous',
        timestamp: new Date().toISOString()
    };

    fs.readFile(FEEDBACK_FILE, 'utf8', (err, data) => {
        let feedbackList = [];
        try { feedbackList = JSON.parse(data); } catch (e) {}
        feedbackList.push(newFeedback);
        fs.writeFile(FEEDBACK_FILE, JSON.stringify(feedbackList, null, 2), () => {
            res.json({ success: true });
        });
    });
});

// ==========================================
// API ADMIN (Cần Password)
// ==========================================

const adminAuth = (req, res, next) => {
    const password = req.query.password || req.headers['x-admin-password'] || req.body.password;
    if (password !== ADMIN_PASS) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }
    next();
};

app.get('/api/admin/feedbacks', adminAuth, (req, res) => {
    fs.readFile(FEEDBACK_FILE, 'utf8', (err, data) => {
        try {
            const list = JSON.parse(data);
            list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            res.json(list);
        } catch (e) { res.json([]); }
    });
});

// Xóa feedback
app.delete('/api/admin/feedbacks/:id', adminAuth, (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile(FEEDBACK_FILE, 'utf8', (err, data) => {
        try {
            let list = JSON.parse(data);
            list = list.filter(f => f.id !== id);
            fs.writeFile(FEEDBACK_FILE, JSON.stringify(list, null, 2), () => {
                res.json({ success: true });
            });
        } catch (e) { res.status(500).json({ success: false }); }
    });
});

app.get('/api/admin/config', adminAuth, (req, res) => {
    fs.readFile(UPDATE_FILE, 'utf8', (err, data) => {
        try { res.json(JSON.parse(data)); } catch (e) { res.json({}); }
    });
});

app.post('/api/admin/config', adminAuth, (req, res) => {
    const newConfig = req.body.config;
    if (!newConfig) return res.status(400).json({ success: false });

    fs.writeFile(UPDATE_FILE, JSON.stringify(newConfig, null, 2), (err) => {
        if (err) return res.status(500).json({ success: false });
        res.json({ success: true });
    });
});

app.post('/api/admin/upload', upload.single('file'), (req, res) => {
    const password = req.headers['x-admin-password'];
    if (password !== ADMIN_PASS) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
    }

    if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });

    const fileUrl = `${req.protocol}://${req.get('host')}/downloads/${req.file.filename}`;
    res.json({ success: true, url: fileUrl });
});

// ==========================================
// ROUTES FRONTEND
// ==========================================

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`);
    console.log(`Admin Dashboard: http://localhost:${PORT}/admin`);
});
