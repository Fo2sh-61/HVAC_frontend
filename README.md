# HVAC Service Management - Frontend

A modern, bilingual (English/Arabic) React frontend for the HVAC Service Management System built with Vite, React Router, and Tailwind CSS.

## 🚀 Features

### Core Features
- ✅ **JWT Authentication** - Secure login/register with token-based auth
- ✅ **Role-Based Access Control** - Separate dashboards for Admin, Customer, and Engineer
- ✅ **Bilingual Support** - Full English and Arabic translations with RTL support
- ✅ **Responsive Design** - Mobile-first design that works on all devices
- ✅ **Modern UI/UX** - Clean, professional interface with smooth animations

### User Roles & Capabilities

#### Admin Dashboard
- View system statistics (total services, requests, engineers)
- Create and manage HVAC services
- Assign engineers to service requests
- View all service requests
- Manage engineers

#### Customer Dashboard
- Browse available services
- Create service requests
- View request history and status
- Submit reviews after service completion

#### Engineer Dashboard
- View assigned service requests
- Update request status (Pending → In Progress → Completed)
- Update final price after service completion

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- ASP.NET Core backend running on `http://localhost:5000`

### Step 1: Install Dependencies
```bash
cd hvac-frontend
npm install
```

### Step 2: Configure Backend URL
The backend URL is configured in `src/services/api.js`. Default is `http://localhost:5000/api`.

If your backend runs on a different port, update:
```javascript
// src/services/api.js
const api = axios.create({
  baseURL: 'http://localhost:YOUR_PORT/api',  // Change this
});
```

### Step 3: Run Development Server
```bash
npm run dev
```

The app will run on `http://localhost:3000`

## 🏗️ Project Structure

```
hvac-frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Badge.jsx       # Status badges
│   │   ├── Button.jsx      # Button component
│   │   ├── Card.jsx        # Card container
│   │   ├── Input.jsx       # Form input
│   │   ├── Select.jsx      # Dropdown select
│   │   ├── Modal.jsx       # Modal dialog
│   │   ├── Loading.jsx     # Loading spinner
│   │   ├── Navbar.jsx      # Top navigation
│   │   ├── Sidebar.jsx     # Side navigation
│   │   ├── DashboardLayout.jsx  # Layout wrapper
│   │   └── ProtectedRoute.jsx   # Auth guard
│   │
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx        # Authentication state
│   │   └── LanguageContext.jsx    # Language/translations
│   │
│   ├── pages/              # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Services.jsx
│   │   ├── customer/
│   │   │   └── Dashboard.jsx
│   │   └── engineer/
│   │       └── Dashboard.jsx
│   │
│   ├── services/           # API services
│   │   ├── api.js         # Axios configuration
│   │   └── serviceApi.js  # Service-specific APIs
│   │
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
│
├── public/                # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
└── tailwind.config.js    # Tailwind CSS config
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#1991b9) - Main brand color
- **Accent**: Orange (#f97316) - Call-to-action elements
- **Dark**: Slate grays - Text and UI elements

### Typography
- **Display Font**: Poppins - Headings and titles
- **Body Font**: Cairo - All text (excellent Arabic support)

### Components
All components are reusable and well-documented:
- `Button` - Multiple variants (primary, secondary, accent, outline)
- `Card` - Container with optional title/subtitle
- `Input` - Form input with label and error states
- `Select` - Dropdown with options
- `Modal` - Dialog for forms and confirmations
- `Badge` - Status indicators with color variants

## 🌐 Bilingual Support

### Language Toggle
Users can switch between English and Arabic using the globe icon in the navbar.

### Adding New Translations
Edit `src/context/LanguageContext.jsx`:

```javascript
export const translations = {
  en: {
    yourNewKey: 'English Text',
    // ... more translations
  },
  ar: {
    yourNewKey: 'النص بالعربية',
    // ... more translations
  }
};
```

Use in components:
```javascript
const { t } = useLanguage();
<p>{t('yourNewKey')}</p>
```

## 🔐 Authentication Flow

1. **Login**: User enters email/password → Backend validates → Returns JWT token
2. **Token Storage**: Stored in `localStorage`
3. **Auto-Login**: On page load, checks for token → Fetches user info
4. **Protected Routes**: `ProtectedRoute` component guards role-based pages
5. **Auto-Redirect**: Redirects to appropriate dashboard based on user role

## 📡 API Integration

### API Service (`src/services/api.js`)
- Axios instance with base URL
- Auto-attaches JWT token to requests
- Handles 401 errors (auto-logout)

### Service Functions (`src/services/serviceApi.js`)
```javascript
// Get all services
serviceService.getAll()

// Create service (Admin)
serviceService.create(serviceData)

// Get all requests
serviceRequestService.getAll(userRole)

// Create request (Customer)
serviceRequestService.create(requestData)

// Update status (Engineer)
serviceRequestService.updateStatus(id, status)

// Update price (Engineer)
serviceRequestService.updatePrice(id, finalPrice)

// Assign engineer (Admin)
serviceRequestService.assignEngineer(requestId, engineerId)
```

## 🛠️ Development Guide

### Adding a New Page

1. **Create page component**:
```javascript
// src/pages/admin/NewPage.jsx
import DashboardLayout from '../../components/DashboardLayout';

const NewPage = () => {
  return (
    <DashboardLayout>
      <h1>New Page</h1>
    </DashboardLayout>
  );
};

export default NewPage;
```

2. **Add route** in `src/App.jsx`:
```javascript
<Route
  path="/admin/new-page"
  element={
    <ProtectedRoute allowedRoles={['Admin']}>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

3. **Add navigation** in `src/components/Sidebar.jsx`:
```javascript
{ to: '/admin/new-page', icon: SomeIcon, label: t('newPage') }
```

### Creating a New Component

Follow this pattern for consistency:
```javascript
import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const MyComponent = ({ prop1, prop2, className = '' }) => {
  const { t } = useLanguage();
  
  return (
    <div className={`base-classes ${className}`}>
      {/* Component content */}
    </div>
  );
};

export default MyComponent;
```

## 🎯 Next Steps for Development

### Immediate Priorities
1. **Complete Customer Pages**:
   - Services catalog page
   - Service request creation
   - Request history page
   - Review submission form

2. **Complete Engineer Pages**:
   - Assigned requests list
   - Request detail view
   - Status update interface
   - Price update form

3. **Complete Admin Pages**:
   - Service requests management
   - Engineer management (CRUD)
   - Assign engineer interface

### Enhancements
- Add search and filtering
- Implement pagination
- Add date pickers for scheduling
- File upload for service images
- Real-time notifications (SignalR)
- Export reports (PDF/Excel)
- Dark mode support

## 🐛 Troubleshooting

### Backend Connection Issues
```javascript
// Check CORS is enabled in backend Program.cs
app.UseCors("AllowReactApp");

// Verify backend URL in src/services/api.js
baseURL: 'http://localhost:5000/api'
```

### Authentication Issues
```javascript
// Clear localStorage and try again
localStorage.clear();

// Check token in browser DevTools → Application → Local Storage
// Should see: token: "eyJhbGci..."
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Lucide Icons](https://lucide.dev)

## 🤝 Contributing

When adding features:
1. Follow the existing code structure
2. Use TypeScript-style JSDoc comments
3. Test on both English and Arabic modes
4. Ensure mobile responsiveness
5. Update this README if needed

## 📝 License

This project is part of the HVAC Service Management System.

---

**Built with ❤️ using React, Vite, and Tailwind CSS**
