# HVAC Frontend - Quick Start Guide

## ⚡ Quick Setup (5 Minutes)

### Step 1: Install Dependencies
```bash
cd hvac-frontend
npm install
```

### Step 2: Verify Backend is Running
Make sure your ASP.NET Core backend is running on `http://localhost:5000`

### Step 3: Start Development Server
```bash
npm run dev
```

Visit: `http://localhost:3000`

## 🔑 Test Credentials

After registering users, you can test with different roles:

### Admin
- Email: admin@hvac.com
- Password: Admin123!
- Features: Manage services, engineers, assign requests

### Customer
- Email: customer@hvac.com
- Password: Customer123!
- Features: Request services, view history, write reviews

### Engineer
- Email: engineer@hvac.com
- Password: Engineer123!
- Features: View assigned requests, update status/price

## 🌐 Language Toggle

Click the 🌍 globe icon in the top navbar to switch between:
- English (LTR layout)
- Arabic (RTL layout)

## 📱 Mobile Testing

The app is fully responsive. Test on:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

## 🎨 Current Features

✅ Authentication (Login/Register)
✅ Admin Dashboard with statistics
✅ Services management (Admin)
✅ Role-based routing
✅ Bilingual support (EN/AR)
✅ Responsive design

## 🚧 Pages to Complete

The following pages are placeholder and need implementation:
- Customer service catalog
- Customer service request creation
- Customer request history
- Engineer assigned requests
- Engineer request management
- Admin engineers management
- Admin request assignment

## 📂 Project Structure

```
src/
├── components/     → Reusable UI components
├── context/        → State management (Auth, Language)
├── pages/         → Page components for each role
├── services/      → API integration
└── App.jsx        → Main routing
```

## 🔧 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: { ... },  // Change brand color
  accent: { ... },   // Change accent color
}
```

### Add New Translations
Edit `src/context/LanguageContext.jsx`:
```javascript
translations: {
  en: { newKey: 'English' },
  ar: { newKey: 'العربية' }
}
```

### Change Backend URL
Edit `src/services/api.js`:
```javascript
baseURL: 'http://your-backend-url/api'
```

## 🐛 Common Issues

**Issue**: Can't login
**Fix**: Check backend CORS is enabled and running

**Issue**: Page not loading
**Fix**: Check backend URL in `src/services/api.js`

**Issue**: Arabic not displaying correctly
**Fix**: Font should auto-load from Google Fonts

## 📞 Need Help?

Check the full README.md for detailed documentation.

Happy coding! 🚀
