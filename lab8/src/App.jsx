import { AppProvider } from './context/AppContext';
import { useApp } from './hooks/useApp';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

function AppContent() {
  const { view } = useApp();
  return (
    <>
      <Navbar />
      <main>
        {view === 'home' && <HomePage />}
        {view === 'detail' && <DetailPage />}
        {view === 'favorites' && <FavoritesPage />}
      </main>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
