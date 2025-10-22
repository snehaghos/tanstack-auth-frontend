# TanStack Router Authentication Setup

A modern React application demonstrating authentication flow with TanStack Router, featuring protected routes, context-based state management, and beautiful UI components.

## 🚀 Features

- **🔐 Authentication System**: Complete login/register/logout flow
- **🛡️ Protected Routes**: Route guards with automatic redirects
- **🎨 Modern UI**: Beautiful components built with Tailwind CSS & shadcn/ui
- **📱 Responsive Design**: Works seamlessly on desktop and mobile
- **⚡ Type-Safe Routing**: Powered by TanStack Router
- **🔄 State Management**: Context-based authentication state
- **📊 Data Tables**: Advanced user management with TanStack Table
- **🎯 TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A backend API server (running on port 5000)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/snehaghos/tanstack-auth-frontend.git
cd tanstack-auth-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

Make sure your backend API is running on `http://localhost:5000/api`

### 4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   └── ui/              # shadcn/ui components
├── features/            # Feature-based modules
│   ├── auth/           # Authentication feature
│   │   ├── components/ # Login, Register, Dashboard
│   │   └── contexts/   # AuthContext for state management
│   └── users/          # User management feature
│       ├── components/ # UserTable, UserProfile
│       └── contexts/   # UserContext
├── routes/             # TanStack Router routes
│   ├── __root.tsx     # Root layout
│   ├── index.tsx      # Home route (redirects)
│   ├── login.tsx      # Login page
│   ├── register.tsx   # Registration page
│   └── dashboard.tsx  # Protected dashboard
├── types/              # TypeScript type definitions
└── lib/               # Utility functions
```

## 🔐 Authentication Flow

### Route Protection

The application implements automatic route protection:

- **Unauthenticated users** → Redirected to `/login`
- **Authenticated users** → Access to `/dashboard`
- **Login/Register pages** → Redirect to `/dashboard` if already logged in

### Authentication State

```tsx
// Auth context provides:
const {
  authUser,          // Current user object
  isLoggingIn,       // Login loading state  
  isSigningUp,       // Registration loading state
  isCheckingAuth,    // Initial auth check
  login,             // Login function
  register,          // Registration function
  logout,            // Logout function
  checkAuth          // Verify auth status
} = useAuthContext()
```

## 🎨 UI Components

### Authentication Pages

- **Login Page**: Clean form with validation and error handling
- **Register Page**: User registration with confirmation
- **Dashboard**: Protected area showing user information

### Features

- **Loading States**: Elegant spinners and disabled states
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🛡️ Route Guards

Routes are automatically protected using TanStack Router's `beforeLoad`:

```tsx
export const Route = createFileRoute('/dashboard')({
  component: DashboardComponent,
  beforeLoad: () => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      throw redirect({ to: '/login' })
    }
  }
})
```

## 📊 Data Management

### User Table

Advanced data table with:
- **Sorting**: Click headers to sort columns
- **Search**: Global search across all fields
- **Pagination**: Navigate through large datasets
- **Actions**: Edit/Delete for authorized users

## 🔧 Configuration

### Environment Variables

The application expects a backend API at:
```
BASE_URL = 'http://localhost:5000/api'
```

### API Endpoints

Required backend endpoints:
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user
- `GET /users` - List all users
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## 🎯 Key Features Explained

### Token Management

- Uses `localStorage` for token persistence
- Automatic token attachment to API requests
- Token removal on logout or 401 errors

### Route-Based Code Splitting

TanStack Router automatically splits code by route for optimal loading.

### Type Safety

Full TypeScript support with:
- Typed routes and navigation
- Typed API responses
- Typed form inputs and validation

## 🚀 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint

# Format code
npm run format
```

## 🔒 Security Features

- **Protected Routes**: Automatic redirect for unauthorized access
- **Token Validation**: Server-side token verification
- **CORS Handling**: Proper cross-origin request setup
- **Input Validation**: Client and server-side validation

## 📱 Responsive Design

The application is fully responsive and works on:
- **Desktop**: Full layout with sidebar navigation
- **Tablet**: Adapted layout with collapsible navigation
- **Mobile**: Touch-optimized interface with drawer navigation

## 🎨 Styling

Built with modern CSS practices:
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: High-quality component library
- **CSS Variables**: Theme customization support
- **Dark Mode**: Ready for dark theme implementation

## 🐛 Troubleshooting

### Common Issues

1. **Tokens disappearing on refresh**
   - Check if backend is running on correct port
   - Verify API endpoints are accessible

2. **Route navigation not working**
   - Ensure all route files are created
   - Restart dev server to regenerate route types

3. **Styling not applied**
   - Verify Tailwind CSS is properly configured
   - Check if shadcn/ui components are installed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TanStack Router](https://tanstack.com/router) for excellent routing solution
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Vite](https://vitejs.dev/) for fast development experience

---

## 📞 Support

If you have any questions or need help with setup, please open an issue on GitHub.

**Happy Coding! 🚀**