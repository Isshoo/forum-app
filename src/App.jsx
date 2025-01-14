import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArchivedNotesPage from './pages/LeaderboardPage';
import AddNotesPage from './pages/AddThreadPage';
import DetailNotesPage from './pages/DetailThreadPage';
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
import { useDispatch, useSelector } from 'react-redux';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

function App() {
  const firstRun = useRef(true);
  const authUser = useSelector((states) => states.authUser);
  const isPreload = useSelector((states) => states.isPreload);

  const dispatch = useDispatch();

  const [theme, toggleTheme] = useTheme();
  const [locale, toggleLocale] = useLocale();

  useEffect(() => {
    if (firstRun.current) {
      dispatch(asyncPreloadProcess());
      firstRun.current = false;
    }
  }, [dispatch]);

  const themeContextValue = useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme, toggleTheme]);

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale, toggleLocale]);

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
            className="container"
            data-theme={theme === 'dark' ? '' : 'light'}
            data-lang={locale === 'EN' ? '' : 'ID'}
          >
            <header>
              <HeaderBar />
            </header>
            <main>
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
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/archived" element={<ArchivedNotesPage />} />
              <Route path="/notes/new" element={<AddNotesPage />} />
              <Route path="/notes/:id" element={<DetailNotesPage />} />
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
