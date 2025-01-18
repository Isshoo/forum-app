import React, { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import AddThreadsPage from './pages/AddThreadPage';
import DetailThreadsPage from './pages/DetailThreadPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { LocaleProvider } from './contexts/LocaleContext';
import { ThemeProvider } from './contexts/ThemeContext';
import useLocale from './hooks/useLocale';
import useTheme from './hooks/useTheme';
import HeaderBar from './components/Base/HeaderBar';
import FooterBar from './components/Base/FooterBar';
import NavigationBar from './components/Base/NavigationBar';
import ScrollToTop from './components/Base/ScrollToTop';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

function App() {
  const firstRun = useRef(true);
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);

  const dispatch = useDispatch();

  const [theme, themeContextValue] = useTheme();
  const [locale, localeContextValue] = useLocale();

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncPreloadProcess());
      firstRun.current = false;
    }
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return null;
  }
  if (!authUser) {
    return (
      <LocaleProvider value={localeContextValue}>
        <ThemeProvider value={themeContextValue}>
          <div
            className="container unAuth"
            data-theme={theme === 'dark' ? '' : 'light'}
            data-lang={locale === 'EN' ? '' : 'ID'}
          >
            <header>
              <HeaderBar />
            </header>
            <main>
              <ScrollToTop />
              <Routes>
                <Route path="/*" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            </main>
            <footer>
              <FooterBar />
            </footer>
          </div>
        </ThemeProvider>
      </LocaleProvider>
    );
  }
  return (
    <LocaleProvider value={localeContextValue}>
      <ThemeProvider value={themeContextValue}>
        <div
          className="container"
          data-theme={theme === 'dark' ? '' : 'light'}
          data-lang={locale === 'EN' ? '' : 'ID'}
        >
          <header>
            <HeaderBar />
            <NavigationBar logout={onSignOut} username={authUser.name} />
          </header>
          <main>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/threads/new" element={<AddThreadsPage />} />
              <Route path="/threads/:id" element={<DetailThreadsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <footer>
            <FooterBar />
          </footer>
        </div>
      </ThemeProvider>
    </LocaleProvider>
  );
}

export default App;
