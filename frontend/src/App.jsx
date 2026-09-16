import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Library from './pages/Library';
import BookDetail from './pages/BookDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Disclaimer from './pages/Disclaimer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import ReadBook from './pages/ReadBook';

const RouteTitleHandler = () => {
  const location = useLocation();
  useEffect(() => {
    const routeTitles = {
      '/': 'Home - TCC',
      '/books': 'Library - TCC',
      '/about': 'About - TCC',
      '/contact': 'Contact - TCC',
      '/disclaimer': 'Disclaimer - TCC',
      '/privacy': 'Privacy Policy - TCC',
      '/terms': 'Terms of Service - TCC',
      '/admin': 'Dashboard - TCC',
      '/admin/login': 'Admin Login - TCC',
    };
    if (routeTitles[location.pathname]) {
      document.title = routeTitles[location.pathname];
    }
  }, [location]);
  return null;
};

const MainLayout = () => (
  <div className="flex flex-col min-h-screen bg-surface">
    <Navbar />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <Router>
      <RouteTitleHandler />
      <Routes>
        {/* Routes with Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Library />} />
          <Route path="/books/:slug" element={<BookDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Immersive Reading Route (No Navbar/Footer) */}
        <Route path="/books/:slug/read" element={<ReadBook />} />
      </Routes>
    </Router>
  );
}

export default App;
